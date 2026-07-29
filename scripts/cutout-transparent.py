"""Cut a studio product photo off its white sweep into a transparent WebP/PNG.

Used for the decorative machine images in the dark CTA bands / promo carousel.
Needs Pillow + numpy (system Python is fine -- this is a dev tool, not part of the build).

  python scripts/cutout-transparent.py SRC OUT.png QA.png [BG_MIN BG_SAT RAMP_TOP RAMP_W MIN_HOLE]

QA.png is the cut-out composited on the banner's near-black -- always eyeball it,
a wrong threshold is obvious there and invisible on white.

Presets that worked (session 46):
  saturated machine, soft gray shadow (Haulotte Compact 10)  -> defaults
  desaturated machine, flat 255 sweep (Honda WT30)           -> 250 8 255 14 400
Too loose a BG_MIN leaks through gaps in a roll cage and eats silver/white parts;
too strict leaves enclosed sweep opaque -- that is what MIN_HOLE cleans up.
"""

import sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

src, out_png, out_qa = sys.argv[1], sys.argv[2], sys.argv[3]
# Tunables: how bright/desaturated a pixel must be to count as background, and the
# ramp width used for anti-aliased edge pixels. Loose values (170/26) swallow a soft
# gray drop shadow but leak into desaturated silver parts; strict values (250/8) suit
# a flat 255 studio sweep with no shadow.
BG_MIN = int(sys.argv[4]) if len(sys.argv) > 4 else 170
BG_SAT = int(sys.argv[5]) if len(sys.argv) > 5 else 26
RAMP_TOP = int(sys.argv[6]) if len(sys.argv) > 6 else 250
RAMP_W = int(sys.argv[7]) if len(sys.argv) > 7 else 28
# Enclosed background: sweep visible *through* the subject (gaps in a roll cage) is
# never reached by a border flood, because the subject's anti-aliased outline walls it
# off. Any leftover white blob at least this many px is treated as background too.
# 0 disables. Safe only when nothing on the subject is that uniformly bright.
MIN_HOLE = int(sys.argv[8]) if len(sys.argv) > 8 else 0

im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.int16)
h, w, _ = a.shape

mn = a.min(axis=2)
mx = a.max(axis=2)
sat = mx - mn

# Background candidate: bright and desaturated (white sweep + soft gray shadow)
cand = (mn >= BG_MIN) & (sat <= BG_SAT)

# Flood fill from the image border so light parts INSIDE the machine survive
bg = np.zeros((h, w), dtype=bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if cand[y, x] and not bg[y, x]:
            bg[y, x] = True
            q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if cand[y, x] and not bg[y, x]:
            bg[y, x] = True
            q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True
            q.append((ny, nx))

if MIN_HOLE:
    unreached = cand & ~bg
    ys, xs = np.nonzero(unreached)
    for sy, sx in zip(ys.tolist(), xs.tolist()):
        if not unreached[sy, sx]:
            continue
        comp = []
        unreached[sy, sx] = False
        q = deque([(sy, sx)])
        while q:
            y, x = q.popleft()
            comp.append((y, x))
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and unreached[ny, nx]:
                    unreached[ny, nx] = False
                    q.append((ny, nx))
        if len(comp) >= MIN_HOLE:
            for y, x in comp:
                bg[y, x] = True

# Alpha: 0 in background core, soft ramp in the anti-aliased ring around the subject
ring = np.asarray(
    Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))
) > 0
alpha = np.ones((h, w), dtype=np.float32)
alpha[bg] = 0.0
ramp = np.clip((RAMP_TOP - mn) / float(RAMP_W), 0.0, 1.0)
edge = ring & ~bg
alpha[edge] = np.minimum(alpha[edge], ramp[edge])

# Slight feather so no hard 1px white fringe remains
alpha_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
alpha = np.asarray(alpha_img).astype(np.float32) / 255.0

# Colour decontamination: un-matte semi-transparent pixels from the white sweep
rgb = a.astype(np.float32)
m = (alpha > 0.02) & (alpha < 0.98)
for c in range(3):
    ch = rgb[:, :, c]
    ch[m] = np.clip((ch[m] - 255.0 * (1.0 - alpha[m])) / alpha[m], 0, 255)
    rgb[:, :, c] = ch

rgba = np.dstack([rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])
cut = Image.fromarray(rgba, 'RGBA')

# Trim to the subject's bounding box
bbox = cut.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
cut = cut.crop(bbox)
cut.save(out_png)

# QA: composite over the banner's dark background so fringes/shadow leftovers are visible
qa = Image.new('RGB', cut.size, (9, 9, 11))
qa.paste(cut, (0, 0), cut)
qa.save(out_qa)
print('cutout', cut.size, 'from', im.size)
