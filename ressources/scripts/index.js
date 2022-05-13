// variables
let listTags = [];
let tagsZoneDom = document.getElementById("tagsList");
let tagsPhotographerDom = document.querySelector(".photographer__legend__tags");

// fonctions asynchrones extrait de données de fichier json
const fetchData = async () => {//recuperation des donné sur json
  const res = await fetch("ressources/data/photographers.json");// recherche dans une url precis
  const data = await res.json();// on recupère de on met dans le data les valeur obtenues
  //console.log (data); //Il faut activé pour voir les donnné json a recuperer
  return data;
  
};
const getPhotographersData = async () => {
  const data = await fetchData();
  //console.log(data);// recuperation des données
  return data.photographers;
};

// fonction pour créer une liste de balises avec des données json
const getTagsListData = (photographers) => {
  photographers.forEach((photographer) => {
        photographer.tags.forEach((tag) => {
      if (!listTags.includes(tag)) {
        listTags.push(tag);
        //console.log(tag);// Afficher les tags vient de json
      }
    });
  });

  return listTags;
};

// Fabrique de la liste des balises d'en-tête pour la page d'index
const headerTagFactory = (headerTag) => {
  this.getHeaderTag = () => {
    const newHeaderTag = document.createElement("span");
    newHeaderTag.classList.add("tag");
    newHeaderTag.classList.add(headerTag);
    newHeaderTag.setAttribute("data-tag", headerTag);
    newHeaderTag.setAttribute("aria-label", headerTag);
    newHeaderTag.innerHTML = `#${headerTag}`;
    return newHeaderTag;
  };
  return this;
};


// fonction pour créer une liste de balises d'en-tête
const getHeaderTagsList = (listTags) => {
  //let self = this;
  listTags.forEach((tag) => {
    const instance = headerTagFactory(tag);
    const newHeaderTag = instance.getHeaderTag();
    tagsZoneDom.appendChild(newHeaderTag);

    // événement de clic sur un tag
    newHeaderTag.addEventListener("click", (e) => {
      if (e.target.id == "tag-selected") {
        document.location.href = "index.html";
        document.querySelector("h1").focus();
      } else {
        document.location.href = `index.html?tag=${e.target.getAttribute(
          "data-tag"
        )}`;
      }
    });
  });
};



// fonction pour créer des cartes de photographes avec des données json et une sélection de balises
const getPhotographerCards = (photographers, tagSelected) => {
  let self = this;

  // variable qui inclut uniquement les photographes tagués ou tous les photographes si aucun tag n'est sélectionné
  const filteredPhotographers = photographers.filter((photographer) => {
    return !tagSelected || photographer.tags.includes(tagSelected);
  });
  if (tagSelected !== null) {
    document.querySelector("h1").focus();
  }

  // créer et insérer une carte de photographe
  const container = document.getElementById("photographers");
  container.innerHTML = "";
  filteredPhotographers.forEach((photographer) => {
    const instance = self.indexCardFactory(photographer);
    const newCard = instance.self.getCard();
    container.appendChild(newCard);
    // la fonction des balises d'en-tête s'étend à la balise de la carte du photographe
    const personnalTags = newCard.querySelectorAll(
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

// attendre la fonction globale
const init = async () => {
  let self = this;
  const photographers = await getPhotographersData();
  const tagsList = getTagsListData(photographers);

  //balise de recherche d'url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let tagUrl = urlParams.get("tag");

  // fonction de liste de balises d'en-tête d'appel
  getHeaderTagsList(tagsList);

  // gestion des balises sélectionnées et du style css
  tagsList.forEach((tag) => {
    if (tag == tagUrl) {
      let domCardTag = document.getElementsByClassName(tag)[0];
      if (domCardTag) {
        domCardTag.setAttribute("id", "tag-selected");
        domCardTag.setAttribute(
          "aria-label",
          `le mot-clef ${tag} est sélectionné`
        );
      }
    }
  });

  // cartes d'appel des photographes
  getPhotographerCards(photographers, tagUrl);
   // appeler la fonction de navigation du clavier pour les balises
   tagsZoneDom = document.getElementById("tagsList");
   tagsPhotographerDom = document.querySelector(".photographer__legend__tags");
   tagsZoneDom.addEventListener("keydown", (e) => {
     self.enterTagsNav(e, tagsZoneDom);
   });
   tagsPhotographerDom.addEventListener("keydown", (e) => {
     self.enterTagsNav(e, tagsPhotographerDom);
   });

};

init();
