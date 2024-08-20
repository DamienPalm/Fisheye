import Api from "../api/api.js";
import Photographer from "../model/Photographer.js";
import Header from "../templates/headerHomepage.js";
import PhotographersList from "../templates/photographersList.js";

const fetchPhotographerData = async () => {
  const photographerApi = new Api("../data/photographers.json");
  const data = await photographerApi.get();
  if (!data && !Array.isArray(data.photographers)) {
    throw new Error("Aucune donnée trouvée");
  }
  return data.photographers;
};

const createPhotographerInstances = (photographersData) => {
  return photographersData.map((data) => new Photographer(data));
};

const buildPage = async (photographers) => {
  const app = document.getElementById("app");

  app.innerHTML = `
  ${Header.render()}
  <main class="main">
    ${photographers.map(PhotographersList.render).join("")}
  <main>
  `;
};

const initializeApp = async () => {
  try {
    const photographersData = await fetchPhotographerData();
    const photographerList = createPhotographerInstances(photographersData);
    buildPage(photographerList);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application : ", error);
  }
};

initializeApp();
