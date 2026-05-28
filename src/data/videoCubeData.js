// src/data/videoCubeData.js

export const CUBE_PROJECTS = [
  {
    id: 'HVHsgO69FSA',
  },
  {
    id: 'RQFsIshO7gE',
  },
  {
    id: '4HZfzn7s_Pw',
  },
  {
    id: 'kyKcj-UieCY',
  },
  {
    id: 'H1ASFIKc1LQ',
  },
  {
    id: 'hm-BG_ZjzZ8',
  },
];

export const CUBE_FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

export const CUBE_INSTRUCTIONS = {
  es: 'Arrastra para rotar · haz clic para reproducir',
  en: 'Drag to rotate · click to play',
};

export const CUBE_ROTATION = {
  initialX: -15,
  initialY: 45,
  autoRotateSpeed: 0.18,
  waveAmplitude: 8,
  waveSpeed: 0.0005,
  dragSensitivity: 0.4,
  maxXRotation: 80,
  dragThreshold: 6,
  autoRotateResumeDelay: 1000,
  dragResetDelay: 80,
  previewDelay: 600,
};

export function getYoutubePoster(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

export function getYoutubePosterFallback(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYoutubePreview(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
}

export function getYoutubePlayer(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
}