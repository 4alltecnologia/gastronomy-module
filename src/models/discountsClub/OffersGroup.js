import { HOME_SECTION, HOME_CONTENT_TYPE } from "../../components/discountsClub/DiscountClubUtils"
import Category from "../../models/discountsClub/Category"
import Coupon from "../../models/discountsClub/Coupon"
import Offer from "../../models/discountsClub/Offer"
import DiscountVoucher from "../../models/discountsClub/DiscountVoucher"
import ShortTradesman from "../../models/discountsClub/ShortTradesman"

export default class OffersGroup {

    constructor(arrayOfferGroup) {
        this.items = this._parseContentItems(arrayOfferGroup)
        this.idOfferType = arrayOfferGroup[0].idOfferType
    }

    _parseContentItems(arrayOffersGroup) {
        return arrayOffersGroup.map(item => {
            return this._parseContentItem(item)
        })
    }

    _parseContentItem(contentItem) {
        switch (contentItem.idOfferType) {
            case HOME_CONTENT_TYPE.COUPON.idOfferType:
                return new Coupon(contentItem)
                break
            case HOME_CONTENT_TYPE.OFFER.idOfferType:
                return new Offer(contentItem)
                break
            case HOME_CONTENT_TYPE.CATEGORY.idOfferType:
                return new Category(contentItem)
                break
            case HOME_CONTENT_TYPE.TRADESMAN.idOfferType:
                return new ShortTradesman(contentItem)
                break
            case HOME_CONTENT_TYPE.DISCOUNT_VOUCHER.idOfferType:
                return new DiscountVoucher(contentItem)
                break
            default:
                break
        }
    }

}