// raccourci vers la section principale (page d'index)

// DOM elements
const shortcut = document.getElementById("shortcut");
const headerDom = document.getElementById("header");

// retard de visibilité
function visibilityDelay() {
  shortcut.style.top = "20px";
  setTimeout(closeShortcut, 6000);
}

// fermer le raccourci de la page d'index
function closeShortcut() {
  shortcut.style.top = "-200px";
}

// Faites défiler l'événement vers le bas
window.addEventListener("scroll", (event) => {
  event.preventDefault();
  event.stopPropagation();
  visibilityDelay();
  if (window.scrollY >= 20) {
    headerDom.classList.add("shadow");
  } else {
    headerDom.classList.remove("shadow");
  }
});
