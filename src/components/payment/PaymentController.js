import React, { PureComponent } from "react"
import { View, ScrollView, Alert, StyleSheet, StatusBar } from "react-native"
import { NavigationActions } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { paymentMethod, getUnityMedia, MediaTypes } from "../../utils"
import { makePayment, getOrderDetails } from "../../api/ApiRequests"
import { ExternalMethods }from "../../native/Functions"
import { getUnity } from "../../database/specialization/StorageUnity"
import { GENERAL_STRINGS, SUCCESS_CONTAINER_STRINGS, PAYMENT_CONTROLLER_STRINGS as PaymentStrings } from "../../languages/index"
import { BackgroundColor, FontColor } from "../../theme/Theme"
import Spinner from "../../libs/customSpinner"
import PaymentHeaderComponent from "./PaymentHeaderComponent"
import PaymentBottomComponent from "./PaymentBottomComponent"
import PaymentNowController from "./PaymentNowController"
import PaymentOnDeliveryController from "./PaymentOnDeliveryController"
import PaymentButtonComponent from "./PaymentButtonComponent"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import { cartToPay, resetCart } from "../../database/specialization/StorageCart"
import { saverOrder, saverOrderId } from "../../database/specialization/StorageOrder"

export default class PaymentController extends PureComponent {

    stylesView = StyleSheet.create({
        mainView: {
            flex: 1
        },
        scrollview: {
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)
        /**
         * @type {{
         * deliveryTime: Delivery time,
         * subtotalValue: Subtotal value,
         * deliveryValue: Delivery value,
         * totalValue: Total value,
         * paymentMethods: Array with payment methods accepted on delivery,
         * selectedPaymentMethod:
         * }}
         */

        this.state = {
            cart: this.props.cart,
            deliveryTime: props.cart.unity.deliveryEstimatedTime,
            deliveryEstimatedIdUnitTime: props.cart.unity.deliveryEstimatedIdUnitTime,
            takeAwayEstimatedTime: props.cart.unity.takeAwayEstimatedTime,
            takeAwayEstimatedIdUnitTime: props.cart.unity.takeAwayEstimatedIdUnitTime,
            subtotalValue: props.cart.productTotal,
            deliveryValue: props.cart.deliveryFee,
            totalValue: props.cart.total,
            paymentMethods: props.cart.unity.paymentMethods,
            selectedPaymentMethod: paymentMethod.CREDITCARD,
            needChange: true,
            change: 0,
            cardId: null,
            brandId: null,
            idOrderType: props.idOrderType,
            isLoading: true,
            isButtonEnabled: true,
            isConnected: true
        }

        this.onChangePaymentMethod = this._onChangePaymentMethod.bind(this)
        this.onCreditCardChanged = this._onCreditCardChanged.bind(this)
        this.onLoadingCards = this._onLoadingCards.bind(this)
        this.onBrandIdChanged = this._onBrandIdChanged.bind(this)
        this.onNeedChange = this._onNeedChange.bind(this)
        this.onChangeTyped = this._onChangeTyped.bind(this)
        this.onScrollToInput = this._onScrollToInput.bind(this)
        this.onIsDeviceConnected = this._onIsDeviceConnected.bind(this)
        this.onPaymentButtonTapped = this._onPaymentButtonTapped.bind(this)
        this.refreshController = this._refreshController.bind(this)
    }

    //Set payment method from credit card, wallet 4all, debit card, food ticket or money
    _onChangePaymentMethod(newPaymentMethod) {
        this.setState({
            selectedPaymentMethod: newPaymentMethod,
            cardId: newPaymentMethod.name == paymentMethod.WALLET.name ? paymentMethod.WALLET.cardIdName : this.state.cardId
        })
    }

    //Set card id from credit card when the user pays with 4all
    _onCreditCardChanged(cardId) {
        this.setState({
            cardId: cardId
        })
    }

    //Set card brand id from debit card or food ticket for payment on delivery
    _onBrandIdChanged(brandId) {
        this.setState({
            brandId: brandId
        })
    }

    //Set the user's need to receive change
    _onNeedChange(value) {
        this.setState({
            needChange: value
        })
    }

    //Set change when the user types it
    _onChangeTyped(change) {
        this.setState({
            change: change
        })
    }

    //Make payment
    _onPaymentButtonTapped() {
        this.setState({
            isLoading: true,
            isButtonEnabled: false
        }, () => ExternalMethods.getUserLogged((error, resultUserLogged) => {
            if (error) {
                this.setState({
                    isLoading: false,
                    isButtonEnabled: false
                }, () => ExternalMethods.startLogin((resultLogin) => {
                    this._makePayment(resultLogin.sessionToken)
                }))
            } else {
                this._makePayment(resultUserLogged.sessionToken)
            }
        }))
    }

    _onLoadingCards(isLoading) {
        if (this.state.isLoading != isLoading) {
            this.setState({
                isLoading: isLoading
            })
        }
    }

    _onIsDeviceConnected(isConnected) {
        this.setState({
            isConnected: isConnected,
            isLoading: false
        })
    }

    _refreshController() {
        this.setState({
            isConnected: true,
            isLoading: true
        })
    }

    _navigateToSuccess(action) {
        this.props.navigation.dispatch(action)
    }

    _makePayment(sessionToken) {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true,
                isButtonEnabled: false
            })
        }

        let cardId = ""
        let paymentMode = 0
        let paymentMethodId = 0
        let brandId = 0
        let change = 0
        let idOrderType = this.state.idOrderType

        if (this.state.selectedPaymentMethod.name == paymentMethod.WALLET.name) {
            cardId = this.state.cardId
            paymentMode = paymentMethod.WALLET.id
        } else if (this.state.selectedPaymentMethod.name == paymentMethod.CREDITCARD.name) {
            if (!!this.state.cardId) {
                cardId = this.state.cardId
                paymentMode = paymentMethod.CREDITCARD.id
            } else {
                Alert.alert(
                    GENERAL_STRINGS.warning,
                    PaymentStrings.selectPaymentMethod,
                    [
                        {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                            this.setState({
                                isLoading: false,
                                isButtonEnabled: true
                            })
                        }}
                    ],
                    { cancelable: false }
                )
                return
            }
        } else if (this.state.selectedPaymentMethod.name == paymentMethod.DEBIT.name) {
            brandId = this.state.brandId
            paymentMethodId = paymentMethod.DEBIT.id
        } else if (this.state.selectedPaymentMethod.name == paymentMethod.FOODTICKET.name) {
            brandId = this.state.brandId
            paymentMethodId = paymentMethod.FOODTICKET.id
        } else if (this.state.selectedPaymentMethod.name == paymentMethod.MONEY.name) {
            paymentMethodId = paymentMethod.MONEY.id
            if (this.state.needChange) {
                if (this.state.change <= this.state.totalValue) {
                    Alert.alert(
                        GENERAL_STRINGS.warning,
                        PaymentStrings.wrongChange,
                        [
                            {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                this.setState({
                                    isLoading: false,
                                    isButtonEnabled: true
                                })
                            }}
                        ],
                        { cancelable: false }
                    )
                    return
                }

                change = this.state.change
            }
        }

        cartToPay((error, cart) => {
            if (error) {
                this.setState({
                    isLoading: false,
                    isButtonEnabled: true
                })
            } else {
                makePayment(sessionToken, cardId, paymentMode, paymentMethodId, brandId, change, cart, idOrderType).then(response => {
                    if (!!response.id && !!response.estimatedTimestamp) {
                        resetCart((error) => {
                            getOrderDetails(response.id).then(orderDetails => {
                                const successAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: "SuccessContainer",
                                            params: {
                                                navigation: this.props.navigation,
                                                subtotalValue: this.state.subtotalValue,
                                                totalValue: this.state.totalValue,
                                                paymentMode: paymentMode,
                                                idOrder: orderDetails.id,
                                                unityName: orderDetails.unity.name,
                                                unityLogoURL: getUnityMedia(MediaTypes.THUMB, orderDetails.unity.media),
                                                deliveryTime: orderDetails.unity.deliveryEstimatedTime,
                                                deliveryEstimatedIdUnitTime: orderDetails.unity.deliveryEstimatedIdUnitTime,
                                                takeAwayEstimatedTime: this.state.takeAwayEstimatedTime,
                                                takeAwayEstimatedIdUnitTime: this.state.takeAwayEstimatedIdUnitTime,
                                                idOrderType: this.state.idOrderType
                                            }
                                        })
                                    ]
                                })
                                this.setState({
                                    isLoading: false,
                                    isButtonEnabled: true
                                }, () => this._navigateToSuccess(successAction))
                            })
                        })
                    } else {
                        Alert.alert(
                            GENERAL_STRINGS.warning,
                            GENERAL_STRINGS.alertErrorMessage,
                            [
                                {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                        this.setState({
                                            isLoading: false,
                                            isButtonEnabled: true
                                        })
                                    }}
                            ],
                            { cancelable: false }
                        )
                    }
                }).catch((error) => {
                    Alert.alert(
                        GENERAL_STRINGS.warning,
                        !!error && !!error.data ? error.data.message : GENERAL_STRINGS.alertErrorMessage,
                        [
                            {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                this.setState({
                                    isLoading: false,
                                    isButtonEnabled: true
                                })
                            }}
                        ],
                        { cancelable: false }
                    )
                })
            }
        })
    }

    _onScrollToInput = (reactNode: any) => {
        setTimeout(() => {
            this.scroll.props.scrollToFocusedInput(reactNode,180)
        }, 100)
    }

    render() {
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"
        if (this.state.isConnected){
            return (
                <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} enableOnAndroid={true} style={this.stylesView.scrollview} accessibilityLabel="scrollViewScroll" keyboardOpeningTime={300}>
                    <StatusBar barStyle = { barStyle } accessibilityLabel="statusBar"/>
                    <Spinner visible = { this.state.isLoading }/>
                    <PaymentHeaderComponent/>
                    <PaymentNowController
                        onChangePaymentMethod = { this.onChangePaymentMethod }
                        selectedPaymentMethod = { this.state.selectedPaymentMethod }
                        onCreditCardChanged = { this.onCreditCardChanged }
                        onLoadingCards = { this.onLoadingCards }
                        onIsDeviceConnected = { this.onIsDeviceConnected }
                    />
                    {this.state.paymentMethods.length > 0 ?
                        <PaymentOnDeliveryController
                            onChangePaymentMethod = { this.onChangePaymentMethod }
                            selectedPaymentMethod = { this.state.selectedPaymentMethod }
                            paymentMethods = { this.state.paymentMethods }
                            onBrandIdChanged = { this.onBrandIdChanged }
                            onNeedChange = { this.onNeedChange }
                            onChangeTyped = { this.onChangeTyped }
                            onScrollToInput = { this.onScrollToInput }
                        /> : null}
                    <PaymentBottomComponent subtotalValue = { this.state.subtotalValue }
                                            totalValue = { this.state.totalValue }
                                            deliveryValue = { this.state.deliveryValue }
                                            deliveryTime = { this.state.deliveryTime }
                                            deliveryEstimatedIdUnitTime = { this.state.deliveryEstimatedIdUnitTime }
                                            takeAwayEstimatedTime = { this.state.takeAwayEstimatedTime }
                                            takeAwayEstimatedIdUnitTime = { this.state.takeAwayEstimatedIdUnitTime }
                                            idOrderType = { this.state.idOrderType }
                    />
                    <PaymentButtonComponent
                        isButtonEnabled = { this.state.isButtonEnabled }
                        onPaymentButtonTapped = { this.onPaymentButtonTapped }
                    />
                </KeyboardAwareScrollView>
            )
        } else {
            return (
                <View style={this.stylesView.mainView} accessibilityLabel="viewNoInternet">
                    <NoInternetWarning tryInternet = { this.refreshController }/>
                </View>
            )
        }
    }
}