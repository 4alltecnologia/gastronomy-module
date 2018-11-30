import { BASE_URL_IMAGE } from "../../api/APIConfiguration"
import { IdOrderType } from "../../utils"
import Unity from "../unityDetails/Unity"

export default class Offer {

    constructor(dictionaryOffer) {
        this.idOfferType = dictionaryOffer.idOfferType
        this.idMenu = dictionaryOffer.idMenu
        this.idProduct = dictionaryOffer.idProduct
        this.name = dictionaryOffer.name
        this.image = BASE_URL_IMAGE.concat(dictionaryOffer.image)
        this.position = !!dictionaryOffer.position ? dictionaryOffer.position : 0
        this.price = !!dictionaryOffer.price ? dictionaryOffer.price : 0
        this.originalPrice = !!dictionaryOffer.originalPrice ? dictionaryOffer.originalPrice : 0
        this.expirationDate = !!dictionaryOffer.expirationDate ? dictionaryOffer.expirationDate : ""
        this.unity = !!dictionaryOffer.unity ? new Unity(dictionaryOffer.unity) : null
        this.orderType = !!dictionaryOffer.delivery ? IdOrderType.DELIVERY : IdOrderType.TAKEAWAY
        this.availableNow = !!this.unity && ((!!dictionaryOffer.delivery && this.unity.outdoorOpened) || (!!dictionaryOffer.takeaway && this.unity.indoorOpened))
    }

}