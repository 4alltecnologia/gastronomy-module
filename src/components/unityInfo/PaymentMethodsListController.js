import React, { PureComponent } from "react"
import { StyleSheet, View, SectionList } from "react-native"
import { GENERAL_STRINGS } from "../../languages"
import { BackgroundColor } from "../../theme/Theme"
import PaymentMethodsListComponent from "./PaymentMethodsListComponent"

export default class PaymentMethodsListController extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            paddingBottom: 20,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <PaymentMethodsListComponent paymentType = { this.props.onlinePaymentType } listKey = { "1" }/>
                <PaymentMethodsListComponent paymentType = { this.props.offlinePaymentType } listKey = { "2" }/>
            </View>
        )
    }
}