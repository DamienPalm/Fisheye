export function counterLikes(medias) {
  return medias.reduce((total, media) => total + (media.likes || 0), 0);
}

export const handleLikeClick = (likeButton) => {
  const likesContainer = likeButton.closest(".total-likes");
  let likes = parseInt(likesContainer.textContent);

  likeButton.classList.toggle("liked");
  likes += likeButton.classList.contains("liked") ? 1 : -1;

  likesContainer.textContent = likes + " ";
  likesContainer.appendChild(likeButton);

  updateTotalLikeDisplay();
};

export const calculateTotalLikes = () => {
  return Array.from(document.querySelectorAll(".total-likes")).reduce(
    (total, element) => total + parseInt(element.textContent),
    0
  );
};

export const updateTotalLikeDisplay = () => {
  const totalLikesElement = document.querySelector(
    ".main__likes-section__like-counter"
  );
  if (totalLikesElement) {
    totalLikesElement.textContent = calculateTotalLikes();
  }
};

export const attachLikeEvents = () => {
  document.querySelectorAll(".card").forEach((card) => {
    const likeButton = card.querySelector(".like-button");
    likeButton.addEventListener("click", () => handleLikeClick(likeButton));
    likeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        handleLikeClick(likeButton);
      }
    });
  });
};
