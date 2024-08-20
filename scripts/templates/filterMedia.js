const render = () => {
  return `
      <section class="filter-section">
        <h2>Trier par</h2>
        <div class="dropdown">
          <button role="button" class="select">
            <span class="selected">Popularité</span>
            <i class="fa-solid fa-chevron-down chevron-down"></i>
          </button>
          <ul class="menu" role="listbox">
            <li class="option active" role="option" data-sort="popularity">Popularité</li>
            <li class="option" role="option" data-sort="date">Date</li>
            <li class="option" role="option" data-sort="title">Titre</li>
          </ul>
        </div>
      </section>
    `;
};

const event = (sortBy) => {
  const select = document.querySelector(".select");
  const chevron = document.querySelector(".chevron-down");
  const menu = document.querySelector(".menu");
  const options = document.querySelectorAll(".option");
  const selected = document.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("selected-clicked");
    chevron.classList.toggle("chevron-rotate");
    menu.classList.toggle("open-menu");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      options.forEach((opt) => {
        opt.classList.remove("active");
      });
      option.classList.add("active");
      select.classList.remove("selected-clicked");
      chevron.classList.remove("chevron-rotate");
      menu.classList.remove("open-menu");
      let sortType;

      switch (option.innerText) {
        case "Popularité":
          sortType = "popularity";
          break;

        case "Date":
          sortType = "date";
          break;

        case "Titre":
          sortType = "title";
          break;

        default:
          console.warn("L'option de tri non reconnue : ", option.innerText);
          return;
      }

      console.log("Filtre sélectionné :", sortType);

      if (typeof sortBy === "function") {
        sortBy(sortType);
      }

      updateUrlWithSort(sortType);
    });
  });
};

const updateUrlWithSort = (sortType) => {
  const url = new URL(window.location);
  url.searchParams.set("sortBy", sortType);
  window.history.pushState({}, "", url);
};

export default {
  render,
  event,
};
