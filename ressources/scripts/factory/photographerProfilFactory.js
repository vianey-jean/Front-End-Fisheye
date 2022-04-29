// fabrique d'un profil de photographe, avec vidéos et/ou images)

this.mediaprofilFactory = (profil, directory) => {
  this.getMediaCard = () => {
    const mediaCard = document.createElement("article");
    mediaCard.classList.add("profil__content__card");
    if (profil.video) {
      mediaCard.innerHTML = `
            <video class="profil__content__card__media" data-media-id="${profil.id}" src="ressources/images/Photos/${directory}/${profil.video}" tabindex="12" preload="metadata" aria-label="${profil.alt}, ouvrir en pleine page">
                <source src="ressources/images/Photos/${directory}/${profil.video}#t=0.1" type="video/mp4">
            </video>
            <span class="profil__content__card__media__icon fa-solid fa-video" alt="icone qui indique qu'il s'agit d'une image extraite d'une vidéo"></span>
            <div class="profil__content__card__legend">
                <h3 class="profil__content__card__legend__title" tabindex="12" lang="en" aria-label="${profil.title}">${profil.title}</h3>
                <div class="profil__content__card__legend__like" data-like-id="${profil.id}" tabindex="12" aria-label="mentions j'aime, zone cliquable">
                    <span class="profil__content__card__legend__like__cunt" aria-label="nombre de j'aime">${profil.likes}</span>
                    <span class="profil__content__card__legend__like__empty ${profil.liked} fa-heart" aria-label="icone coeur"></span>
                </div>
            </div>
            `;
    } else {
      mediaCard.innerHTML = `
        <img class="profil__content__card__media" data-media-id="${profil.id}" src="ressources/images/Photos/${directory}/${profil.image}"
         tabindex="12" alt="${profil.alt}" aria-label="${profil.alt}, ouvrir en pleine page"/>
        <div class="profil__content__card__legend">
            <h3 class="profil__content__card__legend__title" tabindex="12" lang="en" aria-label="${profil.title}">${profil.title}</h3>
            <div class="profil__content__card__legend__like" data-like-id="${profil.id}" tabindex="12" aria-label="mentions j'aime, zone cliquable">
                <span class="profil__content__card__legend__like__cunt" aria-label="nombre de j'aime">${profil.likes}</span>
                <span class="profil__content__card__legend__like__empty ${profil.liked} fa-heart" aria-label="icone coeur"></span>
            </div>
        </div>
        `;
    }
    return mediaCard;
  };
  return this;
};
