export default function AnimatedBackground() {
  return (
    <>
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        {/* Blob 1 - Orange */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #ff6600 0%, #ff4400 50%, transparent 70%)',
            animation: 'float1 20s ease-in-out infinite',
            top: '-10%',
            left: '-10%',
          }}
        />

        {/* Blob 2 - Deep Orange */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #ff8833 0%, #ff5500 50%, transparent 70%)',
            animation: 'float2 18s ease-in-out infinite',
            top: '30%',
            right: '-5%',
          }}
        />

        {/* Blob 3 - Dark Orange */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-20 blur-[110px]"
          style={{
            background: 'radial-gradient(circle, #cc5500 0%, #aa3300 50%, transparent 70%)',
            animation: 'float3 22s ease-in-out infinite',
            bottom: '-10%',
            left: '20%',
          }}
        />

        {/* Blob 4 - Light Orange accent */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[90px]"
          style={{
            background: 'radial-gradient(circle, #ffaa44 0%, #ff7722 50%, transparent 70%)',
            animation: 'float4 16s ease-in-out infinite',
            bottom: '20%',
            right: '15%',
          }}
        />

        {/* Blob 5 - Center glow */}
        <div
          className="absolute w-[900px] h-[900px] rounded-full opacity-10 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, #ff6600 0%, transparent 60%)',
            animation: 'pulse 12s ease-in-out infinite',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Subtle grid overlay for technical feel */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,102,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,102,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      <style>{`
        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(100px, 100px) scale(1.1);
          }
          50% {
            transform: translate(200px, -50px) scale(0.9);
          }
          75% {
            transform: translate(-50px, 150px) scale(1.05);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-150px, 120px) scale(1.15);
          }
          66% {
            transform: translate(-80px, -100px) scale(0.95);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          30% {
            transform: translate(-120px, -80px) scale(1.1);
          }
          60% {
            transform: translate(150px, 100px) scale(0.9);
          }
        }

        @keyframes float4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          40% {
            transform: translate(120px, -120px) scale(1.2);
          }
          80% {
            transform: translate(-100px, 80px) scale(0.85);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </>
  );
}
