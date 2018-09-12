import React from "react"
import { getAddressByLatLong } from "../../api/ApiRequests"

export default class AddressService {

    static getUserAddress(latitude, longitude) {
        return new Promise((resolve, reject) => {
            getAddressByLatLong(latitude, longitude).then(data => {
                var street = null
                var neighborhood = null
                var city = null

                data.results.forEach((address) => {
                    address.address_components.forEach((address) => {
                        if (address.types.indexOf("route") >= 0 && street === null){
                            street = address.long_name
                        } else if (address.types.indexOf("sublocality") >= 0 && neighborhood === null){
                            neighborhood = address.short_name
                        } else if (address.types.indexOf("administrative_area_level_2") >= 0 && city === null){
                            city = address.short_name
                        }
                    })

                    let fullAddress = street + (!!neighborhood ? " - " : "") + neighborhood + (!!city ? " - " : "") + city

                    resolve(fullAddress)
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

}