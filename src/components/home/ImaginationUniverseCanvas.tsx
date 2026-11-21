import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  color: string;
  alpha: number;
  depth: number;
}

interface FloatingWord {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  opacity: number;
  color: string;
  fontSize: number;
  rotation: number;
}

export const ImaginationUniverseCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: 0, targetY: 0, active: false });
  const animFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Particle Palette
    const colors = [
      'rgba(155, 92, 255, ',  // Electric purple
      'rgba(255, 79, 163, ',  // Hot pink
      'rgba(199, 255, 94, ',  // Acid lime
      'rgba(91, 140, 255, ',  // Electric blue
    ];

    // Luminous particles (optimized count: ~45 for high mobile fps)
    const particleCount = window.innerWidth < 640 ? 35 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random() * 0.8 + 0.2;
      const baseVx = (Math.random() - 0.5) * 0.3 * depth;
      const baseVy = (Math.random() - 0.5) * 0.3 * depth;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        depth,
      });
    }

    // Story Fragments keywords
    const keywords = [
      'WHAT IF?',
      '404 REALITY',
      'IMAGINE',
      '3 AM THOUGHTS',
      'UNKNOWN',
      'YOUR STORY?',
      'PLOT TWIST',
      'PARALLEL TIMELINE',
    ];

    const words: FloatingWord[] = keywords.map((text, i) => {
      const depth = 0.3 + (i % 3) * 0.25;
      return {
        text,
        x: (width * (0.15 + (i * 0.11))) % (width - 120),
        y: height * 0.2 + (i * 65) % (height * 0.65),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        depth,
        opacity: 0.15 + depth * 0.18,
        color: i % 2 === 0 ? '#9B5CFF' : i % 3 === 0 ? '#5B8CFF' : '#C7FF5E',
        fontSize: window.innerWidth < 640 ? 11 + depth * 4 : 14 + depth * 6,
        rotation: (Math.random() - 0.5) * 0.12,
      };
    });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse / Pointer Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Visibility Observer to pause when offscreen
    let running = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          running = entry.isIntersecting;
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let time = 0;

    const render = () => {
      if (!running || prefersReducedMotion) {
        if (!prefersReducedMotion) {
          animFrameRef.current = requestAnimationFrame(render);
        }
        return;
      }

      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic background spotlight glow
      const spotX = mouseRef.current.active ? mouseRef.current.x : width / 2 + Math.sin(time * 0.5) * (width * 0.2);
      const spotY = mouseRef.current.active ? mouseRef.current.y : height * 0.4 + Math.cos(time * 0.6) * (height * 0.15);

      const radialGrad = ctx.createRadialGradient(spotX, spotY, 10, spotX, spotY, width * 0.7);
      radialGrad.addColorStop(0, 'rgba(155, 92, 255, 0.12)');
      radialGrad.addColorStop(0.4, 'rgba(91, 140, 255, 0.05)');
      radialGrad.addColorStop(1, 'rgba(9, 9, 15, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle orbital rings / dimensional geometry
      ctx.save();
      ctx.strokeStyle = 'rgba(155, 92, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.ellipse(
        width * 0.5 + (spotX - width / 2) * 0.04,
        height * 0.45 + (spotY - height / 2) * 0.04,
        width * 0.4,
        height * 0.25,
        Math.PI / 8,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      ctx.strokeStyle = 'rgba(91, 140, 255, 0.05)';
      ctx.beginPath();
      ctx.ellipse(
        width * 0.5 + (spotX - width / 2) * -0.03,
        height * 0.45 + (spotY - height / 2) * -0.03,
        width * 0.55,
        height * 0.35,
        -Math.PI / 6,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.restore();

      // Render Floating Story Fragments (Keywords)
      words.forEach((w) => {
        w.x += w.vx;
        w.y += w.vy;

        // Wrap around bounds
        if (w.x < -150) w.x = width + 50;
        if (w.x > width + 150) w.x = -50;
        if (w.y < -50) w.y = height + 30;
        if (w.y > height + 50) w.y = -30;

        // Parallax from cursor
        const offsetX = (mouseRef.current.active ? (mouseRef.current.x - width / 2) : 0) * (w.depth * 0.05);
        const offsetY = (mouseRef.current.active ? (mouseRef.current.y - height / 2) : 0) * (w.depth * 0.05);

        ctx.save();
        ctx.translate(w.x + offsetX, w.y + offsetY);
        ctx.rotate(w.rotation);
        ctx.font = `600 ${w.fontSize}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = w.color;
        ctx.globalAlpha = w.opacity + Math.sin(time + w.x) * 0.05;
        ctx.letterSpacing = '2px';
        ctx.fillText(w.text, 0, 0);

        // Subtle box border on some fragments for sticker feel
        if (w.depth > 0.5) {
          const metrics = ctx.measureText(w.text);
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 0.75;
          ctx.globalAlpha = w.opacity * 0.6;
          ctx.strokeRect(-6, -w.fontSize + 2, metrics.width + 12, w.fontSize + 6);
        }
        ctx.restore();
      });

      // Render Luminous Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with cursor
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.vx -= (dx / dist) * force * 0.3;
            p.vy -= (dy / dist) * force * 0.3;
          } else {
            p.vx = p.vx * 0.98 + p.baseVx * 0.02;
            p.vy = p.vy * 0.98 + p.baseVy * 0.02;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Glow ring around larger particles
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}0.15)`;
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-700"
      />
      {/* Soft gradient masks to blend cleanly into content */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-void/80 to-transparent pointer-events-none" />
    </div>
  );
};
