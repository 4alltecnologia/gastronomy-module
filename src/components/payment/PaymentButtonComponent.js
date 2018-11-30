import React, { Component } from "react"
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAYMENT_ON_DELIVERY_COMPONENT_STRINGS as PaymentStrings } from "../../languages/index"
import Images from "../../assets/index"
import Numeral from "numeral"
import LinearGradient from "react-native-linear-gradient"
import { LANGUAGE } from "../../configs"
import { screenWidthPercentage } from "../../utils"

export default class PaymentButtonComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            width: screenWidthPercentage(100),
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        }
    })

    stylesText = StyleSheet.create({
        placeOrder: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
            textAlign: "center",
            backgroundColor: "transparent"
        }
    })

    stylesButton = StyleSheet.create({
        pay: {
            height: 44,
            margin: 20,
            borderRadius: 8,
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },
        gradient: {
            height: 44,
            flex: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#eeeeee",
        }
    })

    stylesImage = StyleSheet.create({
        logo: {
            height: 24,
            width: 24,
            marginLeft: 8,
            resizeMode: "contain",
            tintColor: "white"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <TouchableOpacity disabled = { !this.props.isButtonEnabled } style = { this.stylesButton.pay } onPress = { this.props.onPaymentButtonTapped } accessibilityLabel = "touchablePay">
                    <LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesButton.gradient } accessibilityLabel = "linearGradient">
                        <Text style = { this.stylesText.placeOrder } accessibilityLabel = "textPlaceOrder">
                            { PaymentStrings.placeOrder }
                        </Text>
                        <Image style = { this.stylesImage.logo } source = { Images.icons.logo4all } accessibilityLabel = "imageLogo"/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
