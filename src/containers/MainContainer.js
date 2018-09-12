import React, { Component } from "react"
import { View, StyleSheet, Platform, AppState, Alert } from "react-native"
import { CheckStack } from "../navigation/NavigationCheck"
import { UnityListStack } from "../navigation/NavigationUnityList"
import { OffersStack } from "../navigation/NavigationOffers"
import { setupModule } from "../configs"
import { getCurrentLocation, callNativeLocationSettings, isDeviceConnected, configureStore } from "../utils"
import { ExternalMethods, setExternalMethods } from "../native/Functions"
import { setStyleWithDictionary } from "../theme/Theme"
import { setIdUnity } from "../database/specialization/StorageUnity"
import { saveHeaders, saveApiHeaders, saveEnvironment, saveGoogleApiKey, saveOrderType } from "../database/specialization/StorageGeneral"
import { addCheck } from "../database/specialization/StorageCheck"
import { eraseAllData } from "../database/StorageBase"
import { GENERAL_STRINGS, LOCATION_SETTINGS_STRINGS } from "../languages"
import Permissions from "react-native-permissions"
import Spinner from "../libs/customSpinner"
import NoLocationWarning from "../components/messages/NoLocationWarning"
import NoLocationFoundWarning from "../components/messages/NoLocationFoundWarning"
import NoInternetWarning from "../components/messages/NoInternetWarning"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "../redux/reducers"
import rootSaga from "../redux/sagas"
import { setCheckNumber, setShowUnityHeaderWithInfo, setUnityId, setIsCheckMode, setIsOffersMode, setCurrentCartCheck, setIsOrderTypeSelectionMode } from "../redux/actions"
import * as Errors from "../errors"

const mainStore = configureStore()

function updateState(props) {
    mainStore.dispatch(setShowUnityHeaderWithInfo(props.showUnityHeaderWithInfo))
    !!props.unityId ? mainStore.dispatch(setUnityId(props.unityId)) : null
    !!props.checkNumber ? mainStore.dispatch(setCheckNumber(props.checkNumber)) : null
    !!props.checkNumber ? mainStore.dispatch(setIsCheckMode(true)) : mainStore.dispatch(setIsCheckMode(false))
    !!props.checkNumber ? mainStore.dispatch(setCurrentCartCheck([])) : null
    !!props.shouldGoToOffers ? mainStore.dispatch(setIsOffersMode(true)) : mainStore.dispatch(setIsOffersMode(false))
    !!props.shouldGoToOrderTypeSelection ? mainStore.dispatch(setIsOrderTypeSelectionMode(true)) : mainStore.dispatch(setIsOrderTypeSelectionMode(false))
}

class MainContainer extends Component {

    stylesView = StyleSheet.create({
        noLocation: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            goMainView: false,
            latitude: null,
            longitude: null,
            error: null,
            loading: true,
            appState: AppState.currentState
        }

        this.updateNoOrders = this._updateNoOrders.bind(this)

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
    }

    initializeComponent() {
        saveApiHeaders(this.props.apiHeaders)
        saveGoogleApiKey(this.props.googleApiKey)
        saveEnvironment(this.props.homolog ? "homolog" : "prod")
        saveOrderType(this.props.orderType, (error, orderTypeStorage) => { })

        this.requestUserPermission()
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this.requestUserPermission()
        }

        this.setState({appState: nextAppState})
    }

    requestUserPermission(isTryingAgain = false) {
        if (!this.state.loading) {
            this.setState({
                loading: true,
                error: null
            }, () => {
                this.requestUserPermissionAux(isTryingAgain)
            })
        } else {
            this.requestUserPermissionAux(isTryingAgain)
        }
    }

    requestUserPermissionAux(isTryingAgain = false) {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                if (!this.props.checkNumber && !this.props.unityId && !this.props.shouldGoToOrderStatus && !this.props.shouldGoToCart) {
                    Permissions.request("location", {type: "whenInUse"}).then(response => {
                        if (response == "authorized" || (isTryingAgain && Platform.OS === "ios")) {
                            getCurrentLocation().then(position => {
                                if (position == null) {
                                    saveHeaders(0, 0)
                                    this.setState({
                                        loading: false,
                                        latitude: null,
                                        longitude: null,
                                        error: null
                                    })
                                } else {
                                    saveHeaders(position.coords.latitude, position.coords.longitude)
                                    setTimeout(() => {
                                        this.setState({
                                            loading: false,
                                            latitude: position.coords.latitude,
                                            longitude: position.coords.longitude,
                                            error: null
                                        })
                                        AppState.removeEventListener("change", this._handleAppStateChange)
                                    }, 400)
                                }
                            }).catch(error => {
                                if (error instanceof Errors.LocationSettingsException) {
                                    this.setState({
                                        loading: false,
                                        latitude: null,
                                        longitude: null,
                                        error: error
                                    }, () => {
                                        setTimeout(() => {
                                            Alert.alert(
                                                LOCATION_SETTINGS_STRINGS.attention,
                                                LOCATION_SETTINGS_STRINGS.needActivateGps,
                                                [{
                                                    text: GENERAL_STRINGS.no, style: "cancel"
                                                },
                                                    {
                                                        text: GENERAL_STRINGS.yes,
                                                        onPress: () => {
                                                            callNativeLocationSettings()
                                                            AppState.addEventListener("change", this._handleAppStateChange)
                                                        }
                                                    }], {cancelable: false}
                                            )
                                        }, 50)
                                    })
                                } else {
                                    this.setState({
                                        loading: false,
                                        latitude: null,
                                        longitude: null,
                                        error: error
                                    })
                                }
                            })
                        } else {
                            this.setState({
                                loading: false,
                                latitude: null,
                                longitude: null,
                                error: new Errors.LocationSettingsException()
                            })
                        }
                    }).catch(error => {
                        console.log(error) //IT'S NOT SUPPOSED TO FALL ON CATCH 
                    })
                } else {
                    saveHeaders(0, 0)
                    this.setState({
                        loading: false,
                        latitude: null,
                        longitude: null,
                        error: null
                    })
                }
            } else {
                this.setState({
                    loading: false,
                    latitude: null,
                    longitude: null,
                    error: new Errors.ConnectionException(),
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
        if (this.state.error instanceof Errors.LocationException) {
            return (
                <NoLocationFoundWarning tryLocation = { () => this.requestUserPermission(true) }/>
            )
        } else if (this.state.error instanceof Errors.LocationSettingsException) {
            return (
                <NoLocationWarning tryLocation = { () => this.requestUserPermission(true) }/>
            )
        } else if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { () => this.requestUserPermission() }/>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    /**
     * ...this.props send props to all children
     */
    render() {
        var propsContainer = {
            updateNoOrders: this.updateNoOrders,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            ...this.props
        }

        if (this.state.loading) {
            return (
                <Spinner visible = { true }/>
            )
        } else if (!!this.state.error) {
            return (
                this._renderError()
            )
        } else if (!!this.props.checkNumber && !!this.props.unityId) {
            return (
                <Provider store = { mainStore }>
                    <CheckStack initialRouteName = { "CheckInitialContainer" } screenProps = { propsContainer }/>
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
                    <UnityListStack initialRouteName = { "OrderHistoryListContainer" } screenProps = { propsContainer }/>
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
                    <UnityListStack initialRouteName = { "CartContainer" } screenProps = { propsContainer }/>
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
                    <UnityListStack initialRouteName = { "NewUnityDetailContainer" } screenProps = { propsContainer }/>
                </Provider>
            )
        } else if (this.props.shouldGoToOffers) {
            return (
                <Provider store = { mainStore }>
                    <OffersStack initialRouteName = { "OffersContainer" } screenProps = { propsContainer }/>
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
                    <UnityListStack initialRouteName = { "OrderTypeSelectionContainer" } screenProps = { propsContainer }/>
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
                    <UnityListStack initialRouteName = { "UnityListContainer" } screenProps = { propsContainer }/>
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
    shouldGoToOffers: false,
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