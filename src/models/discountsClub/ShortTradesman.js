import { BASE_URL_IMAGE } from "../../api/APIConfiguration"

export default class ShortTradesman {

    constructor(dictionaryTradesman) {
        this.idOfferType = dictionaryTradesman.idOfferType
        this.image = BASE_URL_IMAGE.concat(dictionaryTradesman.image)
        this.idUnity = dictionaryTradesman.idUnity
        this.name = dictionaryTradesman.name
        this.distance = dictionaryTradesman.distance
    }

}