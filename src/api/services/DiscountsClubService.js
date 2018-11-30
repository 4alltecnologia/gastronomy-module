// import { API, ERRORS, MODELS } from "mobile-experience-utils"
import { getDiscountsClubHome, getDiscountsClubOffersGroup, getOfferDetails, getTradesmanDetails, getUserSavings } from "../APIRequests"
import { isDeviceConnected } from "../../utils"
import * as Errors from "../../errors"
import SectionFixed from "../../models/discountsClub/SectionFixed"
// import SectionDynamic from "../../models/discountsClub/SectionDynamic"
import OffersGroup from "../../models/discountsClub/OffersGroup"
import Tradesman from "../../models/discountsClub/Tradesman"
import Product from "../../models/Product"

export default class DiscountsClubServiceService {

    static getHome(currentAddress) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }
                return getDiscountsClubHome(currentAddress.latitude, currentAddress.longitude).then(data => {
                    let fixedSection = new SectionFixed(data.fixed)
                    //TODO: HANDLE DYNAMIC SECTION
                    // let dynamicSection = new SectionDynamic(data.dynamic)

                    return resolve({ fixedSection })
                }).catch(error => {
                    return reject(error)
                })
            })
        })
    }

    //TODO: HANDLE POSSIBILY SUBCATEGORIES, VOUCHERS AND COUPONS
    static getOffersGroup(id, currentAddress) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }
                return getDiscountsClubOffersGroup(id, currentAddress.latitude, currentAddress.longitude).then(data => {
                    if (data.length <= 0) {
                        return reject(new Errors.NoOffersException())
                    }

                    let offersGroup = new OffersGroup(data)

                    return resolve(offersGroup)
                }).catch(error => {
                    return reject(error)
                })
            })
        })
    }

    static getOfferDetails(offer) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }

                return getOfferDetails(offer).then(data => {
                    data.orderType = offer.orderType
                    let product = new Product(data)

                    return resolve(product)
                }).catch(error => {
                    return reject(error)
                })
            })
        })
    }

    static getTradesmanDetails(idUnity) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }

                return getTradesmanDetails(idUnity).then(data => {
                    let tradesman = new Tradesman(data)

                    return resolve(tradesman)
                }).catch(error => {
                    return reject(error)
                })
            })
        })
    }

    static getUserSavings(sessionToken) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (!isConnected) {
                    return reject(new Errors.ConnectionException())
                }

                return getUserSavings(sessionToken).then(data => {
                    return resolve(data)
                }).catch(error => {
                    return reject(error)
                })
            })
        })
    }

}