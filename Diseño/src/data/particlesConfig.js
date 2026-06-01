export const PARTICLE_COLORS = [
  {
    rgb: '255, 107, 0',
    opacity: 0.18,
  },
  {
    rgb: '255, 197, 2',
    opacity: 0.18,
  },
  {
    rgb: '245, 245, 245',
    opacity: 0.12,
  },
  {
    rgb: '195, 195, 195',
    opacity: 0.12,
  },
];

export const PARTICLE_CONFIG = {
  minSize: 10,
  maxSize: 25,

  minDepth: 0.25,
  maxDepth: 1,

  maxSpeed: 0.8,

  targetAlpha: 0.8,
  fadeSpeed: 0.02,

  mouseEase: 0.08,
  parallaxStrength: 0.08,

  lineDistance: 280,
  lineOpacity: 0.08,

  centerDotSize: 2,
  centerDotOpacity: 0.6,
};

export function getRandomParticleColor() {
  return PARTICLE_COLORS[
    Math.floor(Math.random() * PARTICLE_COLORS.length)
  ];
}

export function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}