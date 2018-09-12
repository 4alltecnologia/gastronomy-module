import { BASE_URL_IMAGE } from "../configs"
import ProductVariation from "./ProductVariation"

export default class Product {

    constructor(productDictionary) {
        this.id = productDictionary.id
        this.name = productDictionary.name
        this.desc = productDictionary.desc
        this.price = productDictionary.price
        this.originalPrice = productDictionary.originalPrice
        this.image = !!productDictionary.image ? BASE_URL_IMAGE + productDictionary.image : ""
        this.productVariations = this._parseProductVariations(productDictionary.productVariations)
    }

    _parseProductVariations(productVariations) {
        return productVariations.map(variation => {
            return new ProductVariation(variation)
        })
    }

}