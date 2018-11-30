import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import OrderTypeSelectionController from "../components/orderTypeSelection/OrderTypeSelectionController"

export default class OrderTypeSelectionContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "rgb(239,239,239)"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style = { this.stylesView.safeArea }>
                <OrderTypeSelectionController navigation = { this.props.navigation }/>
            </SafeAreaView>
        )
    }
}