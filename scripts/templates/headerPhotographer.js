const render = () => {
  return `
      <header class="header" role="banner">
          <a class="header__link__logo" href="./index.html" aria-label="Back to the homepage">
              <img class="header__link__logo" src="../assets/images/logo.webp" alt="Fisheye Home page">
          </a>
      </header>
      `;
};

const event = () => {};

export default {
  render,
  event,
};
