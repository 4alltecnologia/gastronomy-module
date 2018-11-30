import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableWithoutFeedback, RefreshControl, Alert, AppState } from "react-native"
import { CachedImage } from "react-native-cached-image"
import * as Errors from "../../errors"
import UnityListComponent from "./UnityListComponent"
import NoUnitiesWarning from "../../components/messages/NoUnitiesWarning"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import { connect } from "react-redux"
import { setUnityId, setCurrentAddress } from "../../redux/actions"
import UnityService from "../../api/services/UnityService"
import { ExternalMethods } from "../../native/Functions"
import { FirebaseActions } from "../../utils"
import CurrentAddressController from "../currentAddress/CurrentAddressController"
import AddressListModal from "../addressList/AddressListModal"

class UnityListController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props){
        super(props)
        
        this.state = {
            openUnities: [],
            closedUnities: [],
            isRefreshing: true,
            showModalAddress: false,
            error: null,
            appState: AppState.currentState
        }

        this.onRefresh = this._onRefresh.bind(this)
        this.onSelectUnity = this._onSelectUnity.bind(this)
        this.changeAddress = this._changeAddress.bind(this)
        this.closeModalAddress = this._closeModalAddress.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.UNITY_LIST.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.UNITY_LIST.screen)
        })
    }

    componentWillMount() {
        this._callUnityListAndAddress()
    }

    componentWillReceiveProps(nextProps){
        if (!(!!nextProps.currentAddress && !!this.props.currentAddress && nextProps.currentAddress.id === this.props.currentAddress.id)){
            this._onRefresh()
        }
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
        this._getUnities()
    }

    _getUnities() {
        UnityService.getUnitiesNearby(this.props.currentAddress).then(unities => {
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

    _onSelectUnity(unity) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_LIST.actions.UNTIY_DETAIL, { id: unity.id, name: unity.name })
        this.props.setUnityId(unity.id)
        this.props.navigation.navigate("NewUnityDetailContainer", { distanceKm: unity.distance })
    }

    _changeAddress() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_LIST.actions.CHANGE_ADDRESS, {})

        this.setState({
            showModalAddress: true
        })
    }

    _closeModalAddress() {
        this.setState({
            showModalAddress: false
        })
    }

    _onRefresh() {
        this.setState({
            openUnities: [],
            closedUnities: [],
            isRefreshing: true,
            error: null
        }, () => {
            this._callUnityListAndAddress()
        })
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.onRefresh }/>
            )
        } else if (this.state.error instanceof Errors.NoUnitiesException) {
            return (
                <View style = { this.stylesView.general }>
                    <CurrentAddressController navigation = { this.props.navigation }
                                              changeAddress = { this.changeAddress }/>
                    <NoUnitiesWarning tryAgain = { this.onRefresh }/>
                    <AddressListModal navigation = { this.props.navigation }
                                      defaultAddressSelected = { this.closeModalAddress }
                                      showModalAddress = { this.state.showModalAddress }
                                      cameFromCart = { false }/>
                </View>
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
                    <CurrentAddressController navigation = { this.props.navigation }
                                              changeAddress = { this.changeAddress }/>
                    <UnityListComponent address = { this.props.currentAddress }
                                        isRefreshing = { this.state.isRefreshing }
                                        openUnities = { this.state.openUnities }
                                        closedUnities = { this.state.closedUnities }
                                        onRefresh = { this.onRefresh }
                                        onSelectUnity = { this.onSelectUnity }
                    />
                    <AddressListModal navigation = { this.props.navigation }
                                      defaultAddressSelected = { this.closeModalAddress }
                                      showModalAddress = { this.state.showModalAddress }
                                      cameFromCart = { false }/>
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setUnityId, setCurrentAddress }
) ( UnityListController )