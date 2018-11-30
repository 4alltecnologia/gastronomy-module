import * as Database from "../StorageBase"

//OrderID methods
export function saverOrderId(orderId, callback:(error, data) => void) {
    Database.setData("orderId", orderId, (error, data) => {
        error ? callback(error, null) : callback(null, data)
    })
}

export function getOrderId(callback:(error, data) => void) {
    Database.getData("orderId", (error, orderId) => {
        error ? callback(error, null) : callback(null, JSON.parse(orderId))
    })
}

export function removeOrderId(callback: (error) => void) {
    Database.removeData("orderId", (error) => {
        error ? callback(error) : callback(null)
    })
}

//Order methods
export function saverOrder(order, callback:(error, data) => void) {
    Database.setData("order", order, (error, data) => {
        error ? callback(error, null) : callback(null, data)
    })
}

export function getOrder(callback: (error, data) => void) {
    Database.getData("order", (error, order) => {
        error ? callback(error, null) : callback(null, JSON.parse(order))
    })
}

export function removeOrder(callback: (error) => void) {
    Database.removeData("order", (error) => {
        error ? callback(error) : callback(null)
    })
}
