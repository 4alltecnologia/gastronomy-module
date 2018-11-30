import * as Database from "../StorageBase"

/**
 *
 * @param callback: (error, idUnity: Int)
 */
export function getIdUnity(callback: (error, idUnity) => void) {
    Database.getData("idUnity", (error, idUnity) => {
        return callback(error, idUnity)
    })
}

/**
 *
 * @param idUnity: Int
 */
export function setIdUnity(idUnity, callback: (error, idUnity) => void) {
    Database.setData("idUnity", parseInt(idUnity), (error, idUnityStorage) => {
        error ? callback(error, null) : callback(null, idUnityStorage)
    })
}

/**
 *
 * @param callback: (error, idUnity: Int)
 */
export function getCatalogByUnity(callback: (error, idUnity) => void) {
    Database.getData("idUnity", (error, idUnity) => {
        return callback(error, idUnity)
    })
}

export function saveUnity(data) {
    Database.removeData("unity")
    Database.setData("unity", data)
}

export function getUnity(callback: (error, unity) => void) {
    Database.getData("unity", (error, unity) => {
        return callback(error, JSON.parse(unity))
    })
}