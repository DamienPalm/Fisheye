import { renderMedia } from "../factories/mediaRenderer.js";

let lightbox;

const render = () => {
  return `
    <div class="lightbox__body-lightbox">
      <img class="lightbox__close-button" src="./assets/icons/closeLightbox.svg" id="close-button">
      <i class="lightbox__body-lightbox__prev-button fa-solid fa-chevron-left"></i>
      <div class="lightbox__body-lightbox__media-content"></div>
      <i class="lightbox__body-lightbox__next-button fa-solid fa-chevron-right"></i>
    </div>
    <h2 class="lightbox__media-title"></h2>
    `;
};

const updateLightboxContent = (media) => {
  const mediaContent = lightbox.querySelector(
    ".lightbox__body-lightbox__media-content"
  );
  const mediaTitle = lightbox.querySelector(".lightbox__media-title");

  mediaContent.innerHTML = renderMedia(media);
  mediaTitle.textContent = media.title;
};

const event = (allMedia) => {
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxContent(allMedia[currentIndex]);
    lightbox.classList.add("active");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
  };

  const setupEventListeners = () => {
    const closeButton = lightbox.querySelector(".lightbox__close-button");
    const prevButton = lightbox.querySelector(
      ".lightbox__body-lightbox__prev-button"
    );
    const nextButton = lightbox.querySelector(
      ".lightbox__body-lightbox__next-button"
    );

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
      updateLightboxContent(allMedia[currentIndex]);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % allMedia.length;
      updateLightboxContent(allMedia[currentIndex]);
    });
  };

  if (!lightbox) {
    lightbox = document.getElementById("lightbox");
    if (!lightbox) {
      lightbox = document.createElement("article");
      lightbox.className = "lightbox";
      lightbox.id = "lightbox";
      document.body.appendChild(lightbox);
    }
    lightbox.innerHTML = render();
    setupEventListeners();
  }

  document.addEventListener("keydown", (event) => {
    if (lightbox && lightbox.classList.contains("active")) {
      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          lightbox
            .querySelector(".lightbox__body-lightbox__prev-button")
            .click();
          break;
        case "ArrowRight":
          lightbox
            .querySelector(".lightbox__body-lightbox__next-button")
            .click();
          break;
        default:
          break;
      }
    }
  });

  return {
    open: openLightbox,
    close: closeLightbox,
  };
};

export default {
  event,
};
