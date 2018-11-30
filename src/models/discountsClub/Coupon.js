import { BASE_URL_IMAGE } from "../../api/APIConfiguration"
import Unity from "../unityDetails/Unity"

export default class Coupon {

    constructor(dictionaryCoupon) {
        this.idOfferType = dictionaryCoupon.idOfferType
        this.idCampaign = dictionaryCoupon.idCampaign
        this.name = dictionaryCoupon.name
        this.image = BASE_URL_IMAGE.concat(dictionaryCoupon.image)
        this.position = dictionaryCoupon.position
        this.unity = !!dictionaryCoupon.unity ? new Unity(dictionaryCoupon.unity) : null
    }

}