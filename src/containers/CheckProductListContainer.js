import React, { Component } from "react"
import { StyleSheet, View, StatusBar } from "react-native"
import { FontColor } from "../theme/Theme"
import CheckProductListController from "../components/check/CheckProductListController"

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

    _setCheckName(checkName) {
        this.props.navigation.setParams({title: checkName})
    }

    _onGoToCheckPayment(totalPrice, unity) {
        this.props.navigation.navigate("CheckPaymentContainer", { totalPrice: totalPrice, unityDetails: unity})
    }

    _onGoToCatalog() {
        this.props.navigation.navigate("NewUnityDetailContainer")
    }

    render() {
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"
        return (
            <View style = { this.stylesView.general }>
                <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                <CheckProductListController setCheckName = { this.setCheckName }
                                            onGoToCheckPayment = { this.onGoToCheckPayment }
                                            onGoToCatalog = { this.onGoToCatalog }
                />
            </View>

        )
    }
}