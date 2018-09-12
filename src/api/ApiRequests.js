import { makeRequest } from "./base/Libs"
import { API_DATA_MKTP, API_DATA_ACCOUNT, API_DATA_GOOGLE_APIS, API_WALLET_ACCOUNT, RESPONSE_TYPE } from "../configs"
import { paymentMethod, DeliveryDistance, IdOrderType } from "../utils"
import { ExternalMethods } from "../native/Functions"
import { getHeadersMktp, getEnvironment, getGoogleApiKey, getOrderType } from "../database/specialization/StorageGeneral"

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
const URL_CHECKPAYMENT = "/payments"
const URL_OFFERSNEARBY = "/products?onSale=true"

export function getUnitiesNearby(lat, lon) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }
                getOrderType((error, orderType) => {
                    if (error) {
                        reject(error)
                    }

                    var parameterLatLon = "lat=" + lat + "&lon=" + lon
                    var parameterDistance = "&distance=" + DeliveryDistance
                    var parameterOrderType = "&orderTypes=[" + orderType + "]"

                    const CONFIGS = {
                        url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_UNITIES_NEARBY + parameterLatLon + parameterDistance + parameterOrderType,
                        method: "GET",
                        params: null,
                        cacheTime: 0,
                        headers: headers,
                        timeout: 30000,
                        responseType: RESPONSE_TYPE
                    }

                    makeRequest(CONFIGS, false).then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                })
            })
        })
    })
}

export function checkDeliveryFee(cep, uf, city, neighborhood, idUnity) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }
                const CONFIGS = {
                    url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_DELIVERY_FEE,
                    method: "POST",
                    params: {
                        cep,
                        uf,
                        city,
                        neighborhood,
                        idUnity
                    },
                    cacheTime: 0,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}

export function getUnityDetails(unityId) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }

                var parameterStyle = "?style=gastronomy"

                const CONFIGS = {
                    url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_UNITIES + unityId + parameterStyle,
                    method: "GET",
                    params: null,
                    cacheTime: 5,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}

export function getUnityCatalog(unityId) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }
                getOrderType((error, orderType) => {
                    if (error) {
                        reject(error)
                    }

                    var parameterOrderType = "&orderTypes=[" + orderType + "]"

                    const CONFIGS = {
                        url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_CATALOG + unityId + parameterOrderType,
                        method: "GET",
                        params: null,
                        cacheTime: 5,
                        headers: headers,
                        timeout: 30000,
                        responseType: RESPONSE_TYPE
                    }

                    makeRequest(CONFIGS, false).then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                })
            })
        })
    })
}

export function getAddresses(sessionToken) {
    return new Promise((resolve, reject) => {
        getEnvironment((error, environment) => {
            if (error){
                reject(error)
            }
            const data = ["addresses"]
            const CONFIGS = {
                url: (environment == "prod" ? API_DATA_ACCOUNT.urlBaseProd : API_DATA_ACCOUNT.urlBaseHomolog) + URL_ACCOUNT_DATA,
                method: "POST",
                params: {
                    sessionToken,
                    data
                },
                cacheTime: 5,
                headers: API_DATA_ACCOUNT.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function deleteAddress(sessionToken, addressId) {
    return new Promise((resolve, reject) => {
        getEnvironment((error, environment) => {
            if (error){
                reject(error)
            }
            const CONFIGS = {
                url:(environment == "prod" ? API_DATA_ACCOUNT.urlBaseProd : API_DATA_ACCOUNT.urlBaseHomolog) + URL_ACCOUNT_DELETE_ADDRESS,
                method: "POST",
                params: {
                    sessionToken,
                    addressId
                },
                cacheTime: 5,
                headers: API_DATA_ACCOUNT.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function getAddressByZipCode(zipCode) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }
                const CONFIGS = {
                    url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_ADDRESS_BY_ZIPCODE + zipCode,
                    method: "GET",
                    params: null,
                    cacheTime: 5,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}

export function getAddressByQueryAndLatLong(query, lat, long) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error){
                reject(error)
            }
            let url = API_DATA_GOOGLE_APIS.urlBase + "place/autocomplete/json?language=pt-BR&types=address&components=country:br&input=" + query + "&key=" + googleApiKey
            if (lat != null && lat != "") {
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
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function getAddressByLatLong(lat, long) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error){
                reject(error)
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
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function getAddressByPlaceId(placeId) {
    return new Promise((resolve, reject) => {
        getGoogleApiKey((error, googleApiKey) => {
            if (error){
                reject(error)
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
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function addAddress(sessionToken, addressInfo) {
    return new Promise((resolve, reject) => {
        getEnvironment((error, environment) => {
            if (error){
                reject(error)
            }
            const CONFIGS = {
                url: (environment == "prod" ? API_DATA_ACCOUNT.urlBaseProd : API_DATA_ACCOUNT.urlBaseHomolog) + URL_ACCOUNT_ADD_ADDRESS,
                method: "POST",
                params: {
                    ...addressInfo,
                    sessionToken
                },
                cacheTime: 5,
                headers: API_DATA_ACCOUNT.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }
            makeRequest(CONFIGS, false).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function getWalletBalance(sessionToken) {
    return new Promise((resolve, reject) => {
        getEnvironment((error, environment) => {
            if (error){
                reject(error)
            }
            let walletAccount = API_WALLET_ACCOUNT(sessionToken)

            let url = (environment == "prod" ? walletAccount.urlBaseProd : walletAccount.urlBaseHomolog) + "balance"

            const CONFIGS = {
                url: url,
                method: "GET",
                params: null,
                cacheTime: 0,
                headers: walletAccount.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}


export function listCards(sessionToken) {
    return new Promise((resolve, reject) => {
        getEnvironment((error, environment) => {
            if (error){
                reject(error)
            }
            let url = (environment == "prod" ? API_DATA_ACCOUNT.urlBaseProd : API_DATA_ACCOUNT.urlBaseHomolog) + URL_LIST_CARDS

            const CONFIGS = {
                url: url,
                method: "POST",
                params: {
                    sessionToken: sessionToken,
                    itemIndex: 0,
                    itemCount: 5
                },
                cacheTime: 0,
                headers: API_DATA_ACCOUNT.headers,
                timeout: 30000,
                responseType: RESPONSE_TYPE
            }

            makeRequest(CONFIGS, false).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    })
}

export function makePayment(sessionToken, cardId = "", paymentMode = 0, paymentMethodId = 0, brandId = 0, change = 0, cart, idOrderType) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }
                let url = (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_PLACE_ORDER

                let customerInfo = {
                    sessionToken: sessionToken
                }

                if (paymentMode == paymentMethod.CREDITCARD.id || paymentMode == paymentMethod.WALLET.id) {
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
                    url: url,
                    method: "POST",
                    params: cart,
                    cacheTime: 0,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}

export function getOrderDetails(idOrder, isExtended = true) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error){
                    reject(error)
                }
                const CONFIGS = {
                    url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_ORDER + idOrder + "?style=extended", //(isExtended ? "?style=extended" : ""),
                    method: "GET",
                    params: null,
                    cacheTime: 0,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}

export function getOrderHistory() {
    return new Promise((resolve, reject) => {
        getHeadersMktp((errorHeadersMktp, headers) => {
            if (!!errorHeadersMktp){
                reject(errorHeadersMktp)
            }
            getEnvironment((errorEnvironment, environment) => {
                if (!!errorEnvironment){
                    reject(errorEnvironment)
                }
                ExternalMethods.getUserLogged((errorUser, resultUser) => {
                    if (!!errorUser) {
                        reject(errorUser)
                    } else {
                        const CONFIGS = {
                            url: (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_ORDERHISTORY + resultUser.sessionToken + "&style=extended",
                            method: "GET",
                            params: null,
                            cacheTime: 0,
                            headers: headers,
                            timeout: 30000,
                            responseType: RESPONSE_TYPE
                        }

                        makeRequest(CONFIGS, false).then(data => {
                            resolve(data)
                        }).catch(error => {
                            reject(error)
                        })
                    }
                })

            })
        })
    })
}

export function createCheckOrder(unityId, checkNumber) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((errorHeadersMktp, headers) => {
            if (!!errorHeadersMktp) {
                reject(errorHeadersMktp)
            } else {
                getEnvironment((errorEnvironment, environment) => {
                    if (errorEnvironment){
                        reject(errorEnvironment)
                    }
                    let url = (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_ORDER

                    const CONFIGS = {
                        url: url,
                        method: "POST",
                        params: {
                            idUnity: unityId,
                            idOrderType: IdOrderType.INSTORE.id,
                            placeLabel: checkNumber
                        },
                        cacheTime: 0,
                        headers: headers,
                        timeout: 30000,
                        responseType: RESPONSE_TYPE
                    }

                    makeRequest(CONFIGS, false).then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        })
    })
}

export function addItemsCheck(orderId, tableNumber, orderItems, sessionToken) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((errorHeadersMktp, headers) => {
            if (!!errorHeadersMktp) {
                reject(errorHeadersMktp)
            } else {
                getEnvironment((error, environment) => {
                    if (error) {
                        reject(error)
                    }
                    let url = (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_ORDER + orderId + "/orderItems"

                    const CONFIGS = {
                        url: url,
                        method: "POST",
                        params: {
                            orderItems: orderItems,
                            tableNumber: tableNumber,
                            customerInfo: {
                                sessionToken: sessionToken
                            }
                        },
                        cacheTime: 0,
                        headers: headers,
                        timeout: 30000,
                        responseType: RESPONSE_TYPE
                    }

                    makeRequest(CONFIGS, false).then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        })
    })
}

export function checkPayment(orderId, sessionToken, cardId = "", paymentMode = 0) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error) {
                    reject(error)
                }

                let url = (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_PLACE_ORDER + orderId + URL_CHECKPAYMENT

                let customerInfo = {
                    sessionToken: sessionToken,
                    cardId: cardId,
                    paymentMode: paymentMode
                }

                let params = {
                    customerInfo: customerInfo
                }

                const CONFIGS = {
                    url: url,
                    method: "POST",
                    params: params,
                    cacheTime: 0,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}

export function getOffersNearby(latitude, longitude) {
    return new Promise((resolve, reject) => {
        getHeadersMktp((error, headers) => {
            if (error){
                reject(error)
            }
            getEnvironment((error, environment) => {
                if (error) {
                    reject(error)
                }

                let url = (environment == "prod" ? API_DATA_MKTP.urlBaseProd : API_DATA_MKTP.urlBaseHomolog) + URL_OFFERSNEARBY
                url = url.concat(`&lat=${latitude}`)
                url = url.concat(`&lon=${longitude}`)
                url = url.concat(`&distance=${DeliveryDistance}`)

                const CONFIGS = {
                    url: url,
                    method: "GET",
                    params: null,
                    cacheTime: 0,
                    headers: headers,
                    timeout: 30000,
                    responseType: RESPONSE_TYPE
                }

                makeRequest(CONFIGS, false).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    })
}