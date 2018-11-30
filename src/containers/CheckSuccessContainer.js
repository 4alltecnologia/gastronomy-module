import React, { PureComponent } from "react"
import { BackHandler } from "react-native"
import { NavigationActions } from "react-navigation"
import CheckSuccessController from "../components/check/CheckSuccessController"
import { ExternalMethods } from "../native/Functions"
import { FirebaseActions } from "../utils"

export default class CheckSuccessContainer extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            unityDetails: !!props.navigation.state.params.unityDetails ? props.navigation.state.params.unityDetails : "",
            totalPrice: !!props.navigation.state.params.totalPrice ? props.navigation.state.params.totalPrice : 0
        }

        this.onFinishTapped = this._onFinishTapped.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.CHECK_SUCCESS.screen)
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }

    handleBackButton() {
        return true
    }

    _onFinishTapped() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CHECK_SUCCESS.actions.CLOSE, {})
        ExternalMethods.closeModule()
    }

    render() {
        return (
            <CheckSuccessController unityDetails = { this.state.unityDetails }
                                    totalPrice = { this.state.totalPrice  }
                                    onFinishTapped = { this.onFinishTapped }
            />
        )
    }
}