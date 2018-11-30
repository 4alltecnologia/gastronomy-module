import React, { PureComponent } from "react"
import { TouchableOpacity, View, Text, Animated, AppState, Alert } from "react-native"
import { connect } from "react-redux"
import { setCurrentAddress } from "../../redux/actions"
import { AddressType, FirebaseActions } from "../../utils"
import { ExternalMethods } from "../../native/Functions"
import AddressSearchComponent from "./AddressSearchComponent"
import AddressService from "../../api/services/AddressService"

class AddressSearchController extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            userLogged: props.navigation.state.params.userLogged,
            userAddressType: props.navigation.state.params.userAddressType,
            results: [],
            text: "",
            refreshingList: true,
            addressGps: null,
            isAddress: true
        }

        this.changeText = this._changeText.bind(this)
        this.selectAddress = this._selectAddress.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.ADDRESS_SEARCH.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.ADDRESS_SEARCH.screen)
        })

        AddressService.getCurrentLocationAddress().then(address => {
            this.state.addressGps = address
        }).catch(error => {
            this.state.addressGps = null
        })
    }

    _changeText(newText) {
        this.setState({
            text: newText,
            results: [],
            refreshingList: true,
            isAddress: !!newText ? this.state.isAddress : true
        }, () => {
            if (!!newText.replace("-","").match(/^[0-9]+$/)) {
                if (newText.length === 9) {
                    AddressService.getUserAddressZipCode(newText).then(address => {
                        this.setState({
                            results: [address],
                            refreshingList: false,
                            isAddress: false
                        })
                    }).catch(error => {
                        this.setState({
                            results: [],
                            refreshingList: false,
                            isAddress: false
                        })
                    })
                } else if (newText.length >= 5) {
                    this.setState({
                        isAddress: false
                    })
                }
            } else if (newText.replace(/^[0-9]+$/,"").length >= 3) {
                AddressService.getUserAddressQuery(newText, !this.state.addressGps ? null : this.state.addressGps.latitude, !this.state.addressGps ? null : this.state.addressGps.longitude).then(data => {
                    this.setState({
                        results: data,
                        refreshingList: false,
                        isAddress: true
                    })
                }).catch(error => {
                    this.setState({
                        results: [],
                        refreshingList: false,
                        isAddress: true
                    })
                })
            } else {
                this.setState({
                    results: [],
                    refreshingList: false
                })
            }
        })
    }

    _selectAddress(address) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.ADDRESS_SEARCH.actions.SELECTED, { address: address._parseFullAddress(AddressType.STREET_NEIGHBORHOOD_CITY) })
        if (!!this.state.userLogged){
            this.props.navigation.navigate("AddressDetailsContainer", { address: address, userAddressType: this.state.userAddressType, userLogged: this.state.userLogged, homeNavigationKey: this.props.navigation.state.key })
        } else {
            address.id = new Date().getTime()
            AddressService.getAddressLatLong(address).then(addressUpdated => {
                this.props.setCurrentAddress(addressUpdated)
                if (!!this.props.defaultAddressSelected){
                    this.props.defaultAddressSelected()
                } else {
                    this.props.navigation.goBack()
                }
            }).catch(error => {
                if (!!this.props.defaultAddressSelected){
                    this.props.defaultAddressSelected()
                } else {
                    this.props.navigation.goBack()
                }
            })
        }
    }

    render() {
        return (
            <AddressSearchComponent
                userLogged = { this.state.userLogged }
                userAddressType = { this.state.userAddressType }
                results = { this.state.results }
                refreshingList = { this.state.refreshingList }
                text = { this.state.text }
                isAddress = { this.state.isAddress }
                changeText = { this.changeText }
                selectAddress = { this.selectAddress }/>
        )
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setCurrentAddress }
) ( AddressSearchController )