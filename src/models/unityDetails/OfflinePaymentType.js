import { PAYMENT_METHOD } from "../../utils"
import { PAYMENT_METHOD_STRINGS } from "../../languages"
import PaymentMethod from "./PaymentMethod"

export default class OfflinePaymentType {

    constructor(paymentMethods) {
        this.title = PAYMENT_METHOD_STRINGS.offlinePayment
        this.subtitle = PAYMENT_METHOD_STRINGS.offlinePaymentMessage
        this.paymentMethods = this._parsePaymentMethods(paymentMethods, [PAYMENT_METHOD.DEBIT.id, PAYMENT_METHOD.FOODTICKET.id, PAYMENT_METHOD.MONEY.id])
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
            if (paymentMethod.id === PAYMENT_METHOD.MONEY.id) {
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