import CacheStore from "./Cache"
import axios from "axios"

//cacheTime em minutos!
export function makeRequest(configs, saveCache) {
    return new Promise((resolve, reject) => {
        CacheStore.get(configs.url).then(value => {
            return resolve(value)
        }).catch(error => {
            axios({
                method: configs.method,
                url: configs.url,
                params: null,
                data: configs.params,
                headers: configs.headers,
                responseType: configs.responseType,
                timeout: configs.timeout
            }).then((response) => {
                if (saveCache) {
                    CacheStore.set(response.config.url, response.data, configs.cacheTime)
                }
                return resolve(response.data)
            }).catch((error) => {
                return reject(error.response)
            })
        })
    })
}
