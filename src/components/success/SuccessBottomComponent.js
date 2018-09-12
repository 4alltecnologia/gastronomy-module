import React, { Component } from "react"
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { SUCCESS_BOTTOM_COMPONENT_STRINGS as SuccessStrings, GENERAL_STRINGS } from "../../languages/index"
import Images from "../../assets/index"
import Numeral from "numeral"
import { LANGUAGE } from "../../configs"

export default class SuccessBottomComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
        },
        unityInformation: {
            marginTop: 8,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 8,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        primaryTexts: {
            marginTop: 4,
            marginBottom: 4,
            alignItems: "flex-start",
            justifyContent: "flex-start"
        },
        secondaryTexts: {
            height: 48,
            marginRight: 20,
            marginLeft: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        logo: {
            height: 50,
            width: 50,
            marginRight: 8,
            borderRadius: 8
        },
        line: {
            height: 0.5,
            marginRight: 20,
            marginLeft: 20,
            backgroundColor: "rgb(209,209,209)"
        },
        button: {
            marginHorizontal: 60,
            justifyContent: "center",
            alignItems:"center",
            alignSelf: "stretch"
        }
    })

    stylesText = StyleSheet.create({
        unityName: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.bold,
            textAlign: "left",
            color: "rgb(61,61,61)"
        },
        date: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(61,61,61)"
        },
        firstText: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(61,61,61)"
        },
        secondText: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "right",
            color: "rgb(61,61,61)"
        },
        secondTextBold: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.bold,
            textAlign: "right",
            color: "rgb(61,61,61)"
        },
        secondTextCurrency: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "right",
            color: BackgroundColor.primary
        },
        secondTextValue: {
            fontFamily: FontFamily.font,
            fontSize: 30,
            fontWeight: FontWeight.bold,
            textAlign: "right",
            color: BackgroundColor.primary
        },
        goToOrder: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "center",
            color: FontColor.primary,
            backgroundColor: "transparent"
        }
    })

    stylesImage = StyleSheet.create({
        logo: {
            width: 50,
            height: 50,
            margin: 0,
            borderRadius: 8,
            alignSelf: "stretch"
        },
        logoTinted: {
            width: 50,
            height: 50,
            margin: 0,
            borderRadius: 8,
            alignSelf: "stretch",
            tintColor: BackgroundColor.primary
        }
    })

    stylesButton = StyleSheet.create({
        buttonGoToOrder: {
            borderRadius: 8,
            height: 44,
            marginVertical: 16,
            marginHorizontal: 20
        },
        buttonGoToOrderGradient: {
            backgroundColor: "#eeeeee",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            height: 44
        }
    })

    constructor(props) {
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.unityInformation } accessibilityLabel = "viewUnityInformation">
                    <View style = { this.stylesView.logo } accessibilityLabel = "viewLogo">
                        <Image style = { this.props.unityLogoURL ? this.stylesImage.logo : this.stylesImage.logoTinted }
                               source = { this.props.unityLogoURL ? { uri: this.props.unityLogoURL } : Images.icons.placeholderStore}
                               accessibilityLabel = "imageLogo"
                               />
                    </View>
                    <View style = { this.stylesView.primaryTexts } accessibilityLabel = "viewPrimaryTexts">
                        <Text style = { this.stylesText.unityName } accessibilityLabel = "textUnityName">
                            { this.props.unityName }
                        </Text>
                        <Text style = { this.stylesText.date } accessibilityLabel = "textDate">
                            { this.props.purchaseDate }
                        </Text>
                    </View>
                </View>
                { this.props.voucherCode ?
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine1"/>
                    : null }
                { this.props.voucherCode ?
                <View style = { this.stylesView.secondaryTexts } accessibilityLabel = "secondaryTexts1">
                    <Text style = { this.stylesText.firstText } accessibilityLabel = "firstText1">
                        { SuccessStrings.subtotal }
                    </Text>
                    <Text>
                        <Text style = { this.stylesText.secondText } accessibilityLabel = "secondText1">
                            { GENERAL_STRINGS.monetary } {}
                        </Text>
                        <Text style = { this.stylesText.secondTextBold} accessibilityLabel = "secondTextBold1">
                            { Numeral(this.props.subtotalValue / 100).format(GENERAL_STRINGS.currencyFormat) }
                        </Text>
                    </Text>
                </View>
                    : null }
                { this.props.voucherCode ?
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine2"/>
                    : null }
                { this.props.voucherCode ?
                <View style = { this.stylesView.secondaryTexts } accessibilityLabel = "secondaryTexts2">
                    <Text style = { this.stylesText.firstText } accessibilityLabel = "firstText2">
                        { SuccessStrings.code }
                    </Text>
                    <Text>
                        <Text style = { this.stylesText.secondText } accessibilityLabel = "secondText2">
                            - { GENERAL_STRINGS.monetary } {}
                        </Text>
                        <Text style = { this.stylesText.secondTextBold } accessibilityLabel = "secondTextBold2">
                            { Numeral(this.props.voucherValue / 100).format(GENERAL_STRINGS.currencyFormat) }
                        </Text>
                    </Text>
                </View>
                    : null }
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine3"/>
                <View style = { this.stylesView.secondaryTexts } accessibilityLabel = "secondaryTexts3">
                    <Text style = { this.stylesText.firstText } accessibilityLabel = "firstText3">
                        { SuccessStrings.total }
                    </Text>
                    <Text>
                        <Text style = { this.stylesText.secondTextCurrency } accessibilityLabel = "secondText3">
                            { GENERAL_STRINGS.monetary } {}
                        </Text>
                        <Text style = { this.stylesText.secondTextValue } accessibilityLabel = "secondTextTotal">
                            { Numeral(this.props.totalValue / 100).format(GENERAL_STRINGS.currencyFormat) }
                        </Text>
                    </Text>
                </View>
                <TouchableOpacity style = { this.stylesButton.buttonGoToOrder } onPress = { () => { this.props.onFinishTapped() } } accessibilityLabel = "touchableGoToOrder">
                    <LinearGradient colors = {[BackgroundColor.primary, BackgroundColor.gradient]} style = { this.stylesButton.buttonGoToOrderGradient } accessibilityLabel = "linearGradientGoToOrder">
                        <Text style = { this.stylesText.goToOrder } accessibilityLabel = "textGoToOrder">
                            { SuccessStrings.finish.toUpperCase() }
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
