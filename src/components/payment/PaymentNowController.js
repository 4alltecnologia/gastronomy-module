import React, { PureComponent } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { GENERAL_STRINGS, PAYMENT_NOW_COMPONENT_STRINGS as PaymentStrings } from "../../languages/index"
import { ExternalMethods } from "../../native/Functions"
import { getWalletBalance, listCards } from "../../api/ApiRequests"
import { paymentMethod, isDeviceConnected } from "../../utils"
import { BackgroundColor } from "../../theme/Theme"
import Images from "../../assets/index"
import Spinner from "../../libs/customSpinner"

import PayHeaderComponent from "./PayHeaderComponent"
import PaymentNowCreditCardComponent from "./PaymentNowCreditCardComponent"
import PaymentNowWalletComponent from "./PaymentNowWalletComponent"

export default class PaymentNowController extends PureComponent {

    stylesView = StyleSheet.create({
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
            selectedPaymentMethod: props.selectedPaymentMethod,
            accountBalance: 0,
            libCardId: null,
            card: null,
            cardId: null
        }

        this.onPayNowTapped = this._onPayNowTapped.bind(this)
        this.callCardFlow = this._callCardFlow.bind(this)
        this.onChangePaymentMethod = this._onChangePaymentMethod.bind(this)
        this.getCardLogoByBrandId = this._getCardLogoByBrandId.bind(this)
    }

    componentDidMount() {
        this._getUserBalance()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedPaymentMethod: nextProps.selectedPaymentMethod
        })
    }

    _onPayNowTapped(newPaymentMethod) {
        this.props.onChangePaymentMethod(newPaymentMethod)
    }

    _onChangePaymentMethod(newPaymentMethod) {
        this.props.onChangePaymentMethod(newPaymentMethod)
        newPaymentMethod == paymentMethod.CREDITCARD ? this.props.onCreditCardChanged(this.state.cardId) : null
    }

    _getUserBalance() {
        this.props.onLoadingCards(true)

        isDeviceConnected(isConnected => {
            if (isConnected) {
                ExternalMethods.getUserLogged((error, resultUserLogged) => {
                    if (error) {
                        ExternalMethods.startLogin((resultLogin) => {
                            getWalletBalance(result.sessionToken).then(responseBalance => {
                                if (responseBalance.success) {
                                    this._callListCards(resultLogin.sessionToken, responseBalance.balance)
                                } else {
                                    Alert.alert(GENERAL_STRINGS.warning, responseBalance.errorMessage)
                                }
                            }).catch(error => {
                                this.props.onLoadingCards(false)
                            })
                        })
                    } else {
                        getWalletBalance(resultUserLogged.sessionToken).then(responseBalance => {
                            if (responseBalance.success) {
                                this._callListCards(resultUserLogged.sessionToken, responseBalance.balance)
                            } else {
                                Alert.alert(
                                    GENERAL_STRINGS.warning,
                                    responseBalance.errorMessage,
                                    [
                                        {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                            this.props.onLoadingCards(false)
                                        }}
                                    ]
                                )
                            }
                        }).catch(error => {
                            this.props.onLoadingCards(false)
                        })
                    }
                })
            } else {
                this.props.onIsDeviceConnected(false)
            }
        })
    }

    _callListCards(sessionToken, balance = 0) {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                listCards(sessionToken).then(responseListCards => {
                    const listCards = responseListCards.cardList.map(card => {
                        return {
                            brandId: card.brandId,
                            cardId: card.cardId,
                            isDefault: card.default,
                            expirationDate: card.expirationDate,
                            lastDigits: card.lastDigits,
                            shared: card.shared,
                            sharedDetails: card.sharedDetails,
                            status: card.status,
                            type: card.type
                        }
                    })

                    let defaultFound = false
                    let cardId = null
                    let cardState = null

                    for (let index = 0; index < listCards.length; ++index) {
                        let card = listCards[index]

                        if (this.state.libCardId) {
                            if (this.state.libCardId == card.cardId) {
                                cardId = card.cardId
                                defaultFound = true
                                cardState = card

                                break
                            }
                        } else {
                            if (card.isDefault) {
                                cardId = card.cardId
                                defaultFound = true
                                cardState = card

                                break
                            }
                        }
                    }

                    if (defaultFound) {
                        this.setState({
                            accountBalance: balance ? balance : this.state.accountBalance,
                            cardId: cardId,
                            card: cardState,
                            listCards: listCards
                        }, () => {this.props.onIsDeviceConnected(true)
                            this.props.onCreditCardChanged(this.state.cardId)
                        })
                    } else {
                        this.setState({
                            accountBalance: balance ? balance : this.state.accountBalance,
                            cardId: null,
                            card: null,
                            listCards: listCards
                        }, () => {this.props.onIsDeviceConnected(true)
                            this.props.onCreditCardChanged(this.state.cardId)
                        })
                    }

                    // this.props.onIsDeviceConnected(true)
                    // this.props.onCreditCardChanged(this.state.cardId)
                }).catch(error => {
                    Alert.alert(
                        GENERAL_STRINGS.warning,
                        error.data.message,
                        [
                            {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                this.props.onLoadingCards(false)
                            }}
                        ]
                    )
                })
            } else {
                this.props.onIsDeviceConnected(false)
            }
        })
    }

    _callCardFlow() {
        ExternalMethods.getCardID((result) => {
            this.setState({
                libCardId: result
            }, () => this.props.onLoadingCards(true))
            ExternalMethods.getUserLogged((error, resultUserLogged) => {
                if (error) {
                    ExternalMethods.startLogin((resultLogin) => {
                        this._callListCards(resultLogin.sessionToken)
                    })
                } else {
                    this._callListCards(resultUserLogged.sessionToken)
                }
            })
        })
    }

    _getCardLogoByBrandId() {
        var brandId = this.state.card ? this.state.card.brandId : 0

        switch (brandId) {
            case 1:
                return Images.icons.visa
                break
            case 2:
                return Images.icons.mastercard
                break
            default:
                return Images.icons.creditCard
                break
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <PayHeaderComponent title = { PaymentStrings.payNow }/>
                <PaymentNowCreditCardComponent onPayNowTapped = { this.onPayNowTapped }
                                     onCallCardFlowTapped = { this.callCardFlow }
                                     selectedPaymentMethod = { this.state.selectedPaymentMethod }
                                     onChangePaymentMethod = { this.onChangePaymentMethod }
                                     accountBalance = { this.state.accountBalance }
                                     cardLastDigits = { this.state.card ? this.state.card.lastDigits : "0000" }
                                     cardLogo = { this.getCardLogoByBrandId() }
                />
                <PaymentNowWalletComponent onPayNowTapped = { this.onPayNowTapped }
                                     onCallCardFlowTapped = { this.callCardFlow }
                                     selectedPaymentMethod = { this.state.selectedPaymentMethod }
                                     onChangePaymentMethod = { this.onChangePaymentMethod }
                                     accountBalance = { this.state.accountBalance }
                                     cardLastDigits = { this.state.card ? this.state.card.lastDigits : "0000" }
                                     cardLogo = { this.getCardLogoByBrandId() }
                />
            </View>
        )
    }
}