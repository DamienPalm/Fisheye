import { closeModal } from "../utils/contactForm.js";

const render = (photographer) => {
  return `
    <div class="modal-background" id="contact-modal">
      <div class="modal-background__modal">
        <header class="modal-background__modal__header">
          <h2 class="modal-background__modal__header__title">Contactez-moi ${photographer.name}</h2>
          <img class="modal-background__modal__header__closeButton" src="./assets/icons/close.svg" id="close-button" tabindex="0">
        </header>
        <form action="#" method="post" class="modal-background__modal__form" name="contact-me">
          <div class="modal-background__modal__form__formData">
            <label class="modal-background__modal__form__formData__label" for="firstName">Prénom</label>
            <input type="text" class="modal-background__modal__form__formData__input" id="firstName" name="firstName" tabindex="0">
          </div>
          <div class="modal-background__modal__form__formData">
            <label class="modal-background__modal__form__formData__label" for="lastName">Nom</label>
            <input type="text" class="modal-background__modal__form__formData__input" id="lastName" name="lastName" tabindex="0">
          </div>
          <div class="modal-background__modal__form__formData">
            <label class="modal-background__modal__form__formData__label" for="email">Email</label>
            <input type="email" class="modal-background__modal__form__formData__input" id="email" name="email" autocomplete="off" tabindex="0">
          </div>
          <div class="modal-background__modal__form__formData">
            <label class="modal-background__modal__form__formData__label" for="yourMessage">Votre message</label>
            <textarea class="modal-background__modal__form__formData__textarea" id="yourMessage" name="yourMessage" tabindex="0"></textarea>
          </div>
          <button class="modal-background__modal__form__button" tabindex="0">Envoyer</button>
        </form>
      </div>
    </div>
    `;
};

const event = () => {
  const closeModalButton = document.getElementById("close-button");
  closeModalButton.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
};

export default {
  render,
  event,
};
