import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import AddressListController from "../components/addressList/AddressListController"

export default class AddressListContainer extends Component {

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
                <AddressListController navigation = { this.props.navigation } defaultAddressSelected = { this.props.defaultAddressSelected }/>
            </SafeAreaView>
        )
    }
}