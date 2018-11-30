import ProductVariationOption from "./ProductVariationOption"

export default class ProductVariation {

    constructor(productVariationDictionary) {
        this.id = productVariationDictionary.id
        this.name = productVariationDictionary.name
        this.max = productVariationDictionary.max
        this.min = productVariationDictionary.min
        this.priceType = productVariationDictionary.priceType
        this.type = productVariationDictionary.type
        this.variation = productVariationDictionary.variation
        this.sortOrder = productVariationDictionary.sortOrder
        this.options = this._parseVariationOptions(productVariationDictionary.options)
    }

    _parseVariationOptions(variationOptions) {
        return variationOptions.map(variationOption => {
            return new ProductVariationOption(variationOption)
        })
    }

}