import { HOME_SECTION, HOME_CONTENT_TYPE } from "../../components/discountsClub/DiscountClubUtils"
import Category from "../../models/discountsClub/Category"
import Coupon from "../../models/discountsClub/Coupon"
import Offer from "../../models/discountsClub/Offer"
import DiscountVoucher from "../../models/discountsClub/DiscountVoucher"

export default class SectionFixed {

    constructor(dictionarySectionFixed) {
        this.bannerList = this._parseSections(dictionarySectionFixed, HOME_SECTION.BANNER)
        this.categoryList = this._parseSections(dictionarySectionFixed, HOME_SECTION.CATEGORY)
        this.featuredList = this._parseSections(dictionarySectionFixed, HOME_SECTION.FEATURED)
    }

    _parseSections(arraySection, type) {
        let filteredList = arraySection.filter(section => section.idSectionType == type.idSectionType)

        return filteredList[0].content.map(content => {
            return this._parseContentItem(content)
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
            case HOME_CONTENT_TYPE.DISCOUNT_VOUCHER.idOfferType:
                return new DiscountVoucher(contentItem)
                break
            default:
                break
        }
    }
}