import React, { Component } from "react"
import { Alert, View, ScrollView, StyleSheet } from "react-native"
import { isDeviceConnected, paymentMethod, getUnityMedia, MediaTypes, FirebaseActions } from "../../utils"
import { checkPayment } from "../../api/APIRequests"
import { ExternalMethods } from "../../native/Functions"
import { FontColor } from "../../theme/Theme"
import { GENERAL_STRINGS } from "../../languages/index"
import { removeCheck } from "../../database/specialization/StorageCheck"
import Spinner from "../../libs/customSpinner"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import CheckPaymentComponent from "./CheckPaymentComponent"
import { connect } from "react-redux"
import User from "../../models/User"

class CheckPaymentController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,//true
            isDeviceConnected: true,
            checkNumber: props.checkNumber, //redux
            checkName: props.checkName, //redux
            orderId: props.orderId, //redux
            tableNumber: props.tableNumber, //redux
            unityId: props.unityId, //redux
            unityDetails: !!props.unityDetails ? props.unityDetails : "",
            totalPrice: !!props.totalPrice ? props.totalPrice : 0,
            cardId: null,
            selectedPaymentMethod: PAYMENT_METHOD.CREDITCARD
        }

        this.callLogin = this._callLogin.bind(this)
        this.onLoadingCards = this._onLoadingCards.bind(this)
        this.onIsDeviceConnected = this._onIsDeviceConnected.bind(this)
        this.onCreditCardChanged = this._onCreditCardChanged.bind(this)
        this.onChangePaymentMethod = this._onChangePaymentMethod.bind(this)
        this.onPayCheck = this._onPayCheck.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.CHECK_PAYMENT.screen)
    }

    _callLogin() {
        ExternalMethods.startLogin((user) => {
            ExternalMethods.registerFirebaseUser(new User(user))
            this.setState({
                isUserLoggedIn: !!user,
                isLoading: true
            }, () => this._getProductList() )
        })
    }

    _onLoadingCards(isLoading) {
        this.setState({
            isLoading: isLoading
        })
    }

    _onIsDeviceConnected(isConnected) {
        this.setState({
            isDeviceConnected: isConnected,
            isLoading: false
        })
    }

    _onChangePaymentMethod(newPaymentMethod) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CHECK_PAYMENT.actions.CHANGED_PAYMENT_METHOD, { paymentMethod: newPaymentMethod.key })
        this.setState({
            selectedPaymentMethod: newPaymentMethod,
            cardId: newPaymentMethod.name == PAYMENT_METHOD.WALLET.name ? PAYMENT_METHOD.WALLET.cardIdName : this.state.cardId
        })
    }

    _onCreditCardChanged(cardId) {
        this.setState({
            cardId: cardId
        })
    }

    _onPayCheck() {
        this.setState({
            isLoading: true
        }, () => isDeviceConnected(isDeviceConnected => {
            if (isDeviceConnected) {
                ExternalMethods.getUserLogged((errorUser, resultUser) => {
                    if (!!errorUser || !resultUser) {
                        this.setState({
                                isLoading: false
                            }, () => ExternalMethods.startLogin((user) => {
                                ExternalMethods.registerFirebaseUser(new User(user))
                                this._onPayCheck()
                            })
                        )
                    } else {
                        ExternalMethods.registerFirebaseEvent(FirebaseActions.CHECK_PAYMENT.actions.PAY, { checkNumber: this.state.checkNumber, unityId: this.state.unityId, paymentMethod: this.state.selectedPaymentMethod.key })
                        checkPayment(this.state.orderId, resultUser.sessionToken, this.state.cardId, this.state.selectedPaymentMethod.id).then(paymentResult => {
                            ExternalMethods.registerFirebaseEvent(FirebaseActions.CHECK_PAYMENT.actions.PAY_SUCCESS, {})
                            removeCheck(this.state.checkNumber, this.state.unityId, (error, data) => {
                                this.setState({
                                    isLoading: false
                                }, () => this.props.navigateTo(this.state.unityDetails, this.state.totalPrice))
                            })
                        }).catch(error => {
                            Alert.alert(
                                GENERAL_STRINGS.warning,
                                !!error && !!error.data ? error.data.message : GENERAL_STRINGS.alertErrorMessage,
                                [
                                    {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                        this.setState({
                                            isLoading: false
                                        })
                                    }}
                                ],
                                { cancelable: false }
                            )
                        })
                    }
                })
            } else {
                this.setState({
                    isLoading: false,
                    isDeviceConnected: false
                })
            }
        }))
    }

    _renderFirstLoad() {
        return (
            <View>
                <Spinner visible = { this.state.isLoading } size = { 115 }/>
            </View>
        )
    }

    _renderNoInternet() {
        return (
            <View style = { this.stylesView.general }>
                <Spinner visible = { this.state.isLoading } size = { 115 }/>
                <NoInternetWarning tryInternet = { () => this._onIsDeviceConnected(true) }/>
            </View>
        )
    }

    render() {
        if (this.state.isFirstTime) {
            return this._renderFirstLoad()
        } else if (!this.state.isDeviceConnected) {
            return this._renderNoInternet()
        } else {
            return (
                <View style = { this.stylesView.general }>
                    <Spinner visible = { this.state.isLoading } size = { 115 }/>
                    <CheckPaymentComponent unityName = { this.state.unityDetails.name }
                                           unityLogoURL = { getUnityMedia(MediaTypes.LOGO, this.state.unityDetails.media) }
                                           checkName = { this.state.checkName }
                                           checkNumber = { this.state.checkNumber }
                                           totalPrice = { this.state.totalPrice }
                                           selectedPaymentMethod = { this.state.selectedPaymentMethod }
                                           onChangePaymentMethod = { this.onChangePaymentMethod }
                                           onLoadingCards = { this.onLoadingCards }
                                           onIsDeviceConnected = { this.onIsDeviceConnected }
                                           onCreditCardChanged = { this.onCreditCardChanged }
                                           onPayCheck = { this.onPayCheck }
                    />
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        checkNumber: state.check.checkNumber,
        checkName: state.check.checkName,
        orderId: state.check.orderId,
        tableNumber: state.check.tableNumber,
        unityId: state.general.unityId
    }),
    { }
) ( CheckPaymentController )