import { displayModal } from "../utils/contactForm.js";

const render = (photographer) => {
  return `
    <section class="main__photographer-profile" aria-label="Photographer profile">
        <article class="main__photographer-profile__info">
            <h1 class="main__photographer-profile__info__name">${
              photographer.name
            }</h1>
            <p class="main__photographer-profile__info__location">${
              photographer.city
            }, ${photographer.country}</p>
            <p class="main__photographer-profile__info__tagline">${
              photographer.tagline
            }</p>
        </article>
        <button class="main__photographer-profile__contact-photographer-button" id="modal-button">Contactez-moi</button>
        <img class="main__photographer-profile__profile-picture" src="${
          photographer.portrait_thumbnail
            ? photographer.portrait_thumbnail
            : "../assets/photographers/account.png"
        }" alt="${photographer.name}">
    </section>
    `;
};

const event = () => {
  const openModalButton = document.getElementById("modal-button");
  openModalButton.addEventListener("click", displayModal);
  openModalButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      displayModal();
    }
  });
};

export default {
  render,
  event,
};
