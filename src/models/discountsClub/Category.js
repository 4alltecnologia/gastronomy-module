import { BASE_URL_IMAGE } from "../../api/APIConfiguration"

export default class Category {

    constructor(dictionaryCategory) {
        this.idOfferType = dictionaryCategory.idOfferType
        this.idOffersGroup = dictionaryCategory.idOffersGroup
        this.image = BASE_URL_IMAGE.concat(dictionaryCategory.image)
        this.name = dictionaryCategory.name
        this.position = dictionaryCategory.position
    }

}