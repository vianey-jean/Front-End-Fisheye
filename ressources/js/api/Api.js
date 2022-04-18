class Api {
    constructor(url) {
        this.url = url
    }

    async getPhotographesJSON() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.photographers)
            .catch(err => console.log('erreur', err))
    }

  
}


class PhotographeApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographes() {
        return await this.getPhotographesJSON()
    }


}