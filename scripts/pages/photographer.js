import Api from "../api/api.js";
import ContactForm from "../templates/contactForm.js";
import Header from "../templates/headerPhotographer.js";
import PhotographerProfile from "../templates/photographerProfile.js";
import FilterMedia from "../templates/filterMedia.js";
import MediaList from "../templates/mediaList.js";
import LikePhotographer from "../templates/likePhotographer.js";
import {
  sortByDate,
  sortByPopularity,
  sortByTitle,
} from "../utils/sortFunction.js";

const getPhotographerId = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    throw new Error("ID du photographe introuvable dans l'URL");
  }
  return id;
};

const fetchData = async () => {
  const api = new Api("../data/photographers.json");
  const data = await api.get();

  if (
    !data ||
    !Array.isArray(data.photographers) ||
    !Array.isArray(data.media)
  ) {
    throw new Error("Données invalides ou manquantes");
  }
  return data;
};

const findPhotographer = (photographers, id) => {
  const photographer = photographers.find(
    (photographer) => photographer.id === parseInt(id)
  );
  if (!photographer) {
    throw new Error(`Aucun photographer trouvé avec l'ID : ${id}`);
  }
  return photographer;
};

const getMediaForPhotographer = (medias, photographerId, photographerName) => {
  return medias
    .filter((media) => media.photographerId === parseInt(photographerId))
    .map((media) => ({ ...media, photographerName }));
};

const buildPage = async (photographer, media) => {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${ContactForm.render(photographer)}
    ${Header.render()}
    <main class="main">
    ${PhotographerProfile.render(photographer)}
        <section class="main__media-section">
        ${FilterMedia.render()}
        <section id="media-list-container" class="main__media-section__media-list">
        ${renderMediaList(media, photographer)}
        </section>
        </section>
    <main>
  `;

  PhotographerProfile.event();
  ContactForm.event();
  setupFilterMediaEvent(photographer, media);
  MediaList.event(photographer, media);
};

const renderMediaList = (media, photographer) => {
  return `
      ${media.map(MediaList.render).join("")}
      ${LikePhotographer.render(photographer, media)}
    `;
};

const updateMediaList = (media, photographer) => {
  const mediaListContainer = document.getElementById("media-list-container");
  if (mediaListContainer) {
    mediaListContainer.innerHTML = renderMediaList(media, photographer);
    MediaList.event(photographer, media);
  }
};

const setupFilterMediaEvent = (photographer, initialMedia) => {
  const sortFunctions = {
    popularity: sortByPopularity,
    date: sortByDate,
    title: sortByTitle,
  };

  FilterMedia.event((sortType) => {
    const sortFunction = sortFunctions[sortType] || ((media) => media);
    const sortedMedia = sortFunction(initialMedia);
    updateMediaList(sortedMedia, photographer);
  });
};

const initializePhotographerPage = async () => {
  try {
    const photographerId = getPhotographerId();
    const { photographers, media } = await fetchData();
    const photographer = findPhotographer(photographers, photographerId);
    const photographerMedia = await getMediaForPhotographer(
      media,
      photographerId,
      photographer.name
    );
    await buildPage(photographer, photographerMedia);
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la page photographer : ",
      error
    );
  }
};

initializePhotographerPage();
