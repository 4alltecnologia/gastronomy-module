import Product from "./Product"

export default class ProductCategory {

    constructor(productCategoryDictionary) {
        this.id = productCategoryDictionary.id
        this.name = productCategoryDictionary.name
        this.index = productCategoryDictionary.sortOrder
        this.data = this._parseProducts(productCategoryDictionary.products)
    }

    _parseProducts(products) {
        return products.map(product => {
            return new Product(product)
        })
    }

}