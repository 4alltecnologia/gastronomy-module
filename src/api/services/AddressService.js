import React from "react"
import { getAddresses, getAddressByLatLong, getAddressByQueryAndLatLong, getAddressByZipCode, getAddressByPlaceId, getLatLongByAddress } from "../APIRequests"
import Address from "../../models/Address"
import AddressList from "../../models/AddressList"
import { AddressType, getCurrentLocation, isDeviceConnected } from "../../utils"
import { ADDRESS_DETAILS_CONTAINER_STRINGS } from "../../languages"
import * as Errors from "../../errors"

export default class AddressService {

    static getCurrentLocationAddress() {
        return new Promise((resolve, reject) => {
            getCurrentLocation().then(position => {
                this.getUserAddressLatLong(position.coords.latitude, position.coords.longitude).then(address => {
                    return resolve(address)
                }).catch(error => {
                    return reject(error)
                })
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getUserAddressLatLong(latitude, longitude) {
        return new Promise((resolve, reject) => {
            getAddressByLatLong(latitude, longitude).then(data => {
                let newAddress = []
                newAddress.latitude = latitude
                newAddress.longitude = longitude

                let addressFound = data.results.filter(result => result.address_components.filter(component => (component.types.indexOf("postal_code") >= 0 && component.long_name.split("-").join("").length === 8)).length > 0)

                if (addressFound.length > 0){
                    for (component of addressFound[0].address_components) {
                        if (component.types.indexOf("route") >= 0) {
                            newAddress.street = component.long_name
                        } else if (component.types.indexOf("sublocality") >= 0) {
                            newAddress.neighborhood = component.short_name
                        } else if (component.types.indexOf("administrative_area_level_2") >= 0) {
                            newAddress.city = component.short_name
                        } else if (component.types.indexOf("administrative_area_level_1") >= 0) {
                            newAddress.province = component.short_name
                        } else if (component.types.indexOf("postal_code") >= 0) {
                            newAddress.zip = component.long_name.split("-").join("")
                        } else if (component.types.indexOf("country") >= 0) {
                            newAddress.country = component.long_name.split("-").join("")
                        }
                    }
                }
                return resolve(new Address(newAddress))
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getUserAddressQuery(query, latitude = null, longitude = null) {
        return new Promise((resolve, reject) => {
            getAddressByQueryAndLatLong(query, latitude, longitude).then(data => {

                let addresses = []

                data.predictions.forEach((address) => {
                    let newAddress = []

                    let secondaryTextArray = address.structured_formatting.secondary_text.split(",")

                    let streetName = address.structured_formatting.main_text
                    if (streetName.indexOf(",") >= 0){
                        newAddress.street = streetName.split(",")[0].trim()
                        newAddress.number = streetName.split(",")[1].trim()
                    } else {
                        newAddress.street = streetName
                    }
                    newAddress.latitude = latitude
                    newAddress.longitude = longitude
                    newAddress.id = address.id
                    newAddress.neighborhood = secondaryTextArray.length == 2 ? null : secondaryTextArray[0]
                    newAddress.city = secondaryTextArray.length == 2 ? secondaryTextArray[0].split(" - ")[0] : secondaryTextArray[1].split(" - ")[0]
                    newAddress.province = secondaryTextArray.length == 2 ? secondaryTextArray[0].split(" - ")[1] : secondaryTextArray[1].split(" - ")[1]
                    newAddress.country = secondaryTextArray[secondaryTextArray.length-1]
                    newAddress.placeId = address.place_id

                    addresses.push(new Address(newAddress))
                })

                return resolve(addresses)
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getUserAddressZipCode(zipCode) {
        return new Promise((resolve, reject) => {
            getAddressByZipCode(zipCode.split("-").join("")).then(data => {
                let newAddress = []

                newAddress.street = data.address
                newAddress.zip =  data.cep
                newAddress.neighborhood = data.neighborhood
                newAddress.city = data.city
                newAddress.province = data.uf
                newAddress.country = ADDRESS_DETAILS_CONTAINER_STRINGS.defaultCountry

                return resolve(new Address(newAddress))
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getAddressPlaceId(address) {
        return new Promise((resolve, reject) => {
            getAddressByPlaceId(address.placeId).then(data => {
                data.result.address_components.forEach((component) => {
                    if (component.types.indexOf("route") >= 0 && address.street == ""){
                        address.street = component.long_name
                    } else if (component.types.indexOf("sublocality") >= 0 && address.neighborhood == ""){
                        address.neighborhood = component.short_name
                    } else if (component.types.indexOf("postal_code") >= 0 && address.zip == "") {
                        address.zip = component.long_name
                    }
                })
                address.latitude = data.result.geometry.location.lat
                address.longitude = data.result.geometry.location.lng

                if (address.zip == null || address.zip.length < 8){
                    this.getUserAddressLatLong(data.result.geometry.location.lat, data.result.geometry.location.lng).then(newAddress => {
                        address.zip = newAddress.zip
                        return resolve(address)
                    }).catch(errorAddress => {
                        return reject(errorAddress)
                    })
                } else {
                    return resolve(address)
                }
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getDefaultAddress(sessionToken) {
        return new Promise((resolve, reject) => {
            getAddresses(sessionToken).then(data => {
                let defaultAddressList = data.addresses.filter(address => !!address.isDefault)
                let defaultAddress = null

                if (defaultAddressList.length === 0){
                    defaultAddress = data.addresses.length > 0 ? data.addresses[0] : null
                } else {
                    defaultAddress = defaultAddressList[0]
                }

                if (defaultAddress == null){
                    return reject(null)
                } else {
                    this.getAddressLatLong(new Address(defaultAddress)).then(address => {
                        return resolve(address)
                    }).catch(error => {
                        return reject(error)
                    })
                }
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getAddressLatLong(address) {
        return new Promise((resolve, reject) => {
            getLatLongByAddress(address._parseFullAddress(AddressType.QUERY)).then(data => {
                if (data.candidates.length > 0){
                    let updatedAddress = new Address(address)
                    updatedAddress.latitude = data.candidates[0].geometry.location.lat
                    updatedAddress.longitude = data.candidates[0].geometry.location.lng

                    if (!!updatedAddress.zip){
                        return resolve(updatedAddress)
                    } else {
                        this.getAddressPlaceId(updatedAddress).then(newAddress => {
                            return resolve(newAddress)
                        }).catch(error => {
                            return reject(error)
                        })
                    }
                }
            }).catch(error => {
                return reject(error)
            })
        })
    }

    static getUserAddresses(sessionToken) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (isConnected) {
                    getAddresses(sessionToken).then(data => {
                        let homeAddress = null
                        let workAddress = null

                        let addressList = data.addresses.reduce((result, address) => {
                            if (address.name === ADDRESS_DETAILS_CONTAINER_STRINGS.home && !homeAddress) {
                                homeAddress = new Address(address)
                            } else if (address.name === ADDRESS_DETAILS_CONTAINER_STRINGS.work && !workAddress) {
                                workAddress = new Address(address)
                            } else {
                                result.push(new Address(address))
                            }
                            return result
                        }, [])

                        return resolve(new AddressList(homeAddress, workAddress, addressList))
                    }).catch(error => {
                        return reject([])
                    })
                } else {
                    return reject(new Errors.ConnectionException())
                }
            })
        })
    }
}