import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAYMENT_ON_DELIVERY_COMPONENT_STRINGS as PaymentStrings } from "../../languages/index"

export default class PayHeaderComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            width: "100%",
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        title: {
            width: "100%",
            marginTop: 24,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 8,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            alignSelf: "stretch"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(61,61,61)"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.title } accessibilityLabel = "viewTitle">
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                        { this.props.title }
                    </Text>
                </View>
            </View>
        )
    }
}
