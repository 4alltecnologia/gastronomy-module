import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { FontColor } from "../theme/Theme"
import CheckProductListController from "../components/check/CheckProductListController"
import { ExternalMethods } from "../native/Functions"
import { FirebaseActions } from "../utils"

export default class CheckProductListContainer extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.setCheckName = this._setCheckName.bind(this)
        this.onGoToCheckPayment = this._onGoToCheckPayment.bind(this)
        this.onGoToCatalog = this._onGoToCatalog.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.CHECK_CART.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.CHECK_CART.screen)
        })
    }

    _setCheckName(checkName) {
        this.props.navigation.setParams({title: checkName})
    }

    _onGoToCheckPayment(totalPrice, unity) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CHECK_CART.actions.PAY, { })
        this.props.navigation.navigate("CheckPaymentContainer", { totalPrice: totalPrice, unityDetails: unity})
    }

    _onGoToCatalog() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CHECK_CART.actions.CATALOG, { })
        this.props.navigation.navigate("NewUnityDetailContainer")
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <CheckProductListController setCheckName = { this.setCheckName }
                                            onGoToCheckPayment = { this.onGoToCheckPayment }
                                            onGoToCatalog = { this.onGoToCatalog }
                />
            </View>

        )
    }
}