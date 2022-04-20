class Accueil {
    constructor() {
        this.listePhotographes = document.querySelector('#liste-photographes');//selection sur la classe liste-photographes
        
        this.photographesApi = new PhotographeApi('ressources/data/photographers.json');// récuperation donné sur json
    }

    async main() {
        /** Système de retour au contenu **/
        window.onscroll = function() {
            if (window.scrollY != 0) {
                document.getElementById("retour-contenu").style.display = "block";
            } else {
                document.getElementById("retour-contenu").style.display = "none";
            }
        }

        let photographesData = await this.photographesApi.getPhotographes();
        let Photographe = photographesData.map(photographe => new PhotographesFactory(photographe));

        Photographe.forEach(photographe => {
            let CarteTemplate = new PhotographesCarte(photographe);
            this.listePhotographes.appendChild(
                CarteTemplate.createPhotographeCarte()
            );
        })
    }
}

let accueil = new Accueil();
accueil.main()





