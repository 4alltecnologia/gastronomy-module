import { isDeviceConnected, IdOrderType } from "../../utils"
import { getUnitiesNearby, getUnityDetails, getUnityCatalog } from "../ApiRequests"
import { getOrderType } from "../../database/specialization/StorageGeneral"
import * as Errors from "../../errors"
import ShortUnity from "../../models/ShortUnity"
import Unity from "../../models/Unity"
import Catalog from "../../models/Catalog"

export default class UnityService {
    /**
     * @param position: Position object containing user latitude and longitude
     * @returns {Promise<any>}
     * resolve: Object containing one array with open Unities and one array contaning the closed UNities based on the order type(service)
     * reject: One of (CustomException, ConnectionException or NoUnitiesException)
     */
    static getUnitiesNearby(position) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }
                getUnitiesNearby(position.coords.latitude, position.coords.longitude).then(data => {
                    let unityList = data.map(unity => {
                        return new ShortUnity(unity)
                    })

                    if (unityList.length <= 0) {
                        return reject(new Errors.NoUnitiesException())
                    }

                    getOrderType((error, orderTypeList) => {
                        if (error) {
                            return reject(new Errors.CustomException())
                        }

                        isOrderTypeOutdoor = orderTypeList.filter(element => element === IdOrderType.DELIVERY.id).length > 0

                        let openUnities = unityList.filter(unity => isOrderTypeOutdoor ? !!unity.outdoorOpened : !!unity.indoorOpened)
                        let closedUnities = unityList.filter(unity => isOrderTypeOutdoor ? !unity.outdoorOpened : !unity.indoorOpened)

                        return resolve({openUnities, closedUnities})
                    })
                }).catch(error => {
                    return reject(!!error && !!error.data && !!error.data.message ? new Errors.CustomException(null, error.data.message) : new Errors.CustomException())
                })
            })
        })
    }

    static getUnityDetails(unityId) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }
                getUnityDetails(unityId).then(data => {
                    return resolve(new Unity(data))
                }).catch(error => {
                    return reject(!!error && !!error.data && !!error.data.message ? new Errors.CustomException(null, error.data.message) : new Errors.CustomException())
                })
            })
        })
    }

    static getUnityCatalog(unityId) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }
                getUnityCatalog(unityId).then(data => {
                    return resolve(new Catalog(data[0]))
                }).catch(error => {
                    return reject(!!error && !!error.data && !!error.data.message ? new Errors.CustomException(null, error.data.message) : new Errors.CustomException())
                })
            })
        })
    }

}