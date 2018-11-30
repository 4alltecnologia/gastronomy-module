import * as Database from "../StorageBase"

export function updateModifiersSelected(modifiers, callback:(error, data) => void) {
    Database.setData("modifiersSelected", modifiers,(error, data) => {
        callback(error, data)
    })
}

export function getModifiersSelected(callback: (error, modifiers) => void) {
    Database.getData("modifiersSelected", (error, modifiers) => {
        callback(error, JSON.parse(modifiers))
    })
}

export function resetModifiersSelected(callback: (error) => void) {
    Database.removeData("modifiersSelected", (error) => {
        callback(error)
    })
}