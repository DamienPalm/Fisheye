import Image from "../model/Image.js";
import Video from "../model/Video.js";

export const renderMedia = (mediaData) => {
  if (!mediaData) {
    console.error("mediaData introuvable");
    return "";
  }

  let media, mediaElement;

  if ("image" in mediaData) {
    media = new Image(mediaData);
    mediaElement = `<img src="../assets/images/${mediaData.photographerName}/${media.image}">`;
  } else if ("video" in mediaData) {
    media = new Video(mediaData);
    mediaElement = `<video autoplay loop>
    <source src="../assets/images/${mediaData.photographerName}/${media.video}" type="video/webm">
    </video>`;
  }

  return mediaElement;
};
