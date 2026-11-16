import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ mode = 'snow' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const createParticle = () => {
      const w = canvas.width;
      const h = canvas.height;
      const x = Math.random() * w;
      const y = Math.random() * h;

      if (mode === 'embers') {
        return {
          x,
          y: y > h ? h : y,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: (Math.random() - 0.5) * 1.0,
          opacity: Math.random() * 0.7 + 0.3,
          color: Math.random() > 0.4 ? '#E63946' : '#FF9F1C'
        };
      } else if (mode === 'gold') {
        return {
          x,
          y,
          size: Math.random() * 2.8 + 1,
          speedY: (Math.random() - 0.5) * 0.5,
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.6 + 0.25,
          color: Math.random() > 0.3 ? '#C5A15B' : '#FFE28A'
        };
      } else if (mode === 'cyber') {
        return {
          x,
          y,
          size: Math.random() * 2.5 + 1,
          speedY: Math.random() * 0.8 + 0.3,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.8 + 0.2,
          color: '#00F0FF'
        };
      } else {
        // Snow (Stark)
        return {
          x,
          y,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * 1.2 + 0.4,
          speedX: (Math.random() - 0.5) * 0.8 + 0.2,
          opacity: Math.random() * 0.7 + 0.2,
          color: Math.random() > 0.5 ? '#FFFFFF' : '#9BC7DF'
        };
      }
    };

    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 35 : 70;
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (isReduced) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (mode === 'embers') {
          if (p.y < -10) {
            particles[i] = createParticle();
            particles[i].y = canvas.height + 10;
          }
        } else {
          if (p.y > canvas.height + 10) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    if (!isReduced) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
