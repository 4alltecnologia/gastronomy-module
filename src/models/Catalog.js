import ProductCategory from "./ProductCategory"
import Product from "./Product"

export default class Catalog {

    constructor(catalogDictionary) {
        this.id = catalogDictionary.id
        this.merchantId = catalogDictionary.merchantId
        this.categories = this._parseCategories(catalogDictionary.categories)
        this.productsOnSale = this._parseProductsOnSale(catalogDictionary.productsOnSale)
    }

    _parseCategories(categories) {
        return categories.map(category => {
            return new ProductCategory(category)
        })
    }

    _parseProductsOnSale(products) {
        return products.map(product => {
            return new Product(product)
        })
    }

}