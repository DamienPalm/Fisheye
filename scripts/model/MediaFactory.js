import Image from "./Image.js";
import Video from "./Video.js";

export default class MediaFactory {
  constructor(data) {
    if (data.image) {
      return new Image(data);
    } else {
      return new Video(data);
    }
  }
}
