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

  let currentFocus = -1;

  const closeMenu = () => {
    select.classList.remove("selected-clicked");
    chevron.classList.remove("chevron-rotate");
    menu.classList.remove("open-menu");
  };

  const openMenu = () => {
    select.classList.add("selected-clicked");
    chevron.classList.add("chevron-rotate");
    menu.classList.add("open-menu");
  };

  select.addEventListener("click", () => {
    select.classList.toggle("selected-clicked");
    chevron.classList.toggle("chevron-rotate");
    menu.classList.toggle("open-menu");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      closeMenu();

      const sortType = option.dataset.sort;
      console.log("Filtre sélectionné :", sortType);

      if (typeof sortBy === "function") {
        sortBy(sortType);
      }

      updateUrlWithSort(sortType);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (!menu.classList.contains("open-menu")) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    if (e.key === "Escape") {
      closeMenu();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      currentFocus += e.key === "ArrowDown" ? 1 : -1;
      if (currentFocus >= options.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = options.length - 1;

      options.forEach((opt, index) => {
        if (index === currentFocus) {
          opt.classList.add("focused");
          opt.focus();
        } else {
          opt.classList.remove("focused");
        }
      });
    }

    if (e.key === "Enter" && currentFocus !== -1) {
      options[currentFocus].click();
    }
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      closeMenu();
    }
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
