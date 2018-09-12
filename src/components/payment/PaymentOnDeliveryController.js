import React, { PureComponent } from "react"
import { View, StyleSheet } from "react-native"
import { PAYMENT_ON_DELIVERY_COMPONENT_STRINGS as PaymentStrings } from "../../languages/index"
import PayHeaderComponent from "./PayHeaderComponent"
import PayWithMoneyComponent from "./PayWithMoneyComponent"
import PayWithFoodTicketComponent from "./PayWithFoodTicketComponent"
import PayWithDebitCardComponent from "./PayWithDebitCardComponent"
import { paymentMethod } from "../../utils"
import { BASE_URL_IMAGE } from "../../configs"

export default class PaymentOnDeliveryController extends PureComponent {

    stylesView = StyleSheet.create({
        main: {
            flex: 1
        },
        general: {
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            paymentMethods: props.paymentMethods,
            selectedPaymentMethod: props.selectedPaymentMethod,
            isDebitAccepted: false,
            isFoodTicketAccepted: false,
            isMoneyAccepted: false,
            acceptedDebitCards: [],
            acceptedFoodTickets: [],
            selectedDebitCard: null,
            selectedFoodTicket: null,
        }

        this.validatePaymentMethods()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedPaymentMethod: nextProps.selectedPaymentMethod,
            paymentMethods: nextProps.paymentMethods
        })

        this.validatePaymentMethods()
    }

    onPayOnDeliveryTapped(newPaymentMethod) {
        this.props.onChangePaymentMethod(newPaymentMethod)
    }

    _onBrandIdChanged(brandId) {
        this.props.onBrandIdChanged(brandId)
    }

    _onChangeDebitCard(debitCard) {
        this.setState({
            selectedDebitCard: debitCard
        })
    }

    _onChangeFoodTicket(foodTicket) {
        this.setState({
            selectedFoodTicket: foodTicket
        })
    }

    _onNeedChange(value) {
        this.props.onNeedChange(value)
    }

    _onChangeTyped(change) {
        this.props.onChangeTyped(change)
    }

    validatePaymentMethods() {
        for (let method of this.state.paymentMethods) {
            switch (method.name) {
                case paymentMethod.DEBIT.name:
                    let cardList = method.brands.map(card => {
                        return {
                            id: card.id,
                            name: card.name,
                            icon: !!card.thumb ? BASE_URL_IMAGE + card.thumb : "",
                            type: paymentMethod.DEBIT
                        }
                    })

                    this.state.acceptedDebitCards = cardList
                    this.state.selectedDebitCard = this.state.selectedDebitCard == null ? cardList[0] : this.state.selectedDebitCard
                    this.state.isDebitAccepted = true

                    break
                case paymentMethod.FOODTICKET.name:
                    let foodTicketList = method.brands.map(card => {
                        return {
                            id: card.id,
                            name: card.name,
                            icon: !!card.thumb ? BASE_URL_IMAGE + card.thumb : "",
                            type: paymentMethod.FOODTICKET
                        }
                    })

                    this.state.acceptedFoodTickets = foodTicketList
                    this.state.selectedFoodTicket = this.state.selectedFoodTicket == null ? foodTicketList[0] : this.state.selectedFoodTicket
                    this.state.isFoodTicketAccepted = true

                    break
                case paymentMethod.MONEY.name:
                    this.state.isMoneyAccepted = true
                    break
            }
        }
    }

    render() {
        return (
            <View style = { this.stylesView.main } accessibilityLabel = "viewGeneral">
                <PayHeaderComponent title = { PaymentStrings.payDelivery }/>
                { this.state.isDebitAccepted ?
                <PayWithDebitCardComponent onPayOnDeliveryTapped = { this.onPayOnDeliveryTapped.bind(this) }
                                           selectedPaymentMethod = { this.state.selectedPaymentMethod }
                                           selectedOption = { this.state.selectedDebitCard }
                                           cardList = { this.state.acceptedDebitCards }
                                           onChangeDebitCard = { this._onChangeDebitCard.bind(this) }
                                           onBrandIdChanged = { this._onBrandIdChanged.bind(this) }
                /> : null }
                { this.state.isFoodTicketAccepted ?
                <PayWithFoodTicketComponent onPayOnDeliveryTapped = { this.onPayOnDeliveryTapped.bind(this) }
                                            selectedPaymentMethod = { this.state.selectedPaymentMethod }
                                            selectedOption = { this.state.selectedFoodTicket }
                                            cardList = { this.state.acceptedFoodTickets }
                                            onChangeFoodTicket = { this._onChangeFoodTicket.bind(this) }
                                            onBrandIdChanged = { this._onBrandIdChanged.bind(this) }
                /> : null }
                { this.state.isMoneyAccepted ?
                <PayWithMoneyComponent onPayOnDeliveryTapped = { this.onPayOnDeliveryTapped.bind(this) }
                                       selectedPaymentMethod = { this.state.selectedPaymentMethod }
                                       onNeedChange = { this._onNeedChange.bind(this) }
                                       onChangeTyped = { this._onChangeTyped.bind(this) }
                                       onScrollToInput = { this.props.onScrollToInput.bind(this) }
                /> : null }
            </View>
        )
    }
}