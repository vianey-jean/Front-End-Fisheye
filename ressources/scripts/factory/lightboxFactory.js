// fabrique pour insérer une vidéo multimédia ou img dans la lightbox

this.lightboxFactory = (lightMedia, directory) => {
  this.getLightboxVue = () => {
    const mediaContainerInLightbox = document.createElement("div");
    mediaContainerInLightbox.classList.add(
      "lightbox__content__container__media"
    );
    if (lightMedia.video) {
      mediaContainerInLightbox.innerHTML = `
      <video class="lightbox__content__container__media__insert" data-media-id="${lightMedia.id}" src="ressources/images/Photos/${directory}/${lightMedia.video}" controls preload="metadata" tabindex="1" aria-label="${lightMedia.alt}">
          <source src="ressources/images/Photos/${directory}/${lightMedia.video}#t=0.1" type="video/mp4">
      </video>
      <p class="lightbox__content__container__media__title" tabindex="1" lang="en" aria-label="titre du média">${lightMedia.title}</p>
      `;
    } else {
      mediaContainerInLightbox.innerHTML = `
      <img class="lightbox__content__container__media__insert" data-media-id="${lightMedia.id}" src="ressources/images/Photos/${directory}/${lightMedia.image}" 
      tabindex="1" alt="${lightMedia.alt}" aria-label="${lightMedia.alt}"/>
      <p class="lightbox__content__container__media__title" tabindex="1" lang="en" aria-label="titre du média">${lightMedia.title}</p>
      `;
    }
    return mediaContainerInLightbox;
  };
  return this;
};
