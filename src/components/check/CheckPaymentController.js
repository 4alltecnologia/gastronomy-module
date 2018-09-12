import React, { Component } from "react"
import { Alert, View, ScrollView, StyleSheet, StatusBar } from "react-native"
import { isDeviceConnected, paymentMethod, getUnityMedia, MediaTypes } from "../../utils"
import { checkPayment } from "../../api/ApiRequests"
import { ExternalMethods } from "../../native/Functions"
import { FontColor } from "../../theme/Theme"
import { GENERAL_STRINGS } from "../../languages/index"
import { removeCheck } from "../../database/specialization/StorageCheck"
import Spinner from "../../libs/customSpinner"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import CheckPaymentComponent from "./CheckPaymentComponent"
import { connect } from "react-redux"

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
            selectedPaymentMethod: paymentMethod.CREDITCARD
        }

        this.callLogin = this._callLogin.bind(this)
        this.onLoadingCards = this._onLoadingCards.bind(this)
        this.onIsDeviceConnected = this._onIsDeviceConnected.bind(this)
        this.onCreditCardChanged = this._onCreditCardChanged.bind(this)
        this.onChangePaymentMethod = this._onChangePaymentMethod.bind(this)
        this.onPayCheck = this._onPayCheck.bind(this)
    }

    _callLogin() {
        ExternalMethods.startLogin((resultLogin) => {
            this.setState({
                isUserLoggedIn: resultLogin,
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
        this.setState({
            selectedPaymentMethod: newPaymentMethod,
            cardId: newPaymentMethod.name == paymentMethod.WALLET.name ? paymentMethod.WALLET.cardIdName : this.state.cardId
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
                            }, () => ExternalMethods.startLogin((resultLogin) => {
                                this._onPayCheck()
                            })
                        )
                    } else {
                        checkPayment(this.state.orderId, resultUser.sessionToken, this.state.cardId, this.state.selectedWalletPaymentMethod.id).then(paymentResult => {
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
                <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
            </View>
        )
    }

    _renderNoInternet() {
        return (
            <View style = { this.stylesView.general }>
                <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
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
                    <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
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