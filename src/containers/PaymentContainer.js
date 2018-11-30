import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import PaymentController from "../components/payment/PaymentController"

export default class PaymentContainer extends PureComponent {

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
                <PaymentController cart = { this.props.navigation.state.params.cart }
                                   idOrderType = { this.props.navigation.state.params.idOrderType }
                                   navigation = { this.props.navigation }
                />
            </SafeAreaView>
        )
    }
}