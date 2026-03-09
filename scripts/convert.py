#!/usr/bin/env python3
"""
PNG -> WebP Converter for web projects.
Converts PNG images to WebP, preserves originals, and updates code references.
"""

import argparse
import io
import os
import re
import sys
from pathlib import Path

# Fix Windows console encoding for Unicode characters
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# ── Constants ──────────────────────────────────────────────────────────────────

DEFAULT_EXCLUDED_DIRS = {
    "node_modules", ".git", "dist", "build", ".next",
    "out", ".cache", ".turbo", ".vercel", ".netlify"
}

# Favicon-style PNGs to skip (case-insensitive match on filename)
FAVICON_PATTERNS = re.compile(
    r"(favicon|apple-touch-icon|mstile|safari-pinned-tab|android-chrome)",
    re.IGNORECASE
)

# File extensions to scan for reference updates
REF_EXTENSIONS = {".tsx", ".jsx", ".ts", ".js", ".html", ".css", ".scss", ".vue", ".svelte", ".md", ".mdx"}

# ── Helpers ────────────────────────────────────────────────────────────────────

def format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 ** 2:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / 1024 ** 2:.1f} MB"


def is_animated_png(path: Path) -> bool:
    """Check for APNG by looking for acTL chunk."""
    try:
        with open(path, "rb") as f:
            data = f.read(65536)  # Read first 64KB
            return b"acTL" in data
    except Exception:
        return False


def collect_pngs(root: Path, excluded_dirs: set) -> list[Path]:
    """Recursively find all PNG files, skipping excluded dirs and favicons."""
    pngs = []
    for dirpath, dirnames, filenames in os.walk(root):
        # Prune excluded dirs in-place (affects os.walk traversal)
        dirnames[:] = [d for d in dirnames if d not in excluded_dirs]
        for filename in filenames:
            if filename.lower().endswith(".png"):
                full = Path(dirpath) / filename
                if not FAVICON_PATTERNS.search(filename):
                    pngs.append(full)
    return sorted(pngs)


def update_references(root: Path, png_path: Path, webp_path: Path, excluded_dirs: set, dry_run: bool) -> list[tuple[Path, int]]:
    """
    Replace references to the PNG with WebP in all code files.
    Returns list of (file_path, count_of_replacements).
    """
    # Build relative patterns to match (both relative and filename-only)
    png_rel = str(png_path.relative_to(root)).replace("\\", "/")
    png_name = png_path.name
    webp_rel = str(webp_path.relative_to(root)).replace("\\", "/")
    webp_name = webp_path.name

    # Patterns: match full relative path OR just the filename
    patterns = [
        (re.escape(png_rel), webp_rel),
        (re.escape(png_name), webp_name),
    ]

    updated = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in excluded_dirs]
        for filename in filenames:
            if Path(filename).suffix in REF_EXTENSIONS:
                fpath = Path(dirpath) / filename
                try:
                    content = fpath.read_text(encoding="utf-8", errors="ignore")
                except Exception:
                    continue

                new_content = content
                total_replacements = 0
                for pattern, replacement in patterns:
                    new_content, count = re.subn(pattern, replacement, new_content)
                    total_replacements += count

                if total_replacements > 0:
                    if not dry_run:
                        fpath.write_text(new_content, encoding="utf-8")
                    updated.append((fpath, total_replacements))

    return updated


# ── Main logic ────────────────────────────────────────────────────────────────

def run_check():
    """Verify that Pillow is available."""
    try:
        from PIL import Image  # noqa: F401
        print("[OK] Pillow is installed - ready to convert.")
        sys.exit(0)
    except ImportError:
        print("[ERROR] Pillow not found. Install with:")
        print("   pip install Pillow --break-system-packages")
        sys.exit(1)


def run_conversion(args):
    try:
        from PIL import Image
    except ImportError:
        print("[ERROR] Pillow not found. Run: pip install Pillow --break-system-packages")
        sys.exit(1)

    root = Path(args.dir).resolve()
    if not root.exists():
        print(f"[ERROR] Directory not found: {root}")
        sys.exit(1)

    excluded = DEFAULT_EXCLUDED_DIRS.copy()
    if args.exclude:
        excluded.update(x.strip() for x in args.exclude.split(","))

    dry_run = args.dry_run
    quality = args.quality
    update_refs = not args.no_update_refs

    print(f"\n{'[DRY RUN] No files will be changed' if dry_run else '[CONVERTING] Images'}")
    print(f"Project root: {root}")
    print(f"Quality: {quality} | Update refs: {update_refs}\n")

    pngs = collect_pngs(root, excluded)

    if not pngs:
        print("[INFO] No PNG files found (favicons and excluded dirs skipped).")
        return

    total_original = 0
    total_webp = 0
    converted = []
    skipped_apng = []
    skipped_exists = []
    all_ref_updates: dict[Path, int] = {}

    for png_path in pngs:
        webp_path = png_path.with_suffix(".webp")

        # Skip if WebP already exists
        if webp_path.exists():
            skipped_exists.append(png_path)
            continue

        # Skip animated PNGs
        if is_animated_png(png_path):
            skipped_apng.append(png_path)
            continue

        original_size = png_path.stat().st_size
        total_original += original_size

        if not dry_run:
            try:
                with Image.open(png_path) as img:
                    # Preserve transparency (RGBA) or convert to RGB
                    if img.mode in ("RGBA", "LA"):
                        img.save(webp_path, "WEBP", quality=quality, lossless=False)
                    else:
                        img.convert("RGB").save(webp_path, "WEBP", quality=quality)
                webp_size = webp_path.stat().st_size
            except Exception as e:
                print(f"  [WARN] Failed to convert {png_path.relative_to(root)}: {e}")
                continue
        else:
            # Estimate WebP size as ~25% of PNG for dry-run display
            webp_size = int(original_size * 0.25)

        total_webp += webp_size
        savings_pct = (1 - webp_size / original_size) * 100 if original_size > 0 else 0

        rel = png_path.relative_to(root)
        converted.append((rel, original_size, webp_size, savings_pct))

        # Update references in code
        if update_refs:
            refs = update_references(root, png_path, webp_path, excluded, dry_run)
            for fpath, count in refs:
                all_ref_updates[fpath] = all_ref_updates.get(fpath, 0) + count

    # ── Report ─────────────────────────────────────────────────────────────────

    print("-" * 65)
    print(f"{'File':<45} {'Before':>8} {'After':>8} {'Saved':>6}")
    print("-" * 65)
    for rel, orig, webp, pct in converted:
        name = str(rel)
        if len(name) > 44:
            name = "..." + name[-43:]
        marker = "~" if dry_run else "[OK]"
        print(f"  {marker} {name:<43} {format_size(orig):>8} {format_size(webp):>8} {pct:>5.1f}%")

    if skipped_exists:
        print(f"\n  [SKIP] WebP already exists: {len(skipped_exists)} file(s)")
    if skipped_apng:
        print(f"  [WARN] Skipped (animated PNG / APNG): {len(skipped_apng)} file(s)")
        for p in skipped_apng:
            print(f"      - {p.relative_to(root)}")

    print("-" * 65)
    savings = total_original - total_webp
    savings_pct = (savings / total_original * 100) if total_original > 0 else 0
    label = "(estimated)" if dry_run else ""
    print(f"\n  [OK] {'Would convert' if dry_run else 'Converted'}:  {len(converted)} file(s)")
    print(f"  Original size:   {format_size(total_original)}")
    print(f"  WebP size:       {format_size(total_webp)} {label}")
    print(f"  Saved:           {format_size(savings)} ({savings_pct:.1f}%) {label}")

    if all_ref_updates:
        print(f"\n  {'Would update' if dry_run else 'Updated'} references in:")
        for fpath, count in sorted(all_ref_updates.items()):
            try:
                rel = fpath.relative_to(root)
            except ValueError:
                rel = fpath
            print(f"    {str(rel):<50} ({count} ref{'s' if count != 1 else ''})")
    elif update_refs and converted:
        print("\n  [INFO] No code references to PNG files found in source files.")

    if dry_run:
        print("\n  [TIP] This was a dry run. To apply changes, run without --dry-run.")

    print()


# ── CLI ────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Convert PNG images to WebP in a web project.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 scripts/convert.py --check
  python3 scripts/convert.py --dry-run --dir ./my-project
  python3 scripts/convert.py --dir ./my-project --quality 85
  python3 scripts/convert.py --dir . --no-update-refs
  python3 scripts/convert.py --dir . --exclude "assets/raw,design"
        """
    )
    parser.add_argument("--check", action="store_true", help="Check if Pillow is installed")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing any files")
    parser.add_argument("--dir", default=".", help="Project root directory (default: .)")
    parser.add_argument("--quality", type=int, default=85, help="WebP quality 1-100 (default: 85)")
    parser.add_argument("--no-update-refs", action="store_true", help="Skip updating code references")
    parser.add_argument("--exclude", default="", help="Extra dirs to exclude, comma-separated")

    args = parser.parse_args()

    if args.check:
        run_check()
    else:
        run_conversion(args)


if __name__ == "__main__":
    main()
