import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import CartController from "../components/cart/CartController"

export default class CartContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <SafeAreaView forceInset = {{ bottom: "never" }} style = { this.stylesView.safeArea }>
                <CartController navigation = { this.props.navigation }/>
            </SafeAreaView>
        )
    }
}
