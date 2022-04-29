this.lightboxVue = (medias) => {
  // DOM Elements
  const openLightbox = document.querySelectorAll(
    ".profil__content__card__media"
  );
  const lightbox = document.querySelector("#lightbox");
  const closeLightbox = document.querySelector("#closeBox");
  const mediaInLightbox = document.getElementById("lightbox-container");
  const leftArrow = document.querySelector(".fa-angle-left");
  const rightArrow = document.querySelector(".fa-angle-right");
  let domInsertMediaId = 0;
  let indexOfMediaVue = -1;
  let lastMediaId = 29;
  let photographe = document
    .querySelector(".photographer__card__contact__name")
    .innerHTML.replace(" ", "_");

  // ouvrir l'événement Lightbox (img click ou keydown)
  openLightbox.forEach((mediaClicked) => {
    mediaClicked.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let mediaId = event.target.getAttribute("data-media-id");
      medias.forEach((media) => {
        if (media.id == mediaId) {
          getLightbox(media, mediaInLightbox, photographe);
          indexOfMediaVue = medias.findIndex(
            (media) => media.id == domInsertMediaId
          );
        }
      });
      launchLightbox();
      navigate();
    });
    mediaClicked.addEventListener("keydown", (enterEvent) => {
      if (enterEvent.keyCode === 13 || enterEvent.keyCode === 32) {
        enterEvent.preventDefault();
        enterEvent.stopPropagation();
        mediaClicked.click();
      }
    });
  });

  // navigation dans la lightbox (flèches ou clavier)
  function navigate() {
    leftArrow.addEventListener("click", leftAction);
    rightArrow.addEventListener("click", rightAction);
    leftArrow.addEventListener("keydown", (leftEvent) => {
      if (leftEvent.keyCode === 13 || leftEvent.keyCode === 32) {
        leftEvent.preventDefault();
        leftAction();
      }
    });
    rightArrow.addEventListener("keydown", (rightEvent) => {
      if (rightEvent.keyCode === 13 || rightEvent.keyCode === 32) {
        rightEvent.preventDefault();
        rightAction();
      }
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        leftAction();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        rightAction();
      } else if (
        event.keyCode === 27 &&
        lightbox.contains(document.activeElement)
      ) {
        event.preventDefault();
        lastMediaId = document
          .querySelector(".lightbox__content__container__media__insert")
          .getAttribute("data-media-id");
        closeDelay(lastMediaId);
      }
    });
    closeLightbox.addEventListener("keydown", (e) => {
      if (e.keyCode === 9 && closeLightbox.contains(document.activeElement)) {
        e.preventDefault();
        e.stopPropagation();
        lightbox.focus();
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        lastMediaId = document
          .querySelector(".lightbox__content__container__media__insert")
          .getAttribute("data-media-id");
        closeDelay(lastMediaId);
      }
    });
  }

  const rightAction = () => {
    if (indexOfMediaVue > -1 && indexOfMediaVue < medias.length - 1) {
      indexOfMediaVue++;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[indexOfMediaVue], mediaInLightbox, photographe);
    } else if (indexOfMediaVue == medias.length - 1) {
      indexOfMediaVue = 0;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[0], mediaInLightbox, photographe);
    }
  };

  const leftAction = () => {
    if (indexOfMediaVue > 0) {
      indexOfMediaVue--;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[indexOfMediaVue], mediaInLightbox, photographe);
    } else if (indexOfMediaVue == 0) {
      indexOfMediaVue = medias.length - 1;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[medias.length - 1], mediaInLightbox, photographe);
    }
  };

  // fonction lightbox ouverte
  function launchLightbox() {
    lightbox.setAttribute("aria-hidden", false);
    lightbox.classList.remove("hidden");
    lightbox.style.display = "flex";
    lightbox.focus();

    document.getElementById("body").setAttribute("aria-hidden", true);
    document.getElementById("body").classList.add("hidden");
  }

  // délai de fermeture pour conserver le dernier média dans la lightbox
  function closeDelay(lastMedia) {
    openLightbox.forEach((media) => {
      let mediaTarget = media.getAttribute("data-media-id");
      if (mediaTarget == lastMedia) {
        media.focus();
      }
    });
    setTimeout(quitLightbox, 100);
  }

  // fermer l'événement lightbox et se concentrer sur le même média dans le profil
  closeLightbox.addEventListener("click", (e) => {
    e.preventDefault();
    lastMediaId = document
      .querySelector(".lightbox__content__container__media__insert")
      .getAttribute("data-media-id");
    closeDelay(lastMediaId);
  });

  // fermer la fonction lightbox
  function quitLightbox() {
    document.getElementById("body").setAttribute("aria-hidden", false);
    document.getElementById("body").classList.remove("hidden");

    lightbox.setAttribute("aria-hidden", true);
    lightbox.classList.add("hidden");
    lightbox.style.display = "none";

    document.getElementById("lightbox-container").innerHTML = ``;
  }

  // Démander la création des éléments
  const getLightbox = (mediaSelected, domPlace, photographerIdentity) => {
    let self = this;
    const temp = self.lightboxFactory(mediaSelected, photographerIdentity);
    const newLightboxVue = temp.self.getLightboxVue();
    domPlace.appendChild(newLightboxVue);
    domInsertMediaId = newLightboxVue
      .querySelector(".lightbox__content__container__media__insert")
      .getAttribute("data-media-id");
    return domInsertMediaId;
  };
};
