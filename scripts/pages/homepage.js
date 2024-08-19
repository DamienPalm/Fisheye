import Api from "../api/api.js";
import Header from "../templates/headerHomepage.js";

const buildPage = async () => {
  const app = document.getElementById("app");

  app.innerHTML = `
  ${Header.render()}
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
