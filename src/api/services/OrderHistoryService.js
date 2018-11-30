import { isDeviceConnected, OrderStatus } from "../../utils"
import { ExternalMethods } from "../../native/Functions"
import { getOrderHistory } from "../APIRequests"
import * as Errors from "../../errors"

export default class OrderHistoryService {

    static gerOrderHistory(isOpenOrders = false) {
        return new Promise((resolve, reject) => {
            ExternalMethods.getUserLogged((errorUser, resultUser) => {
                if (!!errorUser) {
                    return reject(new Errors.LoginException())
                } else {
                    isDeviceConnected(isConnected => {
                        if (!isConnected) {
                            return reject(new Errors.ConnectionException())
                        }
                        getOrderHistory(resultUser.sessionToken).then(result => {
                            let orderList = isOpenOrders ? result.filter(order => order.status < OrderStatus.DELIVERED) : result

                            return orderList.length >= 1 ? resolve(orderList) : reject(new Errors.NoOrdersException())
                        }).catch(error => {
                            return reject(!!error && !!error.data && !!error.data.message ? new Errors.CustomException(null, error.data.message) : new Errors.CustomException())
                        })
                    })
                }
            })
        })
    }

}