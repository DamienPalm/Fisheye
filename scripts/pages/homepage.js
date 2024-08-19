import Api from "../api/api.js";
import Header from "../templates/headerHomepage.js";
import PhotographersList from "../templates/photographersList.js";

const buildPage = async (photographers) => {
  const app = document.getElementById("app");

  app.innerHTML = `
  ${Header.render()}
  <main class="main">
    ${photographers
      .map((photographer) => PhotographersList.render(photographer))
      .join("")}
  <main>
  `;
};

(async () => {
  try {
    const photographerApi = new Api("../data/photographers.json");
    const data = await photographerApi.get();
    console.log("Données récupérée : ", data);

    if (data && data.photographers) {
      await buildPage(data.photographers);
    } else {
      console.error("Aucune données de photographe trouvée");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes:", error);
  }
})();
