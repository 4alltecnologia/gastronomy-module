import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAYMENT_HEADER_COMPONENT_STRINGS as PaymentStrings } from "../../languages/index"

export default class PaymentHeaderComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        primaryTexts: {
            width: "100%",
            marginTop: 16,
            alignItems: "flex-start",
            justifyContent: "space-around"
        }
    })

    stylesText = StyleSheet.create({
        makePayment: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            marginRight: 20,
            marginLeft: 20,
            color: "rgb(61,61,61)"
        },
        choosePayment: {
            fontFamily: FontFamily.font,
            fontSize: 13,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            marginTop: 8,
            marginRight: 20,
            marginLeft: 20,
            color: "rgb(128,128,128)"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.primaryTexts } accessibilityLabel = "viewPrimaryTexts">
                    <Text style = { this.stylesText.makePayment } accessibilityLabel = "textMakePayment">
                        { PaymentStrings.makePayment }
                    </Text>
                    <Text style = { this.stylesText.choosePayment } accessibilityLabel = "textChoosePayment">
                        { PaymentStrings.choosePayment }
                    </Text>
                </View>
            </View>
        )
    }
}
