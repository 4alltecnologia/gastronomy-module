import { BASE_URL_IMAGE } from "../../api/APIConfiguration"
import Unity from "../unityDetails/Unity"

export default class DiscountVoucher {

    constructor(dictionaryVoucher) {
        this.idOfferType = dictionaryVoucher.idOfferType
        this.idDiscountVoucher = dictionaryVoucher.idDiscountVoucher
        this.name = dictionaryVoucher.name
        this.image = BASE_URL_IMAGE.concat(dictionaryVoucher.image)
        this.position = !!dictionaryVoucher.position ? dictionaryVoucher.position : 0
        this.originalPrice = !!dictionaryVoucher.originalPrice ? dictionaryVoucher.originalPrice : 0
        this.price = !!dictionaryVoucher.price ? dictionaryVoucher.price : 0
        this.unity = !!dictionaryVoucher.unity ? new Unity(dictionaryVoucher.unity) : null
    }

}