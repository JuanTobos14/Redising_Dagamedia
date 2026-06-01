export const HOME_VIDEO = {
  id: 'SUbnWx93k8c',
  title: 'Dagamedia Trailer',
  poster: 'https://i.ytimg.com/vi/SUbnWx93k8c/maxresdefault.jpg',
  posterAlt: 'Daga Media Video Preview',
};

export function getYoutubeEmbedUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
}