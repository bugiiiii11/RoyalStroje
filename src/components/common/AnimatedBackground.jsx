export default function AnimatedBackground() {
  return (
    <>
      {/* Static gradient background - no animations.
          translateZ(0) + backfaceVisibility promote each fixed layer to its own
          GPU texture so the browser rasterizes it once instead of repainting on
          every scroll frame — fixes hairline-grid tearing/static bands on mobile. */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        {/* Subtle static gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(255,102,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(255,102,0,0.06) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Subtle grid overlay for technical feel */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,102,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,102,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </>
  );
}
