import Image from "../model/Image.js";
import Video from "../model/Video.js";

export const renderMedia = (mediaData) => {
  console.log("renderMedia appelé avec : ", mediaData);

  if (!mediaData) {
    console.error("mediaData introuvable");
    return "";
  }

  let media, mediaElement;

  if ("image" in mediaData) {
    media = new Image(mediaData);
    mediaElement = `<img class="main__media-section__media-list__card__head-card__media media-item" src="../assets/images/${mediaData.photographerName}/${media.image}">`;
  } else if ("video" in mediaData) {
    media = new Video(mediaData);
    mediaElement = `<video class="main__media-section__media-list__card__head-card__media media-item" autoplay loop>
    <source src="../assets/images/${mediaData.photographerName}/${media.video}" type="video/webm">
    </video>`;
  }

  return mediaElement;
};
