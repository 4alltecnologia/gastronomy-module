import { BASE_URL_IMAGE } from "../api/APIConfiguration"
import ProductVariation from "./ProductVariation"
import { IdOrderType } from "../utils"

export default class Product {

    constructor(productDictionary) {
        this.id = productDictionary.id
        this.name = productDictionary.name
        this.desc = productDictionary.desc
        this.salesDescription = !!productDictionary.salesDescription ? productDictionary.salesDescription : ""
        this.price = productDictionary.price
        this.originalPrice = productDictionary.originalPrice
        this.image = !!productDictionary.image ? BASE_URL_IMAGE + productDictionary.image : ""
        this.productVariations = this._parseProductVariations(productDictionary.productVariations)
        this.orderType = !!productDictionary.delivery ? (!!productDictionary.takeaway ? productDictionary.orderType : IdOrderType.DELIVERY) : IdOrderType.TAKEAWAY
    }

    _parseProductVariations(productVariations) {
        return productVariations.map(variation => {
            return new ProductVariation(variation)
        })
    }
}