import React, { Component } from "react"
import { View, StyleSheet, Platform, Alert, StatusBar } from "react-native"
import { Provider } from "react-redux"
import { CheckStack } from "../navigation/NavigationCheck"
import { UnityListStack } from "../navigation/NavigationUnityList"
import { OffersStack } from "../navigation/NavigationOffers"
import { AddressStack } from "../navigation/NavigationAddress"
import { setupModule } from "../configs"
import { isDeviceConnected, configureStore, getStatusBarStyle } from "../utils"
import { ExternalMethods, setExternalMethods } from "../native/Functions"
import { setStyleWithDictionary } from "../theme/Theme"
import { saveApiHeaders, saveEnvironment, saveGoogleApiKey, saveOrderType, saveHeaders } from "../database/specialization/StorageGeneral"
import { eraseAllData } from "../database/StorageBase"
import Spinner from "../libs/customSpinner"
import NoInternetWarning from "../components/messages/NoInternetWarning"
import { setCheckNumber, setShowUnityHeaderWithInfo, setUnityId, setIsCheckMode, setIsDiscountsClubMode, setCurrentCartCheck, setIsOrderTypeSelectionMode, setCurrentAddress, setCurrentOpenOrders } from "../redux/actions"
import * as Errors from "../errors"
import User from "../models/User"
import AddressService from "../api/services/AddressService"
import OrderHistoryService from "../api/services/OrderHistoryService"

var timer = null
const mainStore = configureStore()

function updateState(props) {
    mainStore.dispatch(setShowUnityHeaderWithInfo(props.showUnityHeaderWithInfo))
    !!props.unityId ? mainStore.dispatch(setUnityId(props.unityId)) : null
    !!props.checkNumber ? mainStore.dispatch(setCheckNumber(props.checkNumber)) : null
    !!props.checkNumber ? mainStore.dispatch(setIsCheckMode(true)) : mainStore.dispatch(setIsCheckMode(false))
    !!props.checkNumber ? mainStore.dispatch(setCurrentCartCheck([])) : null
    !!props.shouldGoToDiscountsClub ? mainStore.dispatch(setIsDiscountsClubMode(true)) : mainStore.dispatch(setIsDiscountsClubMode(false))
    !!props.shouldGoToOrderTypeSelection ? mainStore.dispatch(setIsOrderTypeSelectionMode(true)) : mainStore.dispatch(setIsOrderTypeSelectionMode(false))
}

class MainContainer extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props) {
        super(props)

        //DISABLE YELLOW BOX
        // console.disableYellowBox = true

        this.state = {
            goMainView: false,
            error: null,
            loading: true,
            shouldSelectLocation: true
        }

        this.updateNoOrders = this._updateNoOrders.bind(this)
        this.defaultAddressSelected = this._defaultAddressSelected.bind(this)
        this.checkInternet = this._checkInternet.bind(this)

        setStyleWithDictionary(props.stylesDictionary)
        setExternalMethods(props)
        setupModule(props.stylesDictionary, props.homolog)

        if (props.clearStorageData){
            eraseAllData(error => {
                this.initializeComponent()
            })
        } else {
            this.initializeComponent()
        }
    }

    componentDidMount() {
        updateState(this.props)

        if (!this.props.checkNumber) {
            this._getOpenOrders()
            this._callTimer()
        }
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    initializeComponent() {
        saveApiHeaders(this.props.apiHeaders)
        saveGoogleApiKey(this.props.googleApiKey)
        saveEnvironment(this.props.homolog ? "homolog" : "prod")
        saveOrderType(this.props.orderType, (error, orderTypeStorage) => { })

        this._checkInternet()
    }

    _callTimer() {
        clearInterval(timer)
        timer = setInterval(() => {
            this._getOpenOrders()
        }, 10000)
    }

    _getOpenOrders() {
        OrderHistoryService.gerOrderHistory(true).then(result => {
            mainStore.dispatch(setCurrentOpenOrders(result))
        }).catch(error => {
            mainStore.dispatch(setCurrentOpenOrders([]))
        })
    }

    _checkInternet() {
        if (!this.state.loading) {
            this.setState({
                loading: true,
                error: null
            }, () => {
                this._checkInternetAux()
            })
        } else {
            this._checkInternetAux()
        }
    }

    _checkInternetAux() {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                saveHeaders(null, null)
                this.setState({
                    error: null
                }, () => {
                    this.setState({
                        shouldSelectLocation: !this.props.unityId && !this.props.shouldGoToCart && !this.props.shouldGoToOrderStatus
                    }, () => {
                        ExternalMethods.getUserLogged((errorUser, user) => {
                            if (!!user) {
                                let userLogged = new User(user)
                                ExternalMethods.registerFirebaseUser(userLogged)

                                AddressService.getDefaultAddress(user.sessionToken).then(address => {
                                    mainStore.dispatch(setCurrentAddress(address))
                                    this.setState({
                                        loading: false,
                                        shouldSelectLocation: false
                                    })
                                }).catch(error => {
                                    this.setState({
                                        loading: false
                                    })
                                })
                            } else {
                                ExternalMethods.registerFirebaseUser(new User())
                                this.setState({
                                    loading: false
                                })
                            }
                        })
                    })
                })
            } else {
                this.setState({
                    loading: false,
                    error: new Errors.ConnectionException()
                })
            }
        })
    }

    _updateNoOrders = () => {
        if (this.props.unityId) {
            ExternalMethods.closeModule()
        } else {
            this.setState({
                goMainView: true
            })
        }
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.checkInternet }/>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    _defaultAddressSelected() {
        this.setState({
            shouldSelectLocation: false
        })
    }

    /**
     * ...this.props send props to all children
     */
    render() {
        var propsContainer = {
            updateNoOrders: this.updateNoOrders,
            ...this.props
        }

        let barStyle = getStatusBarStyle()

        if (this.state.loading) {
            return (
                <View style = { this.stylesView.general }>
                    <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                    <Spinner visible = { true }/>
                </View>
            )
        } else if (this.state.shouldSelectLocation) {
            propsContainer.defaultAddressSelected = this.defaultAddressSelected

            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <AddressStack initialRouteName = { "AddressListContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        }  else if (!!this.state.error) {
            return (
                this._renderError()
            )
        } else if (!!this.props.checkNumber && !!this.props.unityId) {
            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <CheckStack initialRouteName = { "CheckInitialContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        } else if (this.props.shouldGoToOrderStatus && !this.state.goMainView) {
            propsContainer.shouldCloseModule = true
            propsContainer.shouldCartCloseModule = false
            propsContainer.shouldOrderHistoryCloseModule = true
            propsContainer.shouldUnityCloseModule = false
            propsContainer.mainContainer = null

            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <UnityListStack initialRouteName = { "OrderHistoryListContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        } else if (this.props.shouldGoToCart && !this.state.goMainView) {
            propsContainer.shouldCloseModule = true
            propsContainer.shouldCartCloseModule = true
            propsContainer.shouldOrderHistoryCloseModule = false
            propsContainer.shouldUnityCloseModule = false
            propsContainer.mainContainer = null

            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <UnityListStack initialRouteName = { "CartContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        } else if (this.props.unityId) {
            propsContainer.shouldCloseModule = true
            propsContainer.shouldCartCloseModule = false
            propsContainer.shouldOrderHistoryCloseModule = false
            propsContainer.shouldUnityCloseModule = true
            propsContainer.mainContainer = null

            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <UnityListStack initialRouteName = { "NewUnityDetailContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        } else if (this.props.shouldGoToOrderTypeSelection) {
            propsContainer.shouldCloseModule = false
            propsContainer.shouldCartCloseModule = false
            propsContainer.shouldOrderHistoryCloseModule = false
            propsContainer.shouldUnityCloseModule = false
            propsContainer.mainContainer = "OrderTypeSelectionContainer"

            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <UnityListStack initialRouteName = { "OrderTypeSelectionContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        } else if (this.props.shouldGoToDiscountsClub) {
            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <OffersStack initialRouteName = { "DiscountsClubHomeContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        } else {
            propsContainer.shouldCloseModule = true
            propsContainer.shouldCartCloseModule = false
            propsContainer.shouldOrderHistoryCloseModule = false
            propsContainer.shouldUnityCloseModule = false
            propsContainer.mainContainer = "UnityListContainer"

            return (
                <Provider store = { mainStore }>
                    <View style = { this.stylesView.general }>
                        <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                        <UnityListStack initialRouteName = { "UnityListContainer" } screenProps = { propsContainer }/>
                    </View>
                </Provider>
            )
        }
    }
}

MainContainer.defaultProps = {
    appName: "Gastronomia",
    homolog: true,
    shouldGoToCart: false,
    shouldGoToOrderStatus: false,
    shouldGoToOrderTypeSelection: false,
    shouldGoToDiscountsClub: false,
    hideMainBackButton: false,
    hideButtonNoOrders: false,
    showUnityHeaderWithInfo: true,
    unityId: 0,
    checkNumber: 0,
    orderType: [2],
    clearStorageData: false
}

module.exports = {
    MainContainer,
    updateState
}