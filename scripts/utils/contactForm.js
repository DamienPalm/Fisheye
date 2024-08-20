export function displayModal() {
  const modal = document.getElementById("contact-modal");
  modal.classList.add("active");
}

export function closeModal() {
  const modal = document.getElementById("contact-modal");
  modal.classList.remove("active");
}
