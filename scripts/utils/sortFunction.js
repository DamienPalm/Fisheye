export const sortByPopularity = (medias) => {
  return medias.sort((a, b) => b.likes - a.likes);
};

export const sortByDate = (medias) => {
  return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const sortByTitle = (medias) => {
  return medias.sort((a, b) => a.title.localeCompare(b.title));
};
