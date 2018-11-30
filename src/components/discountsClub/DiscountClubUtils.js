export const HOME_CONTENT_TYPE = {
    COUPON: { //CAMPAIGN
        idOfferType: 1,
        type: "campaign"
    },
    OFFER: {
        idOfferType: 2,
        type: "product"
    },
    CATEGORY: {
        idOfferType: 3,
        type: "category"
    },
    DISCOUNT_VOUCHER: {
        idOfferType: 4,
        type: "discountVoucher"
    },
    TRADESMAN: {
        idOfferType: 5,
        type: "tradesman"
    },
    STATEMENT: { //LOCAL ONLY
        type: "statement"
    }
}

export const HOME_SECTION = {
    BANNER: {
        idSectionType: 1,
        supportedItens: [HOME_CONTENT_TYPE.OFFER, HOME_CONTENT_TYPE.COUPON, HOME_CONTENT_TYPE.DISCOUNT_VOUCHER, HOME_CONTENT_TYPE.CATEGORY]
    },
    STATEMENT: {
        idSectionType: 2,
        supportedItens: [HOME_CONTENT_TYPE.STATEMENT]
    },
    CATEGORY: {
        idSectionType: 3,
        supportedItens: [HOME_CONTENT_TYPE.CATEGORY]
    },
    FEATURED: {
        idSectionType: 4,
        supportedItens: [HOME_CONTENT_TYPE.OFFER, HOME_CONTENT_TYPE.COUPON, HOME_CONTENT_TYPE.DISCOUNT_VOUCHER, HOME_CONTENT_TYPE.CATEGORY] //, HOME_CONTENT_TYPE.FEATURED, HOME_CONTENT_TYPE.PLAYLIST]
    }
}