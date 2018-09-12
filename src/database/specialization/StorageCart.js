import * as Database from "../StorageBase"
import { getOrderType } from "./StorageGeneral"
import { PriceType } from "../../utils"
import * as Errors from "../../errors"

export function getCart(callback:(error, data) => void) {
    Database.getData("cart", (error, cart) => {
        if (!!cart){
            return callback(error, JSON.parse(cart))
        } else {
            return callback(1, null)
        }
    })
}

export function canAddProduct(idUnity, idOrderType, callback:(error, success) => void) {
    Database.getData("cart", (error, cartSet) => {
        if (!!cartSet) {
            cart = JSON.parse(cartSet)

            if (!cart.unity) {
                return callback(null, true)
            } else {
                if (cart.idOrderType.some(idOrderTypeTest => idOrderType.indexOf(idOrderTypeTest) >= 0) && cart.unity.id == idUnity) {
                    return callback(null, true)
                } else if (cart.unity.id != idUnity) {
                    return callback(new Errors.AddProductDifferentUnityException(), false)
                } else {
                    return callback(new Errors.AddProductDifferentOrderTypeException(), false)
                }
            }
        } else {
            callback(null, true)
        }
    })
}

function getNextIdOnCart(cart) {
    let maior = 0
    for(prod of cart.products){
        if (prod.idOnCart > maior){
            maior = prod.idOnCart
        }
    }
    return maior + 1
}

export function addProduct(product, unity, idOrderType, callback:(error, data) => void) {
    product.idOnCart = 1
    Database.getData("cart", (error, cartSet) => {
        if (!!cartSet) {
            cart = JSON.parse(cartSet)

            if (!cart.products){
                cart.products = []
            } else {
                if (cart.products.length > 0) {
                    product.idOnCart = getNextIdOnCart(cart)
                }
            }

            if (!!cart.idOrderType) {
                if (cart.idOrderType.length < idOrderType.length) {
                    cart.idOrderType = idOrderType
                }
            } else {
                cart.idOrderType = idOrderType
            }

            cart.unity = unity
            cart.products.push(product)
            var cartUpdated = updateCartValues(cart)

            Database.setData("cart", cartUpdated, (error, data) => {
                return callback(null, data)
            })
        } else {
            let cart = {
                products: [product],
                total: 0
            }

            if (!!unity) {
                cart.unity = unity
            }

            if (!!idOrderType) {
                cart.idOrderType = idOrderType
            }

            var cartUpdated = updateCartValues(cart)

            Database.setData("cart", cartUpdated, (error, data) => {
                return callback(null, data)
            })
        }
    })
}

export function addMultipleProducts(listProducts, unity, idOrderType, callback:(error, data) => void) {
    Database.getData("cart", (error, cartSet) => {
        if (!!cartSet) {
            cart = JSON.parse(cartSet)

            if (!cart.products){
                cart.products = []
            } else {
                listProducts.map(product => {
                    product.idOnCart = getNextIdOnCart(cart)
                    cart.products.push(product)
                })
            }

            cart.unity = unity

            var cartUpdated = updateCartValues(cart)

            Database.setData("cart", cartUpdated, (error, data) => {
                return callback(null, data)
            })
        } else {
            let cart = {
                products:[],
                total:0
            }

            listProducts.map(product => {
                product.idOnCart = getNextIdOnCart(cart)
                cart.products.push(product)
            })

            if (!!unity){
                cart.unity = unity
            }

            if (!!idOrderType) {
                cart.idOrderType = idOrderType
            }

            var cartUpdated = updateCartValues(cart)

            Database.setData("cart", cartUpdated, (error, data) => {
                return callback(null, data)
            })
        }
    })
}

export function plusProduct(productID, idOnCart, callback:(error, data) => void) {
    Database.getData("cart", (error, cart) => {
        cart = JSON.parse(cart)

        cart.products.map(product => {
            if (product.id == productID && product.idOnCart == idOnCart) {
                product.quantity += 1
            }
        })

        var cartUpdated = updateCartValues(cart)

        Database.setData("cart", cartUpdated, (error, data) => {
            return callback(null, data)
        })
    })
}

export function removeProduct(productID, idOnCart, callback:(error, data) => void) {
    Database.getData("cart", (error, cart) => {
        cart = JSON.parse(cart)

        cart.products.map(product => {
            if (product.id == productID && product.idOnCart == idOnCart) {
                product.quantity -= 1
            }
        })

        var cartUpdated = updateCartValues(cart)

        if (cart.products.length > 0){
            Database.setData("cart", cartUpdated, (error, data) => {
                return callback(null, data)
            })
        } else {
            resetCart((error) => {
                callback(error, null)
            })
        }
    })
}

export function resetCart(callback:(error) => void) {
    Database.getData("cart", (error, cart) => {
        cart = JSON.parse(cart)

        let newCart = {
            total: 0,
            products: [],
            productTotal: 0,
            address: null,
            idOnCart: 0
        }

        Database.setData("cart", newCart, (error, data) => {
            return callback(null)
        })
    })
}

function updateCartValues(cart) {
    cart.total = 0
    cart.paymentStatus = 1
    cart.type = 1

    cart.products = cart.products.filter((product) => {
        return product.quantity > 0
    })

    cart.products.map(product => {
        product.total = product.quantity * product.price
        cart.total += product.total
    })

    cart.productTotal = cart.total

    if (cart.deliveryFee){
        cart.total += cart.deliveryFee
    }

    if (cart.discount){
        cart.total -= cart.discount
    }

    if (cart.products.length == 0){
        cart.total = 0
        cart.deliveryFee = 0
    }

    return cart
}

export function setField(fields, callback:(error, data) => void) {
    Database.getData("cart", (error, cart) => {
        cart = JSON.parse(cart)

        fields.map((field) => {
            cart[field.name] = field.value
        })
        var cartUpdated = updateCartValues(cart)

        Database.setData("cart", cartUpdated, (error, data) => {
            return callback(null, data)
        })
    })
}

export function cartToPay(callback:(error, cart) => void){
    getCart((error, cart) => {
        let cartToPay = {}

        cartToPay.idUnity = cart.unity.id
        cartToPay.productTotal = cart.productTotal
        // cartToPay.idOrderType = 2
        cartToPay.status = 20
        cartToPay.total = cart.total
        cartToPay.paymentStatus = 1
        cartToPay.type = 1
        cartToPay.discount = 0
        cartToPay.orderItems = []

        if (!!cart.deliveryFee) {
            cartToPay.deliveryFee = cart.deliveryFee
        }

        if (!!cart.address) {
            cartToPay.orderAddress = {
                street: cart.address.street,
                neighborhood: cart.address.neighborhood,
                number: cart.address.number,
                complement: cart.address.complement,
                reference: "",
                cep: cart.address.zip,
                uf: cart.address.province,
                city: cart.address.city
            }
        }

        for (product of cart.products) {
            let newProd = {}
            newProd.title = product.name
            newProd.idUnityItem = product.id
            newProd.quantity = product.quantity
            newProd.observation = product.observation
            newProd.total = product.total
            newProd.itemPrice = product.price
            newProd.subItems = parseSubItems(product.subItems)
            newProd.discount = 0

            cartToPay.orderItems.push(newProd)
        }

        callback(error, cartToPay)
    })
}

export function parseSubItems(subItems) {
    var listSubItems = []

    if (subItems) {
        subItems.map(subItem => {
            subItem.options.map(option => {
                let optionToAdd = {}

                const listDuplicated = subItem.options.filter(test => (test.id == option.id))

                optionToAdd.idUnityItem = option.id
                optionToAdd.quantity = subItem.priceType == PriceType.SUM_TOTAL ? listDuplicated.length : ((1 / subItem.options.length) * listDuplicated.length)
                optionToAdd.total = option.originalPrice * optionToAdd.quantity
                optionToAdd.itemPrice = option.originalPrice
                optionToAdd.discount = 0

                listSubItems.push(optionToAdd)
            })
        })
    }
    let listSubItemsToSend = listSubItems.filter((option, index, self) =>
                                                    self.findIndex(t =>
                                                        t.idUnityItem === option.idUnityItem) === index)

    return listSubItemsToSend
}