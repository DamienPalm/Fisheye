import Lightbox from "./lightbox.js";
import { attachLikeEvents } from "../utils/counterLike.js";
import { renderMedia } from "../factories/mediaRenderer.js";

const render = (mediaData) => {
  const mediaElement = renderMedia(mediaData);

  return `
  <article class="main__media-section__media-list__card card" role="article">
      <div class="main__media-section__media-list__card__head-card__media media-wrapper" tabindex="0" role="button" aria-label="Open ${mediaData.title} in the lightbox">
        ${mediaElement}
      </div>
      <div class="main__media-section__media-list__card__body-card">
        <p class="main__media-section__media-list__card__body-card__title">${mediaData.title}</p>
        <p class="main__media-section__media-list__card__body-card__likes total-likes" aria-label="likes">
          ${mediaData.likes} 
          <i class="fa-solid fa-heart like-button" tabindex="0" aria-label="likes"></i>
        </p>
      </div>
    </article>  
  `;
};

const event = (photographer, media) => {
  const lightbox = Lightbox.event(media);
  const mediaWrappers = document.querySelectorAll(".media-wrapper");
  const cards = document.querySelectorAll(".card");

  mediaWrappers.forEach((wrapper, index) => {
    wrapper.addEventListener("click", () => {
      lightbox.open(index, media);
    });
    wrapper.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        lightbox.open(index, media);
      }
    });
  });

  cards.forEach((card, index) => {
    const mediaWrapper = card.querySelector(".media-wrapper");
    const likeButton = card.querySelector(".like-button");

    mediaWrapper.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          if (index < cards.length - 1) {
            cards[index + 1].querySelector(".media-wrapper").focus();
            console.log(index);
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (index > 0) {
            cards[index - 1].querySelector(".media-wrapper").focus();
            console.log(index);
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          likeButton.focus();
          break;
      }
    });

    likeButton.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          mediaWrapper.focus();
          break;
        case "ArrowRight":
          event.preventDefault();
          if (index < cards.length - 1) {
            cards[index + 1].querySelector(".media-wrapper").focus();
            console.log(index);
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (index > 0) {
            cards[index - 1].querySelector(".media-wrapper").focus();
            console.log(index);
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault;
          attachLikeEvents();
      }
    });
  });

  attachLikeEvents();
};

export default {
  render,
  event,
};
