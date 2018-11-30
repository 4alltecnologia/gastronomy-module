import React, { PureComponent } from "react"
import { Alert, View, AppState } from "react-native"
import { connect } from "react-redux"
import Permissions from "react-native-permissions"
import { setCurrentAddress } from "../../redux/actions"
import { deleteAddress, setDefaultAddress } from "../../api/APIRequests"
import AddressService from "../../api/services/AddressService"
import { ExternalMethods } from "../../native/Functions"
import AddressListComponent from "./AddressListComponent"
import { ADDRESS_LIST_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../languages"
import { AddressType, FirebaseActions, callNativeLocationSettings, UserAddressType } from "../../utils"
import NoInternetWarning from "../messages/NoInternetWarning"
import * as Errors from "../../errors"
import User from "../../models/User"

class AddressListController extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            addressList: [],
            addressGps: null,
            userLogged: null,
            refreshingList: true,
            error: null,
            appState: AppState.currentState
        }

        this.onRefresh = this._onRefresh.bind(this)
        this.loadAddresses = this._loadAddresses.bind(this)
        this.activateGps = this._activateGps.bind(this)
        this.addAddress = this._addAddress.bind(this)
        this.deleteAddress = this._deleteAddress.bind(this)
        this.selectAddress = this._selectAddress.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.ADDRESS_LIST.screen)

        this.props.navigation.addListener("didFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.ADDRESS_LIST.screen)
        })

        this._loadAddresses()
    }

    /**
     * Execute by pull refresh
     * @private
     */
    _onRefresh = () => {
        this.setState({
            addressList: [],
            error: null,
            refreshingList: true
        }, () => {
            this._loadAddresses()
        })
    }

    _loadAddresses() {
        ExternalMethods.getUserLogged((errorUser, resultUser) => {
            if (!!resultUser) {
                AddressService.getUserAddresses(resultUser.sessionToken).then(data => {
                    this.setState({
                        addressList: data,
                        userLogged: new User(resultUser),
                        refreshingList: false
                    }, () => {
                        AddressService.getCurrentLocationAddress().then(address => {
                            this.setState({
                                addressGps: address,
                                error: null
                            })
                        }).catch(error => {
                            this.setState({
                                addressGps: null,
                                error: error
                            })
                        })
                    })
                }).catch(error => {
                    this.setState({
                        addressList: [],
                        userLogged: new User(resultUser),
                        refreshingList: false,
                        error: error
                    })
                })
            } else {
                this.setState({
                    addressList: [],
                    refreshingList: false
                }, () => {
                    AddressService.getCurrentLocationAddress().then(address => {
                        this.setState({
                            addressGps: address,
                            refreshingList: false,
                            error: null
                        })
                    }).catch(error => {
                        this.setState({
                            addressGps: null,
                            refreshingList: false,
                            error: error
                        })
                    })
                })
            }
        })
    }

    _activateGps() {
        Permissions.check("location", {type: "whenInUse"}).then(response => {
            if (response === "authorized") {
                callNativeLocationSettings()
                AppState.addEventListener("change", this._handleAppStateChange)
            } else {
                Permissions.request("location", {type: "whenInUse"}).then(response => {
                    if (response === "authorized") {
                        this._onRefresh()
                    } else {
                        this.setState({
                            addressGps: null,
                            refreshingList: false,
                            error: new Errors.LocationSettingsException()
                        })
                    }
                })
            }
        })
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this._onRefresh()
            AppState.removeEventListener("change", this._handleAppStateChange)
        }
        this.setState({ appState: nextAppState })
    }

    _deleteAddress(address) {
        Alert.alert(
            ADDRESS_LIST_CONTAINER_STRINGS.attntion,
            ADDRESS_LIST_CONTAINER_STRINGS.wantToDeleteAddress,
            [
                {text: GENERAL_STRINGS.no, style: "cancel"},
                {text: GENERAL_STRINGS.yes, onPress: () => {
                    this.setState({
                        refreshingList: true
                    }, () => {
                        ExternalMethods.registerFirebaseEvent(FirebaseActions.ADDRESS_LIST.actions.DELETE_ADDRESS, { address: address._parseFullAddress(AddressType.STREET_NEIGHBORHOOD_CITY) })
                        deleteAddress(this.state.userLogged.sessionToken, address.id).then(data => {
                            if (!!this.props.currentAddress && address.id === this.props.currentAddress.id) {
                                AddressService.getDefaultAddress(this.state.userLogged.sessionToken).then(address => {
                                    this.props.setCurrentAddress(address)
                                }).catch(error => {})
                            }
                            this._onRefresh()
                        })
                    })
                }},
            ],
            { cancelable: false }
        )
    }

    _addAddress(userAddressType) {
        if (userAddressType !== UserAddressType.CUSTOM && !this.state.userLogged) {
            ExternalMethods.startLogin((user) => {
                ExternalMethods.registerFirebaseUser(new User(user))
                this.setState({
                    userLogged: user
                }, () => this._onRefresh() )
            })
        } else {
            if (!!this.props.cameFromModal) {
                this.props.defaultAddressSelected()
            }
            ExternalMethods.registerFirebaseEvent(FirebaseActions.ADDRESS_LIST.actions.NEW_ADDRESS, {})
            this.props.navigation.navigate("AddressSearchContainer", {
                userLogged: this.state.userLogged,
                userAddressType: userAddressType
            })
        }
    }

    _selectAddress(address, fromGps) {
        if (!!address) {
            this.setState({
                refreshingList: true
            }, () => {
                ExternalMethods.registerFirebaseEvent(FirebaseActions.ADDRESS_LIST.actions.SELECT_ADDRESS, { address: address._parseFullAddress(AddressType.STREET_NEIGHBORHOOD_CITY) })

                if (this.props.cameFromCart && fromGps) {
                    this.props.defaultAddressSelected()
                    this.props.navigation.navigate("AddressDetailsContainer", {
                        address: address,
                        userAddressType: UserAddressType.CUSTOM,
                        userLogged: this.state.userLogged,
                        goToCart: true
                    })
                } else if (!!this.state.userLogged && !!address.id) {
                    setDefaultAddress(this.state.userLogged.sessionToken, address.id).then(data => {
                        this._setCurrentAddress(address)
                    }).catch(error => {
                        this.props.defaultAddressSelected()
                    })
                } else {
                    this._setCurrentAddress(address)
                }
            })
        }
    }

    _setCurrentAddress(address) {
        address.isDefault = true
        AddressService.getAddressLatLong(address).then(updatedAddress => {
            this.props.setCurrentAddress(updatedAddress)
            this.props.defaultAddressSelected()
        }).catch(error => {
            this.props.defaultAddressSelected()
        })
    }

    render() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.onRefresh }/>
            )
        } else {
            return (
                <AddressListComponent
                    navigation = { this.props.navigation }
                    refreshingList = { this.state.refreshingList }
                    addressList = { this.state.addressList }
                    addressGps = { this.state.addressGps }
                    error = { this.state.error }
                    onRefresh = { this.onRefresh }
                    userLogged = { this.state.userLogged }
                    currentAddress = { this.props.currentAddress }
                    activateGps = { this.activateGps }
                    addAddress = { this.addAddress }
                    deleteAddress = { this.deleteAddress }
                    selectAddress = { this.selectAddress }
                />
            )
        }
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setCurrentAddress }
) ( AddressListController )