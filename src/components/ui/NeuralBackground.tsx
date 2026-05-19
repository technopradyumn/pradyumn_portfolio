import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  type: 'node' | 'data';
}

const COLORS = {
  dark: { cyan: [6, 182, 212], violet: [139, 92, 246] },
  light: { cyan: [6, 140, 180], violet: [120, 70, 210] },
};

export const NeuralBackground = () => {
  const { resolvedTheme } = useTheme();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const themeRef = useRef(resolvedTheme);

  useEffect(() => { themeRef.current = resolvedTheme; }, [resolvedTheme]);

  useEffect(() => {
    const canvas = document.getElementById('neural-bg') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = Math.min(90, Math.floor(window.innerWidth / 18));
    const CONN_DIST = 160;
    const MOUSE_R = 150;

    const particles: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      const isNode = Math.random() > 0.6;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isNode ? 0.3 : 0.6),
        vy: (Math.random() - 0.5) * (isNode ? 0.3 : 0.6),
        radius: isNode ? Math.random() * 2 + 1.5 : Math.random() * 1 + 0.5,
        opacity: isNode ? Math.random() * 0.5 + 0.3 : Math.random() * 0.3 + 0.1,
        type: isNode ? 'node' : 'data',
      });
    }

    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouse);

    let time = 0;

    const animate = () => {
      time += 0.005;
      const isDark = themeRef.current === 'dark';
      const c = isDark ? COLORS.dark : COLORS.light;
      const [cR, cG, cB] = c.cyan;
      const [vR, vG, vB] = c.violet;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated ambient blobs
      const bX1 = canvas.width * (0.25 + Math.sin(time) * 0.1);
      const bY1 = canvas.height * (0.3 + Math.cos(time * 0.7) * 0.1);
      const bX2 = canvas.width * (0.75 + Math.cos(time * 0.8) * 0.1);
      const bY2 = canvas.height * (0.7 + Math.sin(time * 0.6) * 0.1);

      const grd = ctx.createRadialGradient(bX1, bY1, 0, bX1, bY1, canvas.width * 0.5);
      grd.addColorStop(0, `rgba(${cR},${cG},${cB},${isDark ? 0.04 : 0.03})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grd2 = ctx.createRadialGradient(bX2, bY2, 0, bX2, bY2, canvas.width * 0.4);
      grd2.addColorStop(0, `rgba(${vR},${vG},${vB},${isDark ? 0.025 : 0.02})`);
      grd2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse glow
      if (mouseRef.current.x > 0) {
        const mg = ctx.createRadialGradient(mouseRef.current.x, mouseRef.current.y, 0, mouseRef.current.x, mouseRef.current.y, 200);
        mg.addColorStop(0, `rgba(${cR},${cG},${cB},${isDark ? 0.06 : 0.04})`);
        mg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_R && dist > 0) {
          const force = (MOUSE_R - dist) / MOUSE_R;
          p.vx += (dx / dist) * force * 0.03;
          p.vy += (dy / dist) * force * 0.03;
        }

        p.vx *= 0.998;
        p.vy *= 0.998;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        if (p.type === 'node') {
          const pulse = p.opacity * (0.7 + Math.sin(time * 2 + p.x * 0.01) * 0.3);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cR},${cG},${cB},${pulse * 0.15})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cR},${cG},${cB},${pulse})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${vR},${vG},${vB},${p.opacity})`;
          ctx.fill();
        }
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const alpha = (1 - dist / CONN_DIST) * (isDark ? 0.1 : 0.06);
            const isAgent = particles[i].type === 'node' && particles[j].type === 'node';
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            if (isAgent) {
              ctx.strokeStyle = `rgba(${cR},${cG},${cB},${alpha * 1.5})`;
              ctx.lineWidth = 0.8;
            } else {
              ctx.strokeStyle = `rgba(${vR},${vG},${vB},${alpha})`;
              ctx.lineWidth = 0.4;
            }
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return null;
};
