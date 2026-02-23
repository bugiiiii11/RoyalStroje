export default function AnimatedBackground() {
  return (
    <>
      {/* Static gradient background - no animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
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
          backgroundSize: '80px 80px'
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
        }}
      />
    </>
  );
}
