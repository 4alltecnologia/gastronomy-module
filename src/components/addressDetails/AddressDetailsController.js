import React, { PureComponent } from "react"
import { Alert } from "react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import { setCurrentAddress } from "../../redux/actions"
import { addAddress, setDefaultAddress } from "../../api/APIRequests"
import AddressService from "../../api/services/AddressService"
import { ADDRESS_DETAILS_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../languages"
import AddressDetailsComponent from "./AddressDetailsComponent"
import { AddressType, FirebaseActions, UserAddressType } from "../../utils"
import { ExternalMethods } from "../../native/Functions"

class AddressDetailsController extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            userLogged: props.navigation.getParam("userLogged"),
            userAddressType: props.navigation.getParam("userAddressType"),
            address: props.navigation.getParam("address"),
            addressName: props.navigation.getParam("userAddressType") === UserAddressType.HOME ?
                            ADDRESS_DETAILS_CONTAINER_STRINGS.home : props.navigation.state.params.userAddressType === UserAddressType.WORK ?
                            ADDRESS_DETAILS_CONTAINER_STRINGS.work : "",
            addressNumber: props.navigation.getParam("address").number,
            goToCart: props.navigation.getParam("goToCart"),
            addressComplement: "",
            addressReference: "",
            addressZipCode: props.navigation.getParam("address").zip,
            errorForm: false,
            modalVisible: false,
            spinnerVisible: false
        }

        this.setModalVisible = this._setModalVisible.bind(this)
        this.confirmZipCode = this._confirmZipCode.bind(this)
        this.saveAddress = this._saveAddress.bind(this)
        this.scrollToInput = this._scrollToInput.bind(this)
        this.changeName = this._changeName.bind(this)
        this.changeNumber = this._changeNumber.bind(this)
        this.changeComplement = this._changeComplement.bind(this)
        this.changeReference = this._changeReference.bind(this)
        this.changeZipCode = this._changeZipCode.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.ADDRESS_DETAIL.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.ADDRESS_DETAIL.screen)
        })
    }

    _changeName(newName) {
        this.setState({
            addressName: newName
        })
    }

    _changeNumber(newNumber) {
        this.setState({
            addressNumber: newNumber
        })
    }

    _changeComplement(newComplement) {
        this.setState({
            addressComplement: newComplement
        })
    }

    _changeReference(newReference) {
        this.setState({
            addressReference: newReference
        })
    }

    _changeZipCode(newZipCode) {
        this.setState({
            addressZipCode: newZipCode
        })
    }

    _confirmZipCode() {
        if (!this.state.addressNumber){
            this.setState({
                errorForm: true,
                spinnerVisible: false
            })
        } else {
            this.setState({
                spinnerVisible: true
            }, () => {
                this.state.address.number = this.state.addressNumber
                this.state.address.complement = this.state.addressComplement
                this.state.address.name = !!this.state.addressName ? this.state.addressName : ADDRESS_DETAILS_CONTAINER_STRINGS.other
                this.state.address.reference = this.state.addressReference
                AddressService.getUserAddressQuery(this.state.address._parseFullAddress(AddressType.QUERY), null, null).then(addresses => {
                    if (addresses.length === 0) {
                        AddressService.getUserAddressQuery(this.state.address._parseFullAddress(AddressType.QUERY_NO_NEIGHBORHOOD), null, null).then(addressesSecondTry => {
                            if (addressesSecondTry.length === 0) {
                                Alert.alert(
                                    ADDRESS_DETAILS_CONTAINER_STRINGS.attention,
                                    ADDRESS_DETAILS_CONTAINER_STRINGS.invalidAddress,
                                    [
                                        {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                            this.setState({
                                                spinnerVisible: false
                                            })
                                        }}
                                    ],
                                    {cancelable: false}
                                )
                            } else {
                                this.state.address.placeId = addressesSecondTry[0].placeId
                                AddressService.getAddressPlaceId(this.state.address).then(addressUpdated => {
                                    this.setState({
                                        address: addressUpdated,
                                        addressZipCode: addressUpdated.zip,
                                        modalVisible: true,
                                        spinnerVisible: false
                                    })
                                })
                            }
                        })
                    } else {
                        this.state.address.placeId = addresses[0].placeId
                        AddressService.getAddressPlaceId(this.state.address).then(addressUpdated => {
                            this.setState({
                                address: addressUpdated,
                                addressZipCode: addressUpdated.zip,
                                modalVisible: true,
                                spinnerVisible: false
                            })
                        })
                    }
                }).catch(error => {
                    Alert.alert(
                        ADDRESS_DETAILS_CONTAINER_STRINGS.attention,
                        ADDRESS_DETAILS_CONTAINER_STRINGS.serverError,
                        [
                            {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                this.setState({
                                    spinnerVisible: false
                                })
                            }}
                        ],
                        {cancelable: false}
                    )
                })
            })
        }
    }

    _saveAddress() {
        this.setState({
            spinnerVisible: true
        }, () => {
            this.state.address.zip = this.state.addressZipCode
            ExternalMethods.registerFirebaseEvent(FirebaseActions.ADDRESS_DETAIL.actions.SAVE, { address: this.state.address._parseFullAddress(AddressType.STREET_NEIGHBORHOOD_CITY) })

            addAddress(this.state.userLogged.sessionToken, this.state.address._parseObjectRequest()).then(dataSave => {
                this.state.address.id = dataSave.addressId
                setDefaultAddress(this.state.userLogged.sessionToken, this.state.address.id).then(data => {
                    this.setState({
                        spinnerVisible: false,
                        modalVisible: false
                    }, () => {
                        this.state.address.isDefault = true
                        this.props.setCurrentAddress(this.state.address)
                        if (!!this.props.defaultAddressSelected){
                            this.props.defaultAddressSelected()
                        } else {
                            this.props.navigation.goBack(this.state.goToCart ? null : this.props.navigation.state.params.homeNavigationKey)
                        }
                    })
                }).catch(error => {
                    this.setState({
                        spinnerVisible: false,
                        modalVisible: false
                    }, () => {
                        if (!!this.props.defaultAddressSelected){
                            this.props.defaultAddressSelected()
                        } else {
                            this.props.navigation.goBack(this.state.goToCart ? null : this.props.navigation.state.params.homeNavigationKey)
                        }
                    })
                })
            }).catch(error => {
                this.setState({
                    spinnerVisible: false
                }, () => {
                    Alert.alert(
                        ADDRESS_DETAILS_CONTAINER_STRINGS.attention,
                        ADDRESS_DETAILS_CONTAINER_STRINGS.invalidAddress,
                        [{ text: GENERAL_STRINGS.ok, style: "cancel" }],
                        {cancelable: false}
                    )
                })
            })
        })
    }

    _setModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    _scrollToInput = (scroll, reactNode: any) => {
        setTimeout(() => {
            scroll.props.scrollToFocusedInput(reactNode, 180)
        }, 100)
    }

    render() {
        return (
            <AddressDetailsComponent
                address = { this.state.address }
                userAddressType = { this.state.userAddressType }
                addressName = { this.state.addressName }
                addressNumber = { this.state.addressNumber }
                addressComplement = { this.state.addressComplement }
                addressReference = { this.state.addressReference }
                addressZipCode = { this.state.addressZipCode }
                changeName = { this.changeName }
                changeNumber = { this.changeNumber }
                changeComplement = { this.changeComplement }
                changeReference = { this.changeReference }
                changeZipCode = { this.changeZipCode }
                errorForm = { this.state.errorForm }
                spinnerVisible = { this.state.spinnerVisible }
                modalVisible = { this.state.modalVisible }
                setModalVisible = { this.setModalVisible }
                confirmZipCode = { this.confirmZipCode }
                saveAddress = { this.saveAddress }
                scrollToInput = { this.scrollToInput }/>
        )
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setCurrentAddress }
) ( AddressDetailsController )