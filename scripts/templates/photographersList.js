const render = (photographer) => {
  return `
    <article class="main__card" tabindex="0" role="article" aria-labelledby="photographer-name">
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
            <p class="main__card__body-card__price">${
              photographer.price
            }€/jour</p>
        </div>
    </article>
    `;
};

const event = () => {
  const cards = document.querySelectorAll(".main__card");

  cards.forEach((card, index) => {
    card.addEventListener("keydown", (event) => {
      let newIndex;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          newIndex = (index + 1) % cards.length;
          cards[newIndex].focus();
          break;

        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          newIndex = (index - 1 + cards.length) % cards.length;
          cards[newIndex].focus();
          break;

        case "Enter":
        case " ":
          event.preventDefault();
          card.querySelector("a").click();
          break;
      }
    });
  });
};

export default {
  render,
  event,
};
