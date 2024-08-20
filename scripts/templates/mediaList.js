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

const event = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const like = card.querySelector(".like-button");
    const totalLikes = card.querySelector(".total-likes");
    let likes = parseInt(totalLikes.textContent);

    like.addEventListener("click", () => {
      like.classList.toggle("liked");

      if (like.classList.contains("liked")) {
        likes++;
      } else {
        likes--;
      }

      totalLikes.textContent = likes + " ";
      totalLikes.appendChild(like);

      updateTotaleLikeDisplay();
    });
  });
};

function calculateTotalLikes() {
  const allTotalLikes = document.querySelectorAll(".total-likes");
  let totalLikes = 0;
  allTotalLikes.forEach((element) => {
    totalLikes += parseInt(element.textContent);
  });
  return totalLikes;
}

function updateTotaleLikeDisplay() {
  const totalLikesElement = document.querySelector(
    ".main__likes-section__like-counter"
  );
  if (totalLikesElement) {
    totalLikesElement.textContent = calculateTotalLikes();
  }
}

export default {
  render,
  event,
};
