import { AsyncStorage } from "react-native"

/**
 *
 * @param key: String
 * @param data: String or JSON
 * @param callback: (error, data)
 */
export function setData(key, data, callback: (error, data) => void) {
    AsyncStorage.setItem(key, JSON.stringify(data), (error) => {
        return callback ? callback(error, data) : null
    })
}

/**
 *
 * @param key: String
 * @param data: String or JSON
 * @param callback: (error, data)
 */
export function setDataString(key, data, callback: (error, data) => void) {
    AsyncStorage.setItem(key, data, (error) => {
        return callback ? callback(error, data) : null
    })
}

/**
 *
 * @param key: String
 * @param callback: (error, result: JSON)
 */
export function getData(key, callback: (error, result) => void) {
    AsyncStorage.getItem(key, (error, result) => {
        return callback ? callback(error, result) : null
    })
}

/**
 *
 * @param keys: Array<String>
 * @param callback: (errors: Array<Error>, result: Array<Array<String>>)
 */
export function getMultipleData(keys, callback: (errors, result) => void) {
    AsyncStorage.multiGet(keys, (errors, listData) => {
        return callback(errors, listData)
    })
}

/**
 *
 * @param callback: (errorGetAllKeys, keys: Array<String>, errorMultiGet, listData:Array<Array<String>>)
 */
export function getAllLocalData(callback: (errorGetAllKeys, keys, errorMultiGet, listData) => void) {
    AsyncStorage.getAllKeys((errorGetAllKeys, keys) => {

        if(errorGetAllKeys || keys.length == 0) { return }

        AsyncStorage.multiGet(keys, (errorMultiGet, listData) => {
            return callback(errorGetAllKeys, keys, errorMultiGet, listData)
        })
    })
}

/**
 *
 * @param key: String
 * @param callback: (error)
 */
export function removeData(key, callback: (error) => void) {
    AsyncStorage.removeItem(key, (error) => {
        return callback ? callback(error) : null
    })
}

/**
 *
 * @param callback: (error)
 */
export function eraseAllData(callback: (error) => void) {
    AsyncStorage.clear((error) => {
        return callback ? callback(error) : null
    })
}