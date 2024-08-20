import Api from "../api/api.js";
import ContactForm from "../templates/contactForm.js";
import Header from "../templates/headerPhotographer.js";
import PhotographerProfile from "../templates/photographerProfile.js";
import FilterMedia from "../templates/filterMedia.js";
import MediaList from "../templates/mediaList.js";
import LikePhotographer from "../templates/likePhotographer.js";

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

const getPhotographerById = (photographers, id) => {
  const photographer = photographers.find(
    (photographer) => photographer.id === parseInt(id)
  );
  if (!photographer) {
    throw new Error(`Aucun photographer trouvé avec l'ID : ${id}`);
  }
  return photographer;
};

const getMediaForPhotographer = async (photographerId) => {
  try {
    const data = await fetchData();
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(photographerId)
    );
    if (!photographer) {
      throw new Error(`Aucun photographe trouvé avec l'ID : ${photographerId}`);
    }
    const media = data.media
      .filter((media) => media.photographerId === parseInt(photographerId))
      .map((media) => {
        return { ...media, photographerName: photographer.name };
      });
    console.log(
      `Médias trouvés pour le photographe ${photographer.name}:`,
      media
    );
    return media;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des médias du photographe:",
      error
    );
    throw error;
  }
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
        ${media.map(MediaList.render).join("")}
        ${LikePhotographer.render(photographer, media)}
        </section>
        </section>
    <main>
  `;

  PhotographerProfile.event();
  ContactForm.event();
  FilterMedia.event();
};

const initializePhotographerPage = async () => {
  try {
    const photographerId = getPhotographerId();
    const data = await fetchData();
    const photographer = getPhotographerById(
      data.photographers,
      photographerId
    );
    const media = await getMediaForPhotographer(photographerId);
    buildPage(photographer, media);
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la page photographer : ",
      error
    );
  }
};

initializePhotographerPage();
