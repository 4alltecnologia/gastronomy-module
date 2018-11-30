import { HOME_SECTION, HOME_CONTENT_TYPE } from "../../components/discountsClub/DiscountClubUtils"

export default class SectionDynamic {

    constructor(dictionarySectionFixed) {
        this.bannerList = this._parseSections(dictionarySectionFixed, HOME_SECTION.BANNER)
        this.categoryList = this._parseSections(dictionarySectionFixed, HOME_SECTION.CATEGORY)
        this.featuredList = this._parseSections(dictionarySectionFixed, HOME_SECTION.FEATURED)
    }

    //TODO: HANDLE DYNAMIC SECTION
    _parseSections(arraySection, type) {
        let filteredList = arraySection.filter(section => section.idSectionType == type.idSectionType)
        return []

        // return filteredList[0].content.map(content => {
        //     return this._parseContentItem(content)
        // })
    }

    _parseContentItem(contentItem) {
        switch (contentItem.idContentType) {
            case HOME_CONTENT_TYPE.COUPON.idContentType:
                return new Coupon(contentItem)
                break
            case HOME_CONTENT_TYPE.OFFER.idContentType:
                return new Offer(contentItem)
                break
            case HOME_CONTENT_TYPE.CATEGORY.idContentType:
                return new Category(contentItem)
                break
            case HOME_CONTENT_TYPE.DISCOUNT_VOUCHER.idContentType:
                return new DiscountVoucher(contentItem)
                break
            case default:
                return
                break
        }
    }

}