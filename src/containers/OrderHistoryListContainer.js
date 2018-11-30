import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import OrderHistoryListController from "../components/orderHistory/OrderHistoryListController"

export default class OrderHistoryListContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.goToUnityList = this._goToUnityList.bind(this)
    }

    _goToUnityList() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaView forceInset = {{ bottom: "never" }} style = { this.stylesView.safeArea }>
                <OrderHistoryListController navigation = { this.props.navigation }
                                            hideButtonNoOrders = { this.props.hideButtonNoOrders }
                                            updateNoOrders = { this.props.updateNoOrders ? this.props.updateNoOrders : this.goToUnityList }
                />
            </SafeAreaView>
        )
    }
}