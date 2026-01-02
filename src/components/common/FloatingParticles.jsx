import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let diagonalLines = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          isOrange: Math.random() > 0.75,
          pulse: Math.random() * Math.PI * 2
        });
      }

      // Create diagonal moving lines
      diagonalLines = [];
      const lineCount = 8;
      for (let i = 0; i < lineCount; i++) {
        diagonalLines.push({
          x: Math.random() * canvas.width * 2 - canvas.width,
          speed: 0.3 + Math.random() * 0.4,
          length: 150 + Math.random() * 200,
          opacity: 0.08 + Math.random() * 0.12,
          isOrange: Math.random() > 0.6
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw diagonal moving lines
      diagonalLines.forEach((line) => {
        line.x += line.speed;

        // Reset line when it goes off screen
        if (line.x > canvas.width + canvas.height) {
          line.x = -line.length;
        }

        ctx.beginPath();
        ctx.moveTo(line.x, 0);
        ctx.lineTo(line.x + line.length, line.length);

        const gradient = ctx.createLinearGradient(line.x, 0, line.x + line.length, line.length);
        if (line.isOrange) {
          gradient.addColorStop(0, `rgba(249, 115, 22, 0)`);
          gradient.addColorStop(0.5, `rgba(249, 115, 22, ${line.opacity})`);
          gradient.addColorStop(1, `rgba(249, 115, 22, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${line.opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw particles with pulsing effect
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.02;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulsing size
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);

        if (particle.isOrange) {
          ctx.fillStyle = `rgba(249, 115, 22, ${particle.opacity})`;
          // Add glow effect for orange particles
          ctx.shadowColor = 'rgba(249, 115, 22, 0.5)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.6})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.shadowBlur = 5;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.2;
            if (p1.isOrange || p2.isOrange) {
              ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ opacity: 0.8 }}
    />
  );
}
