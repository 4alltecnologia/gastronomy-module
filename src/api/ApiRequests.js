import { makeRequest } from "./base/Libs"
import { API_DATA_GOOGLE_APIS, RESPONSE_TYPE } from "./APIConfiguration"
import APIConfiguration from "./APIConfiguration"
import { getGoogleApiKey, getOrderType } from "../database/specialization/StorageGeneral"
import { PAYMENT_METHOD, DeliveryDistance, IdOrderType } from "../utils"

const URL_UNITIES = "/unities/"
const URL_CATALOG = "/menus?idUnity="
const URL_ACCOUNT_DATA = "/customer/getAccountData"
const URL_ACCOUNT_DELETE_ADDRESS = "/customer/deleteAddress"
const URL_ADDRESS_BY_ZIPCODE = "/address?cep="
const URL_LIST_CARDS = "/customer/listCards"
const URL_PLACE_ORDER = "/orders/"
const URL_DELIVERY_FEE = "/search/fees"
const URL_ACCOUNT_ADD_ADDRESS = "/customer/addAddress"
const URL_UNITIES_NEARBY = "/modular/unities?"
const URL_ORDER = "/orders/"
const URL_ORDERHISTORY = "/me/orders?sessionToken="
const URL_DISCOUNTS_CLUB_USER_SAVINGS = "/me/savings"
const URL_CHECKPAYMENT = "/payments"
const URL_OFFERSNEARBY = "/products?onSale=true"
const URL_DISCOUNTS_CLUB_HOME = "/discountClub/homes"
const URL_DISCOUNTS_CLUB_OFFERS_GROUP = "/discountClub/offersGroups/"
const URL_DISCOUNTS_CLUB_OFFER_DETAIL = "/discountClub/offers"
const URL_ACCOUNT_DEFAULT_ADDRESS = "/customer/setDefaultAddress"

export function getDiscountsClubHome(lat, lon) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            var parameterLatLon = "lat=" + lat + "&lon=" + lon + "&distance=" + DeliveryDistance

            const CONFIGS = {
                url: apiData.url + URL_DISCOUNTS_CLUB_HOME + "?" + parameterLatLon,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getDiscountsClubOffersGroup(id, lat, lon) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            var parameterLatLon = "lat=" + lat + "&lon=" + lon
            var parameterDistance = "&distance=" + DeliveryDistance

            const CONFIGS = {
                url: apiData.url + URL_DISCOUNTS_CLUB_OFFERS_GROUP + id + "?" + parameterLatLon + parameterDistance,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getOfferDetails(offer) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            var paramenterIdProduct = "idProduct=" + offer.idProduct
            var parameterIdMenu = "idMenu=" + offer.idMenu

            const CONFIGS = {
                url: apiData.url + URL_DISCOUNTS_CLUB_OFFER_DETAIL + "?" + paramenterIdProduct + "&" + parameterIdMenu,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getTradesmanDetails(idUnity) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            var parameterIdUnity = "idUnity=" + idUnity

            const CONFIGS = {
                url: apiData.url + URL_DISCOUNTS_CLUB_OFFER_DETAIL + "?" + parameterIdUnity,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getUserSavings(sessionToken) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            var parameterUserSessionToken = "sessionToken=" + sessionToken

            const CONFIGS = {
                url: apiData.url + URL_DISCOUNTS_CLUB_USER_SAVINGS + "?" + parameterUserSessionToken,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getUnitiesNearby(lat, lon, zipcode) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            getOrderType((errorOrderType, orderType) => {
                if (!!errorOrderType) {
                    return reject( errorOrderType)
                }

                var parameterLatLon = "lat=" + lat + "&lon=" + lon
                var parameterDistance = "&distance=" + DeliveryDistance
                var parameterOrderType = "&orderTypes=[" + orderType + "]"
                var parameterZipCode = "&cep=" + zipcode

                const CONFIGS = {
                    url: apiData.url + URL_UNITIES_NEARBY + parameterLatLon + parameterDistance + parameterOrderType + parameterZipCode,
                    method: "GET",
                    params: null,
                    cacheTime: 0,
                    headers: apiData.headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    return resolve(data)
                }).catch(error => {
                    return reject(error)
                })
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function checkDeliveryFee(cep, uf, city, neighborhood, idUnity) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_DELIVERY_FEE,
                method: "POST",
                params: {
                    cep,
                    uf,
                    city,
                    neighborhood,
                    idUnity
                },
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getUnityDetails(unityId) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            var parameterStyle = "?style=gastronomy"

            const CONFIGS = {
                url: apiData.url + URL_UNITIES + unityId + parameterStyle,
                method: "GET",
                params: null,
                cacheTime: 5,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getUnityCatalog(unityId) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            getOrderType((errorOrderType, orderType) => {
                if (!!errorOrderType) {
                    return reject(errorOrderType)
                }

                var parameterOrderType = "&orderTypes=[" + orderType + "]"

                const CONFIGS = {
                    url: apiData.url + URL_CATALOG + unityId + parameterOrderType,
                    method: "GET",
                    params: null,
                    cacheTime: 5,
                    headers: apiData.headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    return resolve(data)
                }).catch(error => {
                    return reject(error)
                })
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getAddresses(sessionToken) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataAccount().then(apiData => {
            let data = ["addresses"]

            const CONFIGS = {
                url: apiData.url + URL_ACCOUNT_DATA,
                method: "POST",
                params: {
                    sessionToken,
                    data
                },
                cacheTime: 5,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function addAddress(sessionToken, addressInfo) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataAccount().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ACCOUNT_ADD_ADDRESS,
                method: "POST",
                params: {
                    ...addressInfo,
                    sessionToken
                },
                cacheTime: 5,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function deleteAddress(sessionToken, addressId) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataAccount().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ACCOUNT_DELETE_ADDRESS,
                method: "POST",
                params: {
                    sessionToken,
                    addressId
                },
                cacheTime: 5,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function setDefaultAddress(sessionToken, addressId) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataAccount().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ACCOUNT_DEFAULT_ADDRESS,
                method: "POST",
                params: {
                    sessionToken,
                    addressId
                },
                cacheTime: 5,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getAddressByZipCode(zipCode) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ADDRESS_BY_ZIPCODE + zipCode,
                method: "GET",
                params: null,
                cacheTime: 5,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getAddressByQueryAndLatLong(query, lat, long) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error) {
                return reject(error)
            }

            let url = API_DATA_GOOGLE_APIS.urlBase + "place/autocomplete/json?language=pt-BR&types=address&components=country:br&input=" + query + "&key=" + googleApiKey
            if (!!lat && !!long) {
                url = url + "&location=" + lat + "," + long + "&radius=100000"
            }

            const CONFIGS = {
                url: url,
                method: "GET",
                params: null,
                cacheTime: 5,
                headers: API_DATA_GOOGLE_APIS.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        })
    })
}

export function getAddressByLatLong(lat, long) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error) {
                return reject(error)
            }
            let url = API_DATA_GOOGLE_APIS.urlBase + "geocode/json?key=" + googleApiKey + "&latlng=" + lat + "," + long

            const CONFIGS = {
                url: url,
                method: "GET",
                params: null,
                cacheTime: 5,
                headers: API_DATA_GOOGLE_APIS.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        })
    })
}

export function getLatLongByAddress(query) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error){
                return reject(error)
            }
            let url = API_DATA_GOOGLE_APIS.urlBase + "place/findplacefromtext/json?key=" + googleApiKey + "&inputtype=textquery&fields=geometry&input=" + query

            const CONFIGS = {
                url: url,
                method: "GET",
                params: null,
                cacheTime: 5,
                headers: API_DATA_GOOGLE_APIS.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        })
    })
}

export function getAddressByPlaceId(placeId) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error){
                return reject(error)
            }
            let url = API_DATA_GOOGLE_APIS.urlBase + "place/details/json?key=" + googleApiKey + "&place_id=" + placeId

            const CONFIGS = {
                url: url,
                method: "GET",
                params: null,
                cacheTime: 5,
                headers: API_DATA_GOOGLE_APIS.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        })
    })
}

export function getWalletBalance(sessionToken) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiWalletAccount(sessionToken).then(apiData => {
            const CONFIGS = {
                url: apiData.url + "balance",
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}


export function listCards(sessionToken) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataAccount().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_LIST_CARDS,
                method: "POST",
                params: {
                    sessionToken: sessionToken,
                    itemIndex: 0,
                    itemCount: 5
                },
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function makePayment(sessionToken, cardId = "", paymentMode = 0, paymentMethodId = 0, brandId = 0, change = 0, cart, idOrderType) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            let customerInfo = {
                sessionToken: sessionToken
            }

            if (paymentMode == PAYMENT_METHOD.CREDITCARD.id || paymentMode == PAYMENT_METHOD.WALLET.id) {
                customerInfo.paymentMode = paymentMode
                customerInfo.cardId = cardId
            } else {
                let paymentMethod = {}

                if (brandId == 0) {
                    paymentMethod.id = paymentMethodId

                    cart.paymentMethod = paymentMethod
                    cart.change = change
                } else {
                    paymentMethod.id = paymentMethodId
                    let brand = {
                        id: brandId
                    }

                    cart.paymentMethod = paymentMethod
                    cart.brand = brand
                }
            }

            cart.idOrderType = idOrderType
            cart.customerInfo = customerInfo

            const CONFIGS = {
                url: apiData.url + URL_PLACE_ORDER,
                method: "POST",
                params: cart,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getOrderDetails(idOrder, isExtended = true) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ORDER + idOrder + "?style=extended",
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getOrderHistory(sessionToken) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ORDERHISTORY + sessionToken + "&style=extended",
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function createCheckOrder(unityId, checkNumber) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ORDER,
                method: "POST",
                params: {
                    idUnity: unityId,
                    idOrderType: IdOrderType.INSTORE.id,
                    placeLabel: checkNumber
                },
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function addItemsCheck(orderId, tableNumber, orderItems, sessionToken) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            const CONFIGS = {
                url: apiData.url + URL_ORDER + orderId + "/orderItems",
                method: "POST",
                params: {
                    orderItems: orderItems,
                    tableNumber: tableNumber,
                    customerInfo: {
                        sessionToken: sessionToken
                    }
                },
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function checkPayment(orderId, sessionToken, cardId = "", paymentMode = 0) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            let customerInfo = {
                sessionToken: sessionToken,
                cardId: cardId,
                paymentMode: paymentMode
            }

            let params = {
                customerInfo: customerInfo
            }

            const CONFIGS = {
                url: apiData.url + URL_PLACE_ORDER + orderId + URL_CHECKPAYMENT,
                method: "POST",
                params: params,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}

export function getOffersNearby(latitude, longitude) {
    return new Promise((resolve, reject) => {
        APIConfiguration.getApiDataMktp().then(apiData => {
            let url = apiData.url + URL_OFFERSNEARBY
            url = url.concat(`&lat=${latitude}`)
            url = url.concat(`&lon=${longitude}`)
            url = url.concat(`&distance=${DeliveryDistance}`)

            const CONFIGS = {
                url: url,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: apiData.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                return resolve(data)
            }).catch(error => {
                return reject(error)
            })
        }).catch(error => {
            return reject(error)
        })
    })
}