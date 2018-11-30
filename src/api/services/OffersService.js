import React from "react"
import { getOffersNearby } from "../APIRequests"
import { BASE_URL_IMAGE } from "../APIConfiguration"
import { isDeviceConnected, IdOrderType } from "../../utils"
import * as Errors from "../../errors"
import OfferItem from "../../components/offers/model/OfferItem"
import CarouselItem from "../../components/carousel/model/CarouselItem"

export default class OffersService {
    /**
     * @returns {Promise<any>}
     * resolve: Object containing Banner list, delivery list and takeaway list
     * reject: Error
     */
    static getOffersNearby(currentAddress) {
        return new Promise((resolve, reject) => {
            isDeviceConnected(isConnected => {
                if (isConnected) {
                    this.parseOffers(currentAddress).then(data => {
                        return resolve(data)
                    }).catch(error => {
                        return reject(error)
                    })
                } else {
                    return reject(new Errors.ConnectionException())
                }
            })
        })
    }

    static parseOffers(address) {
        return new Promise((resolve, reject) => {
            getOffersNearby(address.latitude, address.longitude).then(data => {
                let bannerList = []
                let deliveryOffersList = []
                let takeawayOffersList = []

                data.delivery.forEach(unity => {
                    unity.productsOnSale.forEach(product => {
                        product.orderType = IdOrderType.DELIVERY
                        product.image = BASE_URL_IMAGE.concat(product.image)

                        if (product.featured && !!unity.outdoorOpened) {
                            bannerList.push(new CarouselItem(new OfferItem(unity, product, unity.outdoorOpened)))
                        } else {
                            deliveryOffersList.push(new OfferItem(unity, product, unity.outdoorOpened))
                        }
                    })
                })

                data.takeaway.forEach(unity => {
                    unity.productsOnSale.forEach(product => {
                        product.orderType = IdOrderType.TAKEAWAY
                        product.image = BASE_URL_IMAGE.concat(product.image)

                        if (product.featured && !!unity.indoorOpened) {
                            bannerList.push(new CarouselItem(new OfferItem(unity, product, unity.indoorOpened)))
                        } else {
                            takeawayOffersList.push(new OfferItem(unity, product, unity.indoorOpened))
                        }
                    })
                })

                if (bannerList.length <= 0 && deliveryOffersList.length <= 0 && takeawayOffersList.length <= 0) {
                    return reject(new Errors.NoOffersException())
                }

                let newData = {
                    bannerList: bannerList,
                    deliveryOffersList: deliveryOffersList.sort((offerA, offerB) => {
                        return offerB.open - offerA.open
                    }),
                    takeawayOffersList: takeawayOffersList.sort((offerA, offerB) => {
                        return offerB.open - offerA.open
                    })
                }

                return resolve(newData)
            }).catch(error => {
                return reject(!!error && !!error.data && !!error.data.message ? new Errors.CustomException(null, error.data.message) : new Errors.CustomException())
            })
        })
    }
}