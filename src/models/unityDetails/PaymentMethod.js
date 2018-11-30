import Card from "./Card"
import { BASE_URL_IMAGE } from "../../api/APIConfiguration"

export default class PaymentMethod {

    constructor(paymentMethodDictionary) {
        this.id = paymentMethodDictionary.id
        this.name = paymentMethodDictionary.name
        this.thumb = !!paymentMethodDictionary.thumb ? BASE_URL_IMAGE + paymentMethodDictionary.thumb : null
        this.brands = !!paymentMethodDictionary.brands ? this._parseCards(paymentMethodDictionary.brands): null
    }

    _parseCards(cardsList) {
        return cardsList.map(card => {
            return new Card(card)
        })
    }

}