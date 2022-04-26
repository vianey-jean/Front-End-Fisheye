/** Système de filtres **/
function filtres(type) {
    let photographe = document.querySelectorAll(".photographe");
    photographe.forEach(function (photographe) {
      photographe.style.display = "none";
    });
    let filtrePhotographe = document.querySelectorAll("." + type);
    filtrePhotographe.forEach(function (filtrePhotographe) {
      filtrePhotographe.style.display = "block";
    });
  }