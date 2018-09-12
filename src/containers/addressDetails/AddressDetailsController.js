import React, { PureComponent } from "react"
import { NavigationActions } from "react-navigation"
import { Alert } from "react-native"
import { getAddressByQueryAndLatLong, getAddressByPlaceId, addAddress } from "../../api/ApiRequests"
import { ADDRESS_DETAILS_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../languages/index"
import AddressDetailsView from "./AddressDetailsView"

export default class AddressDetailsController extends PureComponent {

    constructor(props){
        super(props)

        var fullAddress = props.navigation.state.params.fullAddress
        var addressNumber = ""
        if (fullAddress.street.indexOf(",") >= 0){
            addressNumber = fullAddress.street.split(",")[1].trim()
            fullAddress.street = fullAddress.street.split(",")[0].trim()
        }

        this.state = {
            sessionToken: props.navigation.state.params.sessionToken,
            fullAddress: fullAddress,
            addressNameOptions: [ ADDRESS_DETAILS_CONTAINER_STRINGS.home, ADDRESS_DETAILS_CONTAINER_STRINGS.work, ADDRESS_DETAILS_CONTAINER_STRINGS.other ],
            selectedNameType: ADDRESS_DETAILS_CONTAINER_STRINGS.home,
            customName: "",
            addressNumber: addressNumber,
            addressComplement: "",
            errorForm: false,
            modalVisible: false,
            prefixZipCode: "",
            spinnerVisible: false
        }
    }

    changeSelectedOption = (selectedOption) => {
        this.setState({
            selectedNameType: selectedOption,
            customName: ""
        })
    }

    changeNumber = (number) => {
        this.setState({
            addressNumber: number
        })
    }

    changeComplement = (complement) => {
        this.setState({
            addressComplement: complement
        })
    }

    changeCustomName = (customName) => {
        this.setState({
            customName: customName
        })
    }

    searchAddress = (queryZip, queryNeighborhood) => {
        return new Promise((resolve, reject) => {
            getAddressByQueryAndLatLong(queryZip != "" ? queryZip : queryNeighborhood, null, null).then(data => {
                if (data.predictions.length > 0 || queryZip == "") {
                    resolve(data)
                } else {
                    getAddressByQueryAndLatLong(queryNeighborhood, null, null).then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    saveAddress = (zipCode) => {
        this.setState({
            spinnerVisible: true,
            modalVisible: false
        })
        if (this.state.addressNumber == ""){
            this.setState({
                errorForm: true,
                spinnerVisible: false
            })
        } else {
            if ((this.state.fullAddress.zip == null || this.state.fullAddress.zip == "" || this.state.fullAddress.zip.length == 5) && zipCode != ""){
                this.state.fullAddress.zip = zipCode
            } else if (this.state.fullAddress.zip == null) {
                this.state.fullAddress.zip = ""
            }

            if (this.state.fullAddress.zip != null && this.state.fullAddress.zip.length == 5){
                this.setState({
                    prefixZipCode: this.state.fullAddress.zip,
                    modalVisible: true,
                    spinnerVisible: false
                })
            } else {
                var fullAddressCep = this.state.fullAddress.zip != "" ? this.state.fullAddress.street + " " + this.state.addressNumber + " " + this.state.fullAddress.zip : ""
                var fullAddressNeighborhood = this.state.fullAddress.street + " " + this.state.addressNumber + " " + this.state.fullAddress.addressFormatted

                this.searchAddress(fullAddressCep, fullAddressNeighborhood).then(data => {
                    if (data.predictions.length == 0) {
                        Alert.alert(
                            ADDRESS_DETAILS_CONTAINER_STRINGS.attention,
                            zipCode == "" ? ADDRESS_DETAILS_CONTAINER_STRINGS.invalidAddress : ADDRESS_DETAILS_CONTAINER_STRINGS.invalidZipCode,
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
                        getAddressByPlaceId(data.predictions[0].place_id).then(dataPlaceId => {
                            var addressName = (this.state.selectedNameType == ADDRESS_DETAILS_CONTAINER_STRINGS.other) ? this.state.customName : this.state.selectedNameType
                            if (addressName == "" || addressName == null) {
                                addressName = ADDRESS_DETAILS_CONTAINER_STRINGS.other
                            }

                            var street = ""
                            var neighborhood = this.state.fullAddress.neighborhood
                            var zip = this.state.fullAddress.zip
                            dataPlaceId.result.address_components.forEach(function (component) {
                                if (component.types.indexOf("route") >= 0 && street == ""){
                                    street = component.long_name
                                } else if (component.types.indexOf("sublocality") >= 0 && neighborhood == ""){
                                    neighborhood = component.short_name
                                } else if (component.types.indexOf("postal_code") >= 0 && zip == "") {
                                    zip = component.long_name
                                }
                            })

                            if (zip.length == 5) {
                                this.setState({
                                    prefixZipCode: zip,
                                    modalVisible: true,
                                    spinnerVisible: false
                                })
                                return
                            }

                            var saveAddressObject = {
                                name: addressName,
                                number: this.state.addressNumber,
                                complement: this.state.addressComplement,
                                street: street,
                                neighborhood: neighborhood,
                                city: this.state.fullAddress.city,
                                zip: zip.split("-").join(""),
                                province: this.state.fullAddress.uf,
                                country: this.state.fullAddress.country == "" ? ADDRESS_DETAILS_CONTAINER_STRINGS.defaultCountry : this.state.fullAddress.country
                            }

                            addAddress(this.state.sessionToken, saveAddressObject).then(dataSave => {
                                setTimeout(() => {
                                    this.props.navigation.goBack(null)
                                    this.props.navigation.goBack(null)
                                    this.props.navigation.state.params.navigation.state.params.onRefresh()
                                }, 1)
                            }).catch(error => {
                                Alert.alert(
                                    ADDRESS_DETAILS_CONTAINER_STRINGS.attention,
                                    zipCode == "" ? ADDRESS_DETAILS_CONTAINER_STRINGS.invalidAddress : ADDRESS_DETAILS_CONTAINER_STRINGS.invalidZipCode,
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
            }
        }
    }

    setModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    scrollToInput = (scroll, reactNode: any) => {
        setTimeout(() => {
            scroll.props.scrollToFocusedInput(reactNode, 180)
        }, 100)
    }

    render() {
        return (
            <AddressDetailsView
                navigation={this.props.navigation}
                stateController={this.state}
                setModalVisible={this.setModalVisible.bind()}
                saveAddress={this.saveAddress.bind()}
                changeCustomName={this.changeCustomName.bind()}
                changeComplement={this.changeComplement.bind()}
                changeNumber={this.changeNumber.bind()}
                scrollToInput={this.scrollToInput.bind()}
                changeSelectedOption={this.changeSelectedOption.bind()}/>
        )
    }
}