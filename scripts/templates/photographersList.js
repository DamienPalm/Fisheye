const render = (photographer) => {
  return `
    <article class="main__card">
        <a class="main__card__head-card" href="./photographer.html?id=${
          photographer.id
        }">
            <img class="main__card__head-card__profil-picture" src="${
              photographer.portrait_thumbnail
                ? photographer.portrait_thumbnail
                : "./assets/photographers/account.png"
            }"
            alt="${photographer.name}">
            <h2 class="main__card__head-card__title">${photographer.name}</h2>
        </a>
        <div class="main__card__body-card">
            <p class="main__card__body-card__location">${photographer.city}, ${
    photographer.country
  }</p>
            <p class="main__card__body-card__tagline">${
              photographer.tagline
            }</p>
            <p class="main__card__body-card__price">${photographer.price}</p>
        </div>
    </article>
    `;
};

const event = () => {};

export default {
  render,
  event,
};
