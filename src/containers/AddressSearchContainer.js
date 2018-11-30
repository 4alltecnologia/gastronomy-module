import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import AddressSearchController from "../components/addressSearch/AddressSearchController"

export default class AddressSearchContainer extends Component {

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
                <AddressSearchController navigation = { this.props.navigation } defaultAddressSelected = { this.props.defaultAddressSelected }/>
            </SafeAreaView>
        )
    }
}