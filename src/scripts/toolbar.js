export function handleToolbarThemes(root, themeList) {
  const toolbarThemes = document.querySelector(".toolbar-option.themes");
  const themeListItems = document.querySelectorAll(".toolbar__themes li");

  toolbarThemes.addEventListener("click", (event) => {
    event.preventDefault();
    themeList.classList.toggle("open");
  });

  document.addEventListener("mouseup", (e) => {
    const target = document.querySelector(".toolbar__themes.open");

    if (!target) return;

    if (e.target.className !== toolbarThemes.className) {
      target.classList.remove("open");
    }
  });

  themeListItems.forEach((theme) => {
    theme.addEventListener("click", (item) => {
      root.classList.replace(root.className, item.target.className);
      themeList.classList.remove("open");
    });
  });
}

export function handleToolbarClear(enableMathOperators) {
  const toolbarClear = document.querySelector(".toolbar-option.clear");

  toolbarClear.addEventListener("click", (event) => {
    event.preventDefault();
    enableMathOperators();
    const screen = document.querySelectorAll("#screen span");
    screen.forEach((item) => {
      if (item.innerHTML != "") {
        item.innerHTML = "";
      }
    });
  });
}

export function handleToolbarDelete(currentNumber, enableMathOperators) {
  const toolbarDelete = document.querySelector(".toolbar-option.delete");

  toolbarDelete.addEventListener("click", (event) => {
    event.preventDefault();
    enableMathOperators();
    if (currentNumber.innerHTML != "") {
      currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
    }
  });
}

export function handleToolbarCopy(currentNumber) {
  const toolbarCopy = document.querySelector(".toolbar-option.copy");

  toolbarCopy.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentNumber.innerHTML != "") {
      navigator.clipboard.writeText(currentNumber.innerHTML);
    }
  });
}
