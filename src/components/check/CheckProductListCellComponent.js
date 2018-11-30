import React, { PureComponent } from "react"
import {View, Text, StyleSheet } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, formatPrice } from "../../utils"

export default class CheckProductListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            paddingHorizontal: 20,
            paddingVertical: 16,
            flexDirection: "row",
            alignSelf: "stretch",
            backgroundColor: "white"
        },
        productQuantity: {
            width: 28,
            marginRight: 8,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            alignSelf: "stretch"
        },
        productName: {
            flex: 1,
            alignSelf: "stretch",
            alignItems: "flex-start",
            justifyContent: "flex-start"
        },
        productPrice: {
            marginLeft: 8,
            alignItems: "flex-end",
            justifyContent: "flex-start",
        }
    })

    stylesText = StyleSheet.create({
        productName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "rgb(61, 61, 61)"
        },
        productQuantity: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 16,
            color: BackgroundColor.primary
        },
        productPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "rgb(155,155,155)"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.productQuantity } accessibilityLabel = "viewGeneral">
                    <Text style = { this.stylesText.productQuantity } accessibilityLabel = "viewGeneral">
                        { this.props.productQuantity }x
                    </Text>
                </View>
                <View style = { this.stylesView.productName } accessibilityLabel = "viewGeneral">
                    <Text style = { this.stylesText.productName } accessibilityLabel = "viewGeneral">
                        { this.props.productName }
                    </Text>
                </View>
                <View style = { this.stylesView.productPrice } accessibilityLabel = "viewGeneral">
                    <Text style = { this.stylesText.productPrice } accessibilityLabel = "viewGeneral">
                        { formatPrice(this.props.productPrice, true) }
                    </Text>
                </View>
            </View>
        )
    }
}