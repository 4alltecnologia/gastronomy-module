import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { NavigationActions } from "react-navigation"
import { FontColor } from "../theme/Theme"
import CheckPaymentController from "../components/check/CheckPaymentController"

export default class CheckPaymentContainer extends PureComponent {

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
        return (
            <View style = { this.stylesView.general }>
                <CheckPaymentController unityDetails = { this.state.unityDetails }
                                        totalPrice = { this.state.totalPrice }
                                        navigateTo = { this.navigateTo }
                />
            </View>
        )
    }
}