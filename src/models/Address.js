import { AddressType } from "../utils"
import { ADDRESS_DETAILS_CONTAINER_STRINGS } from "../languages"

export default class Address {

    constructor(addressDictionary) {
        this.city = addressDictionary.city
        this.complement = addressDictionary.complement
        this.country = !!addressDictionary.country ? addressDictionary.country : ADDRESS_DETAILS_CONTAINER_STRINGS.defaultCountry
        this.id = addressDictionary.id
        this.isDefault = addressDictionary.isDefault
        this.latitude = addressDictionary.latitude
        this.longitude = addressDictionary.longitude
        this.name = addressDictionary.name
        this.neighborhood = addressDictionary.neighborhood
        this.number = addressDictionary.number
        this.placeId = addressDictionary.placeId
        this.province = addressDictionary.province
        this.reference = addressDictionary.reference
        this.street = addressDictionary.street
        this.zip = addressDictionary.zip
    }

    _parseFullAddress(addressType) {
        switch (addressType){
            case AddressType.STREET_NEIGHBORHOOD_CITY:
                return (!!this.street ? this.street + " - " : "") + (!!this.neighborhood ? this.neighborhood + " - " : "") + (!!this.city ? this.city : "")
                break
            case AddressType.STREET_NUMBER:
                return this.street + (!!this.number ? ", " + this.number : "")
                break
            case AddressType.NEIGHBORHOOD_CITY_PROVINCE:
                return (!!this.neighborhood ? this.neighborhood + " - " : "") + this.city + " - " + this.province
                break
            case AddressType.NUMBER_COMPLEMENT:
                return "nº " + this.number + (!!this.complement ? ", " + this.complement : "")
                break
            case AddressType.QUERY:
                return (!!this.street ? this.street + " " : "") + (!!this.number ? this.number + " " : "") + (!!this.neighborhood ? this.neighborhood + " " : "") + (!!this.city ? this.city + " " : "") + (!!this.province ? this.province + " " : "")
                break
            case AddressType.QUERY_NO_NEIGHBORHOOD:
                return (!!this.street ? this.street + " " : "") + (!!this.number ? this.number + " " : "") + (!!this.city ? this.city + " " : "") + (!!this.province ? this.province + " " : "")
                break
        }
    }

    _parseObjectRequest() {
        var object = {
            name: this.name,
            number: this.number,
            complement: this.complement,
            street: this.street,
            neighborhood: this.neighborhood,
            reference: this.reference,
            city: this.city,
            zip: this.zip.split("-").join(""),
            province: this.province,
            country: this.country
        }
        return object
    }
}