import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"

export default class PaymentMethodsListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 28,
            marginRight: 8,
            paddingVertical: 4,
            paddingHorizontal: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: 4,
            backgroundColor: "rgb(238,238,238)"
        }
    })

    stylesText = StyleSheet.create({
        cardName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            color: FontColor.secondary,
            fontSize: 14,
            textAlign: "left",
            opacity: 0.75
        }
    })

    stylesImage = StyleSheet.create({
        cardLogo: {
            height: 20,
            width: 20,
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewCellGeneral">
                <Text style = { [this.stylesText.cardName, !!this.props.card.thumb ? { marginRight: 4 } : null] } accessibilityLabel = { "textCardName" + this.props.card.name }>
                    { this.props.card.name }
                </Text>
                { !!this.props.card.thumb ?
                    <CachedImage source = {{ uri: this.props.card.thumb }}
                                resizeMode = { "contain" }
                                style = { this.stylesImage.cardLogo }
                                accessibilityLabel = "imageCardIcon"
                    />
                : null }
            </View>
        )
    }
}