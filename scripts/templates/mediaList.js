import Image from "../model/Image.js";
import Video from "../model/Video.js";

const render = (mediaData) => {
  let media;
  let mediaElement;

  if ("image" in mediaData) {
    media = new Image(mediaData);
    mediaElement = `<img class="main__media-section__media-list__card__head-card__media" src="../assets/images/${mediaData.photographerName}/${media.image}">`;
  } else if ("video" in mediaData) {
    media = new Video(mediaData);
    mediaElement = `<video class="main__media-section__media-list__card__head-card__media" autoplay loop>
    <source src="../assets/images/${mediaData.photographerName}/${media.video}" type="video/webm">
    </video>`;
  }

  return `
  <article class="main__media-section__media-list__card card">
      ${mediaElement}
      <div class="main__media-section__media-list__card__body-card">
        <p class="main__media-section__media-list__card__body-card__title">${media.title}</p>
        <p class="main__media-section__media-list__card__body-card__likes total-likes">
          ${media.likes} 
          <i class="fa-solid fa-heart like-button" aria-label="likes"></i>
        </p>
      </div>
    </article>  
  `;
};

const event = () => {};

export default {
  render,
  event,
};
