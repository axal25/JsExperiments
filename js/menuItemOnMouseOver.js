const root = document.documentElement;

const menu = document.getElementById("menu");

const menuItems = menu.querySelector("#menu-items");

const menuItemArray = Array.from(menuItems.querySelectorAll(".menu-item"));

const menuBackGoundHeight = "--menu-background-height";
const defaultPosition = 100;
function setDefaultPosition() {
  root.style.setProperty(menuBackGoundHeight, `${defaultPosition}%`);
}

setDefaultPosition();

let positionStep = -100 / menuItemArray.length;

menuItemArray.forEach((item, index) => {
  item.onmouseout = () => {
    setDefaultPosition();
  };

  item.onmouseenter = () => {
    let position = defaultPosition + (index + 1) * positionStep;
    root.style.setProperty(menuBackGoundHeight, `${position}%`);
  };
});
