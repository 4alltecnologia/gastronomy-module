import { getEnvironment, getHeadersMktp } from "../database/specialization/StorageGeneral"

export const BASE_URL_IMAGE = "https://s3-sa-east-1.amazonaws.com/marketplace-img/"
export const RESPONSE_TYPE = "json"

export const API_DATA_GOOGLE_APIS = {
    urlBase: "https://maps.googleapis.com/maps/api/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

export default class APIConfiguration {
    static getApiDataMktp() {
        return new Promise((resolve, reject) => {
            let urlBaseHomolog = "https://marketplace.test.4all.com/mktplace/v1"
            let urlBaseProd = "https://marketplace.api.4all.com/mktplace/v1"

            getHeadersMktp((errorHeaders, headers) => {
                getEnvironment((errorEnvironment, environment) => {
                    if (!!errorHeaders || !!errorEnvironment) {
                        return reject(!!errorHeaders ? errorHeaders : errorEnvironment)
                    }

                    return resolve({ url: environment === "prod" ? urlBaseProd : urlBaseHomolog, headers: headers })
                })
            })
        })
    }

    static getApiDataAccount() {
        return new Promise((resolve, reject) => {
            let urlBaseHomolog = "https://conta.homolog-interna.4all.com"
            let urlBaseProd = "https://conta.api.4all.com"
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }

            getEnvironment((error, environment) => {
                if (!!error) {
                    return reject(error)
                }

                return resolve({ url: environment === "prod" ? urlBaseProd : urlBaseHomolog, headers: headers })
            })
        })
    }

    static getApiWalletAccount(sessionToken) {
        return new Promise((resolve, reject) => {
            let urlBaseHomolog = "https://test.api.4all.com/customer/"
            let urlBaseProd = "https://api.4all.com/customer/"
            let headers = {
                "Authorization": "sessionToken " + sessionToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }

            getEnvironment((errorEnvironment, environment) => {
                if (!!errorEnvironment) {
                    return reject(errorEnvironment)
                }

                return resolve({ url: environment === "prod" ? urlBaseProd : urlBaseHomolog, headers: headers })
            })
        })
    }
}