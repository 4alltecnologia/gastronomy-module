import * as Database from "../StorageBase"
import { PriceType } from "../../utils"

//Products methods
export function saveProduct(product, callback:(error, data) => void) {
    if (!product.wasModified) {
        product.wasModified = true
        product.totalValue = product.price
        product.modifiers = []
    }

    Database.setData("product", product, (error, data) => {
        error ? callback(error, null) : callback(null, data)
    })
}

export function getProduct(callback:(error, data) => void) {
    Database.getData("product", (error, product) => {
        error ? callback(error, null) : callback(null, JSON.parse(product))
    })
}

export function removeProduct(callback: (error) => void) {
    Database.removeData("product", (error) => {
        error ? callback(error) : callback(null)
    })
}

export function addProductModifier(productModifier, selectedModifiers, callback: (error, data) => void) {
    getProduct((errorGetProduct, product) => {
        if (errorGetProduct) {
            callback(errorGetProduct, null)
        } else {
            let newModifiers = product.modifiers.filter(modifier => modifier.id != productModifier.id)
            let modifiersToDelete = product.modifiers.filter(modifier => modifier.id == productModifier.id)

            productModifier.options = selectedModifiers

            let productModifierValue = sumModifiersValue([productModifier])
            let newModifiersValue = sumModifiersValue(newModifiers)
            let modifiersToDeleteValue = sumModifiersValue(modifiersToDelete)

            newModifiers.push(productModifier)

            product.modifiers = newModifiers
            product.modifiersText = formatModifiersText(product.modifiers)

            product.totalValue = product.totalValue + productModifierValue - modifiersToDeleteValue

            saveProduct(product, (errorSaveProduct, data) => {
                errorSaveProduct ? callback(errorSaveProduct, null) : callback(null, data)
            })
        }
    })
}

export function removeProductModifier(productModifier, callback: (error, data) => void) {
    getProduct((errorGetProduct, product) => {
        if (errorGetProduct) {
            callback(errorGetProduct, null)
        } else {
            let newModifiers = product.modifiers.filter(modifier => modifier.id != productModifier.id)

            let newModifiersValue = sumModifiersValue(newModifiers)
            product.modifiers = newModifiers
            product.totalValue = product.price + newModifiersValue

            saveProduct(product, (errorSaveProduct, data) => {
                errorSaveProduct ? callback(errorSaveProduct, null) : callback(null, data)
            })
        }
    })
}

//Helper method to calculate the modifiers total value
function sumModifiersValue(productModifiers) {
    let value = 0

    for (productModifier of productModifiers) {
        if (productModifier.priceType == PriceType.SUM_TOTAL) {
            for (option of productModifier.options) {
                value += option.originalPrice
            }
        } else if (productModifier.priceType == PriceType.AVERAGE) {
            for (option of productModifier.options) {
                value += option.originalPrice / productModifier.options.length
            }
        }
    }

    return value
}

//Helper method to format the modifiers text to show on app
function formatModifiersText(modifiers) {
    let modifiersText = ""

    modifiers.map(modifier => {
        modifier.options.map(option => {
            modifiersText += option.name + "\n"
        })
    })

    return modifiersText.trim()
}



