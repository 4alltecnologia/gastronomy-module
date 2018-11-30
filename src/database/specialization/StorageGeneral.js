import * as Database from "../StorageBase"
import { getUserAgent } from "../../utils"

export function saveApiHeaders(headers) {
    Database.setData("api_headers", headers)
}

export function getApiHeaders(callback: (error, headers) => void) {
    Database.getData("api_headers", (error, headers) => {
        return callback(error, JSON.parse(headers))
    })
}

export function saveHeaders(lat, long) {
    getApiHeaders((error, headers) => {
        getUserAgent(headers, lat, long, (newHeaders) => {
            Database.setData("headers_mktp", newHeaders)
        })
    })
}

export function getHeadersMktp(callback: (error, headers) => void) {
    Database.getData("headers_mktp", (error, headers) => {
        return callback(error, JSON.parse(headers))
    })
}

export function saveEnvironment(env) {
    Database.setDataString("environment", env)
}

export function getEnvironment(callback: (error, environment) => void) {
    Database.getData("environment", (error, environment) => {
        return callback(error, environment)
    })
}

export function saveGoogleApiKey(key) {
    Database.setDataString("google_api_key", key)
}

export function getGoogleApiKey(callback: (error, key) => void) {
    Database.getData("google_api_key", (error, key) => {
        return callback(error, key)
    })
}

/**
 * @param orderType: Array
 */
export function saveOrderType(orderType, callback: (error, orderTypeStorage) => void) {
    Database.setData("orderType", orderType, (error, data) => {
        callback(error, data)
    })
}

/**
 * @param callback: (error, orderType: Array)
 */
export function getOrderType(callback: (error, orderTypeStorage) => void) {
    Database.getData("orderType", (error, orderTypeStorage) => {
        return callback(error, JSON.parse(orderTypeStorage))
    })
}