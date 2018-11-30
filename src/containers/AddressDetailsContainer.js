import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import AddressDetailsController from "../components/addressDetails/AddressDetailsController"

export default class AddressDetailsContainer extends Component {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView forceInset = {{ bottom: "never" }} style = { this.stylesView.safeArea }>
                <AddressDetailsController navigation = { this.props.navigation } defaultAddressSelected = { this.props.defaultAddressSelected }/>
            </SafeAreaView>
        )
    }
}