import { GENERAL_STRINGS, LOCATION_SETTINGS_STRINGS, ERROR_STRINGS } from "./languages/index"

export function CustomException(title = GENERAL_STRINGS.alertErrorTitle, message = GENERAL_STRINGS.alertErrorMessage) {
    this.title = title
    this.message = message
}

export function ConnectionException() {
    this.title = GENERAL_STRINGS.alertErrorTitle
    this.message = ERROR_STRINGS.CONNECTION_EXCEPTION.noConnection
}

export function LocationException() {
    this.title = LOCATION_SETTINGS_STRINGS.attention
    this.message = LOCATION_SETTINGS_STRINGS.locationNotFound
}

export function LocationSettingsException() {
    this.title = LOCATION_SETTINGS_STRINGS.attention
    this.message = LOCATION_SETTINGS_STRINGS.needActivateGps
}

export function NoOffersException() { }

export function NoUnitiesException() { }

export function AddProductDifferentOrderTypeException() {
    this.title = GENERAL_STRINGS.alertErrorTitle
    this.message = ERROR_STRINGS.ADD_PRODUCT_EXCEPTION.differentOrderType
}

export function AddProductDifferentUnityException() {
    this.title = GENERAL_STRINGS.alertErrorTitle
    this.message = ERROR_STRINGS.ADD_PRODUCT_EXCEPTION.differentUnity
}