import React, { Component } from "react"
import { BackHandler } from "react-native"
import { NavigationActions } from "react-navigation"
import SuccessController from "../components/success/SuccessController"
import { ExternalMethods } from "../native/Functions"

export default class SuccessContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idOrder: props.idOrder ? props.idOrder : props.navigation.state.params.idOrder
        }

        this.onFinishTapped = this._onFinishTapped.bind(this)
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }

    handleBackButton() {
        return true
    }

    _onFinishTapped() {
        if (!!this.props.mainContainer) {
            const orderStatusAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: this.props.mainContainer
                    })
                ]
            })

            this.props.navigation.dispatch(orderStatusAction)
        } else {
            ExternalMethods.closeModule()
        }
    }

    render() {
        return (
            <SuccessController subtotalValue = { this.props.navigation.state.params.subtotalValue }
                               totalValue = { this.props.navigation.state.params.totalValue  }
                               deliveryMode = { this.props.navigation.state.params.idOrderType }
                               paymentMode = { this.props.navigation.state.params.paymentMode }
                               unityName = { this.props.navigation.state.params.unityName }
                               unityLogoURL = { this.props.navigation.state.params.unityLogoURL}
                               deliveryTime = { this.props.navigation.state.params.deliveryTime }
                               deliveryEstimatedIdUnitTime = { this.props.navigation.state.params.deliveryEstimatedIdUnitTime }
                               takeAwayEstimatedTime = { this.props.navigation.state.params.takeAwayEstimatedTime }
                               takeAwayEstimatedIdUnitTime = { this.props.navigation.state.params.takeAwayEstimatedIdUnitTime }
                               voucherValue = { 0 }
                               voucherCode = ""
                               onFinishTapped = { this.onFinishTapped }
            />
        )
    }
}