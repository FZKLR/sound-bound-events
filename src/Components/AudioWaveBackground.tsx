'use client';

import { useEffect, useRef } from 'react';

export default function AudioWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic rave dust and strobe particles
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      color: Math.random() > 0.4 ? 'rgba(0, 255, 102,' : 'rgba(0, 240, 255,',
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.05 + 0.01,
    }));

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Rave Ambient Laser Beams
      const laserGradient = ctx.createLinearGradient(0, 0, width, height);
      laserGradient.addColorStop(0, 'rgba(0, 255, 102, 0.04)');
      laserGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
      laserGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = laserGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. High-Frequency Multi-Layer Sound Waves
      ctx.save();
      const waveColors = [
        'rgba(0, 255, 102, 0.35)',
        'rgba(0, 240, 255, 0.3)',
        'rgba(0, 255, 102, 0.15)',
      ];

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.lineWidth = i === 0 ? 2 : 1;
        ctx.strokeStyle = waveColors[i];

        const speed = step * (0.025 + i * 0.01);
        const waveHeight = 45 + i * 20;

        for (let x = 0; x < width; x += 4) {
          const distanceToMouse = Math.abs(x - mouseX);
          const mouseFactor = Math.max(0, 1 - distanceToMouse / 400) * 35;

          const y =
            height / 2 +
            Math.sin(x * 0.0035 + speed) * (waveHeight + mouseFactor) +
            Math.cos(x * 0.0015 - speed * 0.5) * 25;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Floating Interactive Neon Strobe Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.alpha += Math.sin(step * p.pulse) * 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.1, Math.min(0.9, p.alpha))})`;
        ctx.shadowColor = p.color.includes('255, 102') ? '#00FF66' : '#00F0FF';
        ctx.shadowBlur = 12;
        ctx.fill();
      });

      step += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-85" />;
}