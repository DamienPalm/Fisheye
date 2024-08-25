import Lightbox from "./lightbox.js";
import { attachLikeEvents } from "../utils/counterLike.js";
import { renderMedia } from "../factories/mediaRenderer.js";

const render = (mediaData) => {
  const mediaElement = renderMedia(mediaData);

  return `
  <article class="main__media-section__media-list__card card">
      ${mediaElement}
      <div class="main__media-section__media-list__card__body-card">
        <p class="main__media-section__media-list__card__body-card__title">${mediaData.title}</p>
        <p class="main__media-section__media-list__card__body-card__likes total-likes">
          ${mediaData.likes} 
          <i class="fa-solid fa-heart like-button" aria-label="likes"></i>
        </p>
      </div>
    </article>  
  `;
};

const attachMediaEvents = (lightbox, allMedia) => {
  const mediaItems = document.querySelectorAll(".media-item");
  mediaItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      lightbox.open(index, allMedia);
    });
  });
};

const event = (photographer, media) => {
  const lightbox = Lightbox.event(media);
  attachMediaEvents(lightbox, photographer, media);
  attachLikeEvents();
};

export default {
  render,
  event,
};
