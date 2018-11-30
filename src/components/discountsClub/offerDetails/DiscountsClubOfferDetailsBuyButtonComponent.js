import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import PropTypes from "prop-types"
import { screenWidthPercentage } from "../../../utils"
import { BackgroundColor, FontFamily, FontColor, FontWeight } from "../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../languages"

export default class DiscountsClubOfferDetailsBuyButtonComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            backgroundColor: "transparent"
        }
    })

    stylesText = StyleSheet.create({
        buttonMessage: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
        }
    })

    stylesButton = StyleSheet.create({
        buttonMessage: {
            height: 44,
            marginVertical: 16,
            marginHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
            backgroundColor: BackgroundColor.primary,
            borderRadius: 4,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 4
        },
        buttonMessageGradient: {
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            backgroundColor: "#eeeeee",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <TouchableOpacity style = { this.stylesButton.buttonMessage } onPress = { () => this.props.onBuyTapped() } accessibilityLabel = "viewButtonBuyOffer">
                    <LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesButton.buttonMessageGradient }>
                        <Text style = { this.stylesText.buttonMessage } accessibilityLabel = "textButtonBuyOffer">
                            { GENERAL_STRINGS.buy }
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

DiscountsClubOfferDetailsBuyButtonComponent.propTypes = {
    onBuyTapped: PropTypes.func.isRequired
}