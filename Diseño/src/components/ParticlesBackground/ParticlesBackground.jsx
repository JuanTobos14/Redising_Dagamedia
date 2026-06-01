import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground({ activeUsers }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Mouse coordinate refs for parallax easing
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse movement listener
    const handleMouseMove = (e) => {
      targetMouseRef.current.x = e.clientX;
      targetMouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color choices with low opacity for premium subtle look
    const colors = [
      'rgba(255, 107, 0, 0.18)', // Muted Daga Orange
      'rgba(255, 197, 2, 0.18)',  // Muted Daga Yellow
      'rgba(245, 245, 245, 0.12)', // Muted Off-White
      'rgba(195, 195, 195, 0.12)'  // Muted Grey
    ];

    // Update particles mapping based on activeUsers
    const currentParticles = particlesRef.current;
    
    // 1. Identify users to remove (no longer in activeUsers)
    currentParticles.forEach(p => {
      if (!activeUsers.includes(p.id)) {
        p.isDying = true;
      }
    });

    // 2. Identify new users to add
    activeUsers.forEach(userId => {
      const exists = currentParticles.some(p => p.id === userId);
      if (!exists) {
        // Instantiate a new particle with a random Z-depth
        const size = Math.random() * 15 + 10; // 10px to 25px radius
        currentParticles.push({
          id: userId,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.8, // Slow float speed
          vy: (Math.random() - 0.5) * 0.8,
          size: size,
          depth: Math.random() * 0.75 + 0.25, // Z-depth layer (0.25 to 1.0)
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0, // Fade in start
          targetAlpha: 0.8,
          isDying: false
        });
      }
    });

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Easing mouse coordinates (lerp)
      const mouseEase = 0.08;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * mouseEase;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * mouseEase;

      // Filter out completely dead particles
      particlesRef.current = particlesRef.current.filter(p => {
        if (p.isDying) {
          p.alpha -= 0.02; // Fade out speed
          if (p.alpha <= 0) return false; // Remove from array
        } else if (p.alpha < p.targetAlpha) {
          p.alpha += 0.02; // Fade in speed
        }
        return true;
      });

      const particles = particlesRef.current;

      // Update positions, calculate offsets, & draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < p.size || p.x > canvas.width - p.size) p.vx *= -1;
        if (p.y < p.size || p.y > canvas.height - p.size) p.vy *= -1;

        // Prevent getting stuck outside viewport
        if (p.x < 0) p.x = p.size;
        if (p.x > canvas.width) p.x = canvas.width - p.size;
        if (p.y < 0) p.y = p.size;
        if (p.y > canvas.height) p.y = canvas.height - p.size;

        // Calculate 3D Parallax offset based on depth and mouse distance from center
        const offsetX = (mouseRef.current.x - canvas.width / 2) * p.depth * 0.08;
        const offsetY = (mouseRef.current.y - canvas.height / 2) * p.depth * 0.08;
        const drawX = p.x + offsetX;
        const drawY = p.y + offsetY;

        // Draw particle body
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.alpha * 0.25})`); // Scale color opacity by alpha
        ctx.fill();

        // Draw a glowing center dot
        ctx.beginPath();
        ctx.arc(drawX, drawY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 245, ${p.alpha * 0.6})`;
        ctx.fill();

        // Keep draw coordinates on the particle object for line rendering
        p.lastDrawX = drawX;
        p.lastDrawY = drawY;
      });

      // Draw subtle connecting lines (constellation network effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].lastDrawX - particles[j].lastDrawX;
          const dy = particles[i].lastDrawY - particles[j].lastDrawY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 280) { // Connection threshold
            const alpha = (1 - distance / 280) * 0.08 * Math.min(particles[i].alpha, particles[j].alpha);
            ctx.beginPath();
            ctx.moveTo(particles[i].lastDrawX, particles[i].lastDrawY);
            ctx.lineTo(particles[j].lastDrawX, particles[j].lastDrawY);
            ctx.strokeStyle = `rgba(195, 195, 195, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeUsers]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7
      }}
    />
  );
}
