import React, { PureComponent } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontFamily, FontWeight, FontColor } from "../../theme/Theme"
import { screenWidthPercentage } from "../../utils"

export default class PaymentMethodsListHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 100,
            width: screenWidthPercentage(100),
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginBottom: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            color: FontColor.secondary,
            fontSize: 22,
            textAlign: "left",
        },
        subtitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            color: "rgb(163,163,163)",
            fontSize: 16,
            textAlign: "left",
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewSectionHeaderGeneral">
                <Text style = { this.stylesText.title } accessibilityLabel = "textSectionHeaderTitle">
                    { this.props.title }
                </Text>
                <Text style = { this.stylesText.subtitle } accessibilityLabel = "textSectionHeaderSubtitle">
                    { this.props.subtitle }
                </Text>
            </View>
        )
    }
}
