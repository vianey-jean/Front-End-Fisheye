class Profil {
    constructor() {
        this.profilPhotographe = document.querySelector('#profil-infos-photographe');
        this.profilListePhotos = document.querySelector('#profil-liste-photos');
        this.profilLikes = document.querySelector('#profil-likes');

        this.photographesApi = new PhotographeApi('ressources/data/photographers.json');
    }

    async main() {
        let idURL = new URL(window.location.href).searchParams.get("id");
        let nomPhotographe = "";
        switch (idURL) {
            case "243":
                nomPhotographe = "Mimi";
                break;
            case "930":
                nomPhotographe = "Ellie_Rose";
                break;
            case "82":
                nomPhotographe = "Tracy";
                break;
            case "527":
                nomPhotographe = "Nabeel";
                break;
            case "925":
                nomPhotographe = "Rhode";
                break;
            case "195":
                nomPhotographe = "Marcel";
                break;
            default:
                break;
        }

        let photographesData = await this.photographesApi.getPhotographes();
        let Photographe = photographesData.map(photographe => new ProfilPhotographeFactory(photographe, idURL));
        Photographe.forEach(photographe => {
            const ProfilTemplate = new PhotographeProfil(photographe, idURL);
            this.profilPhotographe.append(
                ProfilTemplate.createPhotographeProfil()
            );
         
        });

        let photosData = await this.photographesApi.getPhotos();
        let Photo = photosData.map(photo => new PhotoFactory(photo, idURL));
        Photo.forEach(photo => {
            if ("image" in photo) {
                let PhotoTemplate = new PhotographePhoto(photo, idURL, nomPhotographe);
                this.profilListePhotos.append(
                    PhotoTemplate.createPhotographeGallerie()
                );
            } else {
                let PhotoTemplate = new PhotographeVideo(photo, idURL, nomPhotographe);
                this.profilListePhotos.append(
                    PhotoTemplate.createPhotographeGallerie()
                );
            }
        });


    }
}

const profil = new Profil();
profil.main()




