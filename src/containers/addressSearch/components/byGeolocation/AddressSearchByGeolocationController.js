import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from "react-native"
import { getAddressByLatLong } from "../../../../api/ApiRequests"
import AddressSearchByGeolocationView from "./AddressSearchByGeolocationView"

export default class AddressSearchByGeolocationController extends PureComponent {

    constructor(props){
        super(props)
        
        this.state = {
            sessionToken: "",
            latitude: null,
            longitude: null,
            searchResult: null,
            refreshingList: true
        }
    }

    componentDidUpdate() {
        if (this.props.latitude != null && this.props.latitude != "denied" && this.state.latitude == null) {
            this.getLatLong(this.props.latitude, this.props.longitude)
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.latitude != null && nextProps.latitude != "denied" && this.state.latitude == null) {
            this.getLatLong(nextProps.latitude, nextProps.longitude)
        } else if (nextProps.latitude == "denied"){
            this.setState({
                latitude: null,
                longitude: null,
                searchResult: null,
                refreshingList: false
            })
        }
    }

    getLatLong(latitude, longitude) {
        if (latitude != null && latitude != "denied"){
            this.setState({
                sessionToken: this.props.sessionToken,
                latitude: latitude,
                longitude: longitude,
                refreshingList: true
            })
            this.searchResult(latitude, longitude)
        } else {
            this.setState({
                sessionToken: this.props.sessionToken,
                latitude: null,
                longitude: null,
                refreshingList: false
            })
        }
    }

    searchResult(latitude, longitude) {
        this.setState({
            searchResult: null,
            refreshingList: true
        })

        getAddressByLatLong(latitude, longitude).then(data => {
            var fullAddress = null
            var addressFormatted = null
            var street = null
            var neighborhood = null
            var city = null
            var country = null
            var uf = null
            var zip = null

            data.results.forEach(function(address){
                address.address_components.forEach(function(component){
                    if (component.types.indexOf("route") >= 0 && street == null){
                        street = component.long_name
                    } else if (component.types.indexOf("sublocality") >= 0 && neighborhood == null){
                        neighborhood = component.short_name
                    } else if (component.types.indexOf("administrative_area_level_2") >= 0 && city == null){
                        city = component.short_name
                    } else if (component.types.indexOf("administrative_area_level_1") >= 0 && uf == null){
                        uf = component.short_name
                    } else if (component.types.indexOf("postal_code") >= 0 && zip == null){
                        zip = component.long_name.split("-").join("")
                    } else if (component.types.indexOf("country") >= 0 && country == null){
                        country = component.long_name.split("-").join("")
                    }
                })
                addressFormatted = neighborhood + ", " + city + " - " + uf
                fullAddress = {
                    street: street,
                    addressFormatted: addressFormatted,
                    zip: zip,
                    neighborhood: neighborhood,
                    city: city,
                    uf: uf,
                    country: country
                }
                return
            })

            this.setState({
                searchResult: fullAddress,
                refreshingList: false
            })
        })
    }

    openDetailAddress = (fullAddress) => {
        this.props.navigation.navigate("AddressDetails", {navigation: this.props.navigation, fullAddress: fullAddress, sessionToken: this.state.sessionToken})
    }

    render() {
        return (
            <AddressSearchByGeolocationView
                stateController={this.state}
                openDetailAddress={this.openDetailAddress.bind()}/>
        )
    }
}