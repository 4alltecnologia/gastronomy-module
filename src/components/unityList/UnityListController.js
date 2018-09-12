import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableWithoutFeedback, RefreshControl, Alert, AppState } from "react-native"
import { CachedImage } from "react-native-cached-image"
import AddressService from "../address/AddressService"
import { FontFamily, FontWeight, FontColor } from "../../theme/Theme"
import { getUnitiesNearby } from "../../api/ApiRequests"
import { getCurrentLocation, callNativeLocationSettings, isDeviceConnected } from "../../utils"
import { LOCATION_SETTINGS_STRINGS, GENERAL_STRINGS } from "../../languages/index"
import * as Errors from "../../errors"
import UnityListComponent from "./UnityListComponent"
import NoUnitiesWarning from "../../components/messages/NoUnitiesWarning"
import NoLocationWarning from "../../components/messages/NoLocationWarning"
import NoLocationFoundWarning from "../../components/messages/NoLocationFoundWarning"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import { connect } from "react-redux"
import { setUnityId } from "../../redux/actions"
import UnityService from "../../api/services/UnityService"

class UnityListController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props){
        super(props)
        
        this.state = {
            address: null,
            openUnities: [],
            closedUnities: [],
            isRefreshing: true,
            error: null,
            appState: AppState.currentState
        }

        this.onRefresh = this._onRefresh.bind(this)
        this.onSelectUnity = this._onSelectUnity.bind(this)
        this.tryAgain = this._tryAgain.bind(this)
    }

    componentWillMount() {
        this._callUnityListAndAddress()
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this._callUnityListAndAddress()
        }

        this.setState({
            appState: nextAppState
        })
    }

    _callUnityListAndAddress() {
        getCurrentLocation().then(position => {
            this._getUnities(position)
            this._retrieveAddress(position)
        }).catch(error => {
            if (error instanceof Errors.LocationSettingsException) {
                this.setState({
                    isRefreshing: false,
                    error: error,
                    openUnities: [],
                    closedUnities: [],
                }, () => {
                    setTimeout(() => {
                        Alert.alert(
                            LOCATION_SETTINGS_STRINGS.attention,
                            LOCATION_SETTINGS_STRINGS.needActivateGps,
                            [{text: GENERAL_STRINGS.no, style: "cancel"},
                                {
                                    text: GENERAL_STRINGS.yes, onPress: () => {
                                    callNativeLocationSettings()
                                    AppState.addEventListener("change", this._handleAppStateChange)
                                }
                                }],
                            {cancelable: false}
                        )
                    }, 50)
                })
            } else {
                this.setState({
                    isRefreshing: false,
                    error: error,
                    openUnities: [],
                    closedUnities: [],
                })
            }
        })
    }

    _getUnities(position) {
        UnityService.getUnitiesNearby(position).then(unities => {
            this.setState({
                openUnities: unities.openUnities,
                closedUnities: unities.closedUnities,
                isRefreshing: false,
                error: null,
            }, () => AppState.removeEventListener("change", this._handleAppStateChange))
        }).catch(error => {
            this.setState({
                openUnities: [],
                closedUnities: [],
                isRefreshing: false,
                error: error,
            }, () => AppState.removeEventListener("change", this._handleAppStateChange))
        })
    }

    _retrieveAddress(position) {
        AddressService.getUserAddress(position.coords.latitude, position.coords.longitude).then(address => {
            this.setState({
                address: address
            })
        }).catch(error => { })
    }

    _onSelectUnity(unity) {
        this.props.setUnityId(unity.id)
        this.props.navigation.navigate("NewUnityDetailContainer", { distanceKm: unity.distance })
    }

    _tryAgain() {
        this.setState({
            openUnities: [],
            closedUnities: [],
            isRefreshing: false,
            error: null
        }, () => setTimeout(() => {
            this._callUnityListAndAddress()
        }, 150))
    }

    _onRefresh() {
        this.setState({
            openUnities: [],
            closedUnities: [],
            isRefreshing: true
        }, () => this._callUnityListAndAddress() )
    }

    _renderError() {
        if (this.state.error instanceof Errors.LocationException) {
            return (
                <NoLocationFoundWarning tryLocation = { this.tryAgain }/>
            )
        } else if (this.state.error instanceof Errors.LocationSettingsException) {
            return (
                <NoLocationWarning tryLocation = { this.tryAgain }/>
            )
        } else if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.tryAgain }/>
            )
        } else if (this.state.error instanceof Errors.NoUnitiesException) {
            return (
                <NoUnitiesWarning tryAgain = { this.tryAgain }/>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    render() {
        if (!!this.state.error) {
            return (
                this._renderError()
            )
        } else {
            return (
                <View style = { this.stylesView.general }>
                    <UnityListComponent address = { this.state.address }
                                        isRefreshing = { this.state.isRefreshing }
                                        openUnities = { this.state.openUnities }
                                        closedUnities = { this.state.closedUnities }
                                        onRefresh = { this.onRefresh }
                                        onSelectUnity = { this.onSelectUnity }
                    />
                </View>
            )
        }
    }
}

export default connect(
    state => ({ }),
    { setUnityId }
) ( UnityListController )