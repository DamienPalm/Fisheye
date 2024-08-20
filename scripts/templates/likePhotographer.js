import { counterLikes } from "../utils/counterLike.js";

const render = (photographer, media) => {
  const likes = counterLikes(media);

  return `
    <div class="main__likes-section">
      <div class="main__like-section__div">
        <p class="main__likes-section__like-counter">${likes}</p>
        <i class="main__likes-section__heart fa-solid fa-heart"></i>
      </div>
        <p class="main__likes-section__price">${photographer.price}€/jour</p>
    </div>
    `;
};

const event = () => {};

export default {
  render,
  event,
};
