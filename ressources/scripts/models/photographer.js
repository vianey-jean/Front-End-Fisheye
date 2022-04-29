// Dom elements
const btnVue = document.getElementById("btn-vue");
const btnSelectMenu = document.getElementById("btn-select-menu");
const btnNotExpanded = document.querySelector(".profil__menu__btn");
const btnMenuInactive = document.getElementById("btn-inactive");
let option1Btn = document.querySelector(".profil__menu__btn2__option-1-vue");
let option2Btn = document.querySelector(".profil__menu__btn2__option-2");
let option3Btn = document.querySelector(".profil__menu__btn2__option-3");

// variables
let surname = "";
let btnSelected = [];
btnSelected.push(option1Btn, option2Btn, option3Btn);

// fonctions asynchrones extrait de données de fichier json
const fetchData = async () => {
  const res = await fetch("ressources/data/photographers.json");
  const data = await res.json();
  return data;
};

const getPhotographersData = async () => {
  const data = await fetchData();
  return data.photographers;
};

const getMediasData = async () => {
  const data = await fetchData();
  return data.media;
};

// ID de recherche d'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlId = urlParams.get("id");

// fonction pour créer une carte de photographe avec des données json et un identifiant d'url
const getPhotographerCard = (photographers) => {
  let self = this;
  photographers.forEach((photographer) => {
    if (photographer.id == urlId) {
      const instance = self.photographerCardFactory(photographer);
      const card = instance.self.getPersonnalCard();
      document
        .getElementById("photographer")
        .insertBefore(card, document.getElementById("photographer").firstChild);
      surname = photographer.name.replace(" ", "_"); // nom de famille à utiliser comme répertoire
      self.getContactForm(photographer);
    }
    // la fonction de balises d'en-tête d'index s'étend à la balise de carte de photographe
    const personnalTags = document.querySelectorAll(
      ".photographer__legend__tags__tag"
    );
    Array.from(personnalTags).forEach((personnalTag) => {
      personnalTag.addEventListener("click", (event) => {
        document.location.href = `index.html?tag=${event.target.getAttribute(
          "data-tag"
        )}`;
      });
    });
  });
};

// fonction pour sélectionner la gestion btn avec clic ou clavier
const btnSelection = (btnClicked, btnClickAction) => {
  let indexOfSelectedBtn = 0;

  btnClicked.forEach((btn) => {
    btn.addEventListener("click", btnClickAction);
    btn.addEventListener("keydown", (enterEvent) => {
      if (enterEvent.keyCode === 13 || enterEvent.keyCode === 32) {
        enterEvent.preventDefault();
        enterEvent.stopPropagation();
        btn.click();
        btnMenuInactive.focus();
        btnSelectMenu.style.display = "none";
        btnMenuInactive.style.boxShadow = "3px 2px 4px v.$shadow";
        indexOfSelectedBtn = 0;
      }
    });
  });

  btnMenuInactive.addEventListener("keydown", (btnEvent) => {
    if (btnEvent.keyCode === 13 || btnEvent.keyCode === 32) {
      btnEvent.preventDefault();
      btnEvent.stopPropagation();
      btnSelectMenu.style.display = "flex";
      btnMenuInactive.style.boxShadow = "none";
      btnSelectMenu.focus();
    }
  });
  btnNotExpanded.addEventListener("mouseover", (mouseEvent) => {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    btnSelectMenu.style.display = "flex";
    btnMenuInactive.style.boxShadow = "none";
    btnSelected[indexOfSelectedBtn].focus();
  });
  btnNotExpanded.addEventListener("mouseout", (mouseEvent) => {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    document.querySelector(".profil__content__card__media").focus();
    btnSelectMenu.style.display = "none";
    btnMenuInactive.style.boxShadow = "3px 2px 4px v.$shadow";
    indexOfSelectedBtn = 0;
  });
  btnSelectMenu.addEventListener("keydown", (navEvent) => {
    if (
      (navEvent.keyCode === 27 &&
        btnSelectMenu.contains(document.activeElement)) ||
      (navEvent.keyCode === 9 &&
        !btnSelectMenu.contains(document.activeElement))
    ) {
      navEvent.preventDefault();
      navEvent.stopPropagation();
      btnMenuInactive.focus();
      btnSelectMenu.style.display = "none";
      btnMenuInactive.style.boxShadow = "3px 2px 4px v.$shadow";
      indexOfSelectedBtn = 0;
    }
    if (navEvent.keyCode === 9 && !navEvent.shiftKey) {
      navEvent.preventDefault();
      indexOfSelectedBtn++;
      if (indexOfSelectedBtn == btnSelected.length) {
        indexOfSelectedBtn = 0;
        btnSelected[indexOfSelectedBtn].focus();
      } else {
        btnSelected[indexOfSelectedBtn].focus();
      }
    } else if (navEvent.shiftKey && navEvent.keyCode === 9) {
      navEvent.preventDefault();
      indexOfSelectedBtn--;
      if (indexOfSelectedBtn == -1) {
        indexOfSelectedBtn = btnSelected.length - 1;
        btnSelected[indexOfSelectedBtn].focus();
      } else {
        btnSelected[indexOfSelectedBtn].focus();
      }
    }
  });
};

// fonction pour créer chaque carte média 
const getPhotographerprofil = (mediasArray, photographerName) => {
  let self = this;
  document.getElementById("profilContent").innerHTML = "";
  mediasArray.forEach((media) => {
    const temp = self.mediaprofilFactory(media, photographerName);
    const newMediaCard = temp.self.getMediaCard();
    document.getElementById("profilContent").appendChild(newMediaCard);
  });
  // possibilité d'appel lightbox
  self.lightboxVue(mediasArray);
};

// fonction pour l'ordre des médias et les médias  likes
const getPhotographerMedias = (medias, photographerIdentity) => {
  // dom elements and variables
  const totalLikesFooter = document.querySelector(".footer__infos__cunt");
  const likeZones = document.getElementsByClassName(
    "profil__content__card__legend__like"
  );
  let btnActive = "";

  // appeler les médias de l'url id photographe
  let photographerMedias = medias.filter(
    (media) => media.photographerId == urlId
  );
  // pour ajouter des paramètres à chaque média pour la gestion des likes
  let personnalMedias = photographerMedias.map((media) => ({
    ...media,
    liked: "far",
  }));

  // ctrl si le stockage local des médias a Like
  personnalMedias = personnalMedias.map((media) => {
    if (localStorage.getItem(`${media.id}_heart`) !== null) {
      media.liked = localStorage.getItem(`${media.id}_heart`);
      media.likes = parseInt(localStorage.getItem(`${media.id}_likes`));
    }
    return media;
  });

  // ordre par défaut des médias (popularité)
  personnalMedias.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1;
    } else if (a.likes < b.likes) {
      return 1;
    } else {
      return 0;
    }
  });

  // appeler la fonction de création pour ce média
  getPhotographerprofil(personnalMedias, photographerIdentity);

  // ajouter le total des médias dans le pied de page
  totalLikesFooter.innerText = personnalMedias.reduce(
    (likes, media) => likes + media.likes,
    0
  );

  // gestion des likes au clic et au clavier
  Array.from(likeZones).forEach((likeZone) => {
    likeZone.addEventListener("click", (e) => {
      const zoneToClick = e.target.classList.contains(
        "profil__content__card__legend__like"
      )
        ? e.target
        : e.target.closest(".profil__content__card__legend__like");
      const heart = Array.from(zoneToClick.children).find((el) =>
        el.classList.contains("profil__content__card__legend__like__empty")
      );
      const likesVue = zoneToClick.querySelector(
        ".profil__content__card__legend__like__cunt"
      );
      const mediaId = zoneToClick.getAttribute("data-like-id");
      personnalMedias = personnalMedias.map((media) => {
        if (mediaId == media.id) {
          if (media.liked == "far") {
            media.likes++;
            media.liked = "fas";
            heart.setAttribute("data-prefix", "fas");
          } else {
            media.likes--;
            media.liked = "far";
            heart.setAttribute("data-prefix", "far");
          }
          likesVue.innerHTML = media.likes;
          totalLikesFooter.innerText = personnalMedias.reduce(
            (likes, media) => likes + media.likes,
            0
          );
          //AJOUTER AU STOCKAGE LOCAL
          localStorage.setItem(`${media.id}_likes`, `${media.likes}`);
          localStorage.setItem(`${media.id}_heart`, `${media.liked}`);
        }
        return media;
      });
    });
    likeZone.addEventListener("keydown", (onClick) => {
      if (onClick.keyCode === 13 || onClick.keyCode === 32) {
        onClick.preventDefault();
        onClick.stopPropagation();
        likeZone.click();
      }
    });
  });

  // changer l'ordre des médias et transformer le bouton de sélection personnalisé
  btnSelection(btnSelected, (event) => {
    event.preventDefault();
    btnActive = event.target.getAttribute("data-option");
    switch (btnActive) {
      case "date":
        personnalMedias.sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          } else {
            return 0;
          }
        });
        btnVue.innerText = "Date";
        option1Btn.setAttribute("data-option", "date");
        option1Btn.innerText = "Date";
        option2Btn.setAttribute("data-option", "pop");
        option2Btn.innerText = "Popularité";
        option3Btn.setAttribute("data-option", "title");
        option3Btn.innerText = "Titre";
        break;
      case "title":
        personnalMedias.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          } else if (a.title > b.title) {
            return 1;
          } else {
            return 0;
          }
        });
        btnVue.innerText = "Titre";
        option1Btn.setAttribute("data-option", "title");
        option1Btn.innerText = "Titre";
        option2Btn.setAttribute("data-option", "pop");
        option2Btn.innerText = "Popularité";
        option3Btn.setAttribute("data-option", "date");
        option3Btn.innerText = "Date";
        break;
      case "pop":
        personnalMedias.sort((a, b) => {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        });
        btnVue.innerText = "Popularité";
        option1Btn.setAttribute("data-option", "pop");
        option1Btn.innerText = "Popularité";
        option2Btn.setAttribute("data-option", "date");
        option2Btn.innerText = "Date";
        option3Btn.setAttribute("data-option", "title");
        option3Btn.innerText = "Titre";
        break;
      default:
        personnalMedias.sort((a, b) => {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        });
        btnVue.innerText = "Popularité";
        option1Btn.setAttribute("data-option", "pop");
        option1Btn.innerText = "Popularité";
        option2Btn.setAttribute("data-option", "date");
        option2Btn.innerText = "Date";
        option3Btn.setAttribute("data-option", "title");
        option3Btn.innerText = "Titre";
        break;
    }
    // appeler la fonction de création pour ce média
    getPhotographerprofil(personnalMedias, photographerIdentity);
    // gestion des likes au clic et au clavier
    Array.from(likeZones).forEach((likeZone) => {
      likeZone.addEventListener("click", (e) => {
        const zoneToClick = e.target.classList.contains(
          "profil__content__card__legend__like"
        )
          ? e.target
          : e.target.closest(".profil__content__card__legend__like");
        const heart = Array.from(zoneToClick.children).find((el) =>
          el.classList.contains("profil__content__card__legend__like__empty")
        );
        const likesVue = zoneToClick.querySelector(
          ".profil__content__card__legend__like__cunt"
        );
        const mediaId = zoneToClick.getAttribute("data-like-id");
        personnalMedias = personnalMedias.map((media) => {
          if (mediaId == media.id) {
            if (media.liked == "far") {
              media.likes++;
              media.liked = "fas";
              heart.setAttribute("data-prefix", "fas");
            } else {
              media.likes--;
              media.liked = "far";
              heart.setAttribute("data-prefix", "far");
            }
            likesVue.innerHTML = media.likes;
            // ajouter le total des médias dans le pied de page
            totalLikesFooter.innerText = personnalMedias.reduce(
              (likes, media) => likes + media.likes,
              0
            );
            // AJOUTER AU STOCKAGE LOCAL
            localStorage.setItem(`${media.id}_likes`, `${media.likes}`);
            localStorage.setItem(`${media.id}_heart`, `${media.liked}`);
          }
          return media;
        });
      });
      likeZone.addEventListener("keydown", (onClick) => {
        if (onClick.keyCode === 13 || onClick.keyCode === 32) {
          onClick.preventDefault();
          onClick.stopPropagation();
          likeZone.click();
        }
      });
    });
  });
};

// attendre la fonction globale
const init = async () => {
  //localStorage.clear(); // si besoin
  let self = this;
  const photographers = await getPhotographersData();
  const medias = await getMediasData();
  // appeler la carte du photographe
  getPhotographerCard(photographers);
  // appeler la fonction de navigation du clavier pour les balises
  let tagsPhotographerDom = document.querySelector(
    ".photographer__legend__tags"
  );
  tagsPhotographerDom.addEventListener("keydown", (e) => {
    self.enterTagsNav(e, tagsPhotographerDom);
  });
  // appeler les médias du photographe par ordre de popularité et likes connus (stockage local)
  getPhotographerMedias(medias, surname);
};

init();
