export default class ProductVariationOption {

    constructor(productVariationOptionDictionary) {
        this.id = productVariationOptionDictionary.id
        this.name = productVariationOptionDictionary.name
        this.desc = productVariationOptionDictionary.desc
        this.originalPrice = productVariationOptionDictionary.originalPrice
        this.image = productVariationOptionDictionary.image
        this.max = productVariationOptionDictionary.max
        this.sortOrder = productVariationOptionDictionary.sortOrder
    }

}