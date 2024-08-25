const render = () => {
  return `
      <section class="filter-section" aria-labelledby="sort-heading">
        <h2>Trier par</h2>
        <div class="dropdown">
          <button role="button" class="select" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="sort-heading sort-button">
            <span class="selected">Popularité</span>
            <i class="fa-solid fa-chevron-down chevron-down" aria-hidden="true"></i>
          </button>
          <ul class="menu" role="listbox" aria-labelledby="sort-button" tabindex="-1">
            <li class="option active" role="option" data-sort="popularity" aria-selected="true" tabindex="0">Popularité</li>
            <li class="option" role="option" data-sort="date" aria-selected="false" tabindex="0">Date</li>
            <li class="option" role="option" data-sort="title" aria-selected="false" tabindex="0">Titre</li>
          </ul>
        </div>
      </section>
    `;
};

const event = (sortBy) => {
  const dropdown = document.querySelector(".dropdown");
  const select = document.querySelector(".select");
  const chevron = document.querySelector(".chevron-down");
  const menu = document.querySelector(".menu");
  const options = document.querySelectorAll(".option");
  const selected = document.querySelector(".selected");

  let currentFocus = -1;

  const closeMenu = () => {
    select.classList.remove("selected-clicked");
    select.setAttribute("aria-expanded", "false");
    chevron.classList.remove("chevron-rotate");
    menu.classList.remove("open-menu");
  };

  const openMenu = () => {
    select.classList.add("selected-clicked");
    select.setAttribute("aria-expanded", "true");
    chevron.classList.add("chevron-rotate");
    menu.classList.add("open-menu");
    currentFocus = 0;
    options[0].focus();
  };

  const updateSelection = (selectedOption) => {
    selected.textContent = selectedOption.textContent;
    options.forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-selected", "false");
    });
    selectedOption.classList.add("active");
    selectedOption.setAttribute("aria-selected", "true");

    closeMenu();

    const sortType = selectedOption.dataset.sort;

    if (typeof sortBy === "function") {
      sortBy(sortType);
    }

    updateUrlWithSort(sortType);
  };

  select.addEventListener("click", () => {
    const isExpanded = select.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      updateSelection(option);
    });
  });

  dropdown.addEventListener("keydown", (event) => {
    const isMenuOpen = menu.classList.contains("open-menu");
    const focusedOption = document.querySelector(".option.focused");
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isMenuOpen) {
          openMenu();
        } else {
          updateSelection(focusedOption);
        }
        break;

      case "Escape":
      case "Backspace":
        event.preventDefault();
        closeMenu();
        select.focus();
        break;

      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (menu.classList.contains("open-menu")) {
          if (event.key === "ArrowDown") {
            currentFocus = (currentFocus + 1) % options.length;
          } else {
            currentFocus = (currentFocus - 1 + options.length) % options.length;
          }

          options.forEach((opt, index) => {
            if (index === currentFocus) {
              opt.classList.add("focused");
              opt.focus();
            } else {
              opt.classList.remove("focused");
            }
          });
        }
        break;
    }
  });

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
