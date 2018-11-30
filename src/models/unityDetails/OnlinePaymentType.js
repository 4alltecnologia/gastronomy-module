import { PAYMENT_METHOD } from "../../utils"
import { PAYMENT_METHOD_STRINGS } from "../../languages"
import PaymentMethod from "./PaymentMethod"

export default class OnlinePaymentType {

    constructor(paymentMethods) {
        this.title = PAYMENT_METHOD_STRINGS.onlinePayment
        this.subtitle = PAYMENT_METHOD_STRINGS.onlinePaymentMessage
        this.paymentMethods = this._parsePaymentMethods(paymentMethods, [PAYMENT_METHOD.WALLET.id, PAYMENT_METHOD.CREDITCARD.id])
    }

    _parsePaymentMethods(paymentMethodsList, acceptedPaymentMethodsIds) {
        let newList = []

        paymentMethodsList.forEach(paymentMethod => {
            if (acceptedPaymentMethodsIds.includes(paymentMethod.id)) {
                newList.push(new PaymentMethod(paymentMethod))
            }
        })

        return newList
    }

    getUniquePaymentMethodsList() {
        let uniqueList = []

        this.paymentMethods.forEach(paymentMethod => {
            if (paymentMethod.id === PAYMENT_METHOD.WALLET.id) {
                uniqueList.push(paymentMethod)
            } else {
                paymentMethod.brands.forEach(brand => {
                    uniqueList.push(brand)
                })
            }
        })

        return uniqueList
    }

}