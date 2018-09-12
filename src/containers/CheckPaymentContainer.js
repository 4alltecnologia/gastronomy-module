import React, { Component } from "react"
import { StyleSheet, View, StatusBar } from "react-native"
import { NavigationActions } from "react-navigation"
import { FontColor } from "../theme/Theme"
import CheckPaymentController from "../components/check/CheckPaymentController"

export default class CheckPaymentContainer extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            totalPrice: !!props.navigation.state.params.totalPrice ? props.navigation.state.params.totalPrice : 0,
            unityDetails: !!props.navigation.state.params.unityDetails ? props.navigation.state.params.unityDetails : ""
        }

        this.navigateTo = this._navigateTo.bind(this)
    }

    _navigateTo(unityDetails, totalPrice) {
        const navigationAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "CheckSuccessContainer",
                    params: {
                        unityDetails: unityDetails,
                        totalPrice: totalPrice
                    }
                })
            ]
        })

        this.props.navigation.dispatch(navigationAction)
    }

    render() {
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"
        return (
            <View style = { this.stylesView.general }>
                <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                <CheckPaymentController unityDetails = { this.state.unityDetails }
                                        totalPrice = { this.state.totalPrice }
                                        navigateTo = { this.navigateTo }
                />
            </View>
        )
    }
}