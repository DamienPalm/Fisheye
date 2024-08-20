export function counterLikes(medias) {
  return medias.reduce((total, media) => total + (media.likes || 0), 0);
}
