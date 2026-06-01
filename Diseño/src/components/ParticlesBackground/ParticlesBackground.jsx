import { useEffect, useRef } from 'react';
import {
  PARTICLE_CONFIG,
  getRandomBetween,
  getRandomParticleColor,
} from '../../data/particlesConfig';
import styles from './ParticlesBackground.module.css';

function getViewportCenter() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

function createParticle(userId, width, height) {
  const size = getRandomBetween(
    PARTICLE_CONFIG.minSize,
    PARTICLE_CONFIG.maxSize
  );

  const color = getRandomParticleColor();

  return {
    id: userId,
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * PARTICLE_CONFIG.maxSpeed,
    vy: (Math.random() - 0.5) * PARTICLE_CONFIG.maxSpeed,
    size,
    depth: getRandomBetween(
      PARTICLE_CONFIG.minDepth,
      PARTICLE_CONFIG.maxDepth
    ),
    color,
    alpha: 0,
    targetAlpha: PARTICLE_CONFIG.targetAlpha,
    isDying: false,
    lastDrawX: 0,
    lastDrawY: 0,
  };
}

function updateParticleFade(particle) {
  if (particle.isDying) {
    particle.alpha -= PARTICLE_CONFIG.fadeSpeed;
    return particle.alpha > 0;
  }

  if (particle.alpha < particle.targetAlpha) {
    particle.alpha += PARTICLE_CONFIG.fadeSpeed;
  }

  return true;
}

function updateParticlePosition(particle, canvasWidth, canvasHeight) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x < particle.size || particle.x > canvasWidth - particle.size) {
    particle.vx *= -1;
  }

  if (particle.y < particle.size || particle.y > canvasHeight - particle.size) {
    particle.vy *= -1;
  }

  particle.x = Math.max(
    particle.size,
    Math.min(canvasWidth - particle.size, particle.x)
  );

  particle.y = Math.max(
    particle.size,
    Math.min(canvasHeight - particle.size, particle.y)
  );
}

function drawParticle(ctx, particle, mouse, canvasWidth, canvasHeight) {
  const offsetX =
    (mouse.x - canvasWidth / 2) *
    particle.depth *
    PARTICLE_CONFIG.parallaxStrength;

  const offsetY =
    (mouse.y - canvasHeight / 2) *
    particle.depth *
    PARTICLE_CONFIG.parallaxStrength;

  const drawX = particle.x + offsetX;
  const drawY = particle.y + offsetY;

  particle.lastDrawX = drawX;
  particle.lastDrawY = drawY;

  ctx.beginPath();
  ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${particle.color.rgb}, ${
    particle.alpha * particle.color.opacity
  })`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(drawX, drawY, PARTICLE_CONFIG.centerDotSize, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(245, 245, 245, ${
    particle.alpha * PARTICLE_CONFIG.centerDotOpacity
  })`;
  ctx.fill();
}

function drawParticleLines(ctx, particles) {
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const dx = particles[i].lastDrawX - particles[j].lastDrawX;
      const dy = particles[i].lastDrawY - particles[j].lastDrawY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= PARTICLE_CONFIG.lineDistance) {
        continue;
      }

      const alpha =
        (1 - distance / PARTICLE_CONFIG.lineDistance) *
        PARTICLE_CONFIG.lineOpacity *
        Math.min(particles[i].alpha, particles[j].alpha);

      ctx.beginPath();
      ctx.moveTo(particles[i].lastDrawX, particles[i].lastDrawY);
      ctx.lineTo(particles[j].lastDrawX, particles[j].lastDrawY);
      ctx.strokeStyle = `rgba(195, 195, 195, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

export default function ParticlesBackground({ activeUsers = [] }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const mouseRef = useRef(getViewportCenter());
  const targetMouseRef = useRef(getViewportCenter());

  const animationFrameRef = useRef(null);
  const canvasSizeRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      canvasSizeRef.current = {
        width,
        height,
      };
    };

    const handlePointerMove = (event) => {
      targetMouseRef.current.x = event.clientX;
      targetMouseRef.current.y = event.clientY;
    };

    const draw = () => {
      const { width, height } = canvasSizeRef.current;

      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) *
        PARTICLE_CONFIG.mouseEase;

      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) *
        PARTICLE_CONFIG.mouseEase;

      particlesRef.current = particlesRef.current.filter(updateParticleFade);

      particlesRef.current.forEach((particle) => {
        updateParticlePosition(particle, width, height);
        drawParticle(ctx, particle, mouseRef.current, width, height);
      });

      drawParticleLines(ctx, particlesRef.current);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const { width, height } = canvasSizeRef.current;
    const currentParticles = particlesRef.current;
    const activeUserSet = new Set(activeUsers);

    currentParticles.forEach((particle) => {
      if (!activeUserSet.has(particle.id)) {
        particle.isDying = true;
      }
    });

    activeUsers.forEach((userId) => {
      const alreadyExists = currentParticles.some(
        (particle) => particle.id === userId
      );

      if (!alreadyExists) {
        currentParticles.push(createParticle(userId, width, height));
      }
    });
  }, [activeUsers]);

  return (
    <canvas
      ref={canvasRef}
      className={styles['particles-background-canvas']}
      aria-hidden="true"
    />
  );
}