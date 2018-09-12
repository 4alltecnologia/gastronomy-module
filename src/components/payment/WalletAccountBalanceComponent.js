import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ImageBackground } from "react-native"
import { BackgroundColor, FontFamily, FontWeight } from "../../theme/Theme"
import { WALLET_ACCOUNT_BALANCE_COMPONENT_STRINGS as WalletStrings, GENERAL_STRINGS } from "../../languages/index"
import Images from "../../assets/index"
import Numeral from "numeral"
import { paymentMethod } from "../../utils"
import { LANGUAGE } from "../../configs"

export default class WalletAccountBalanceComponent extends Component {
    stylesView = StyleSheet.create({
        imageBackground: {
            height: 18,
            width: 18,
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        texts: {
            marginLeft: 8
        }
    })

    stylesText = StyleSheet.create({
        currencySymbol: {
            color: "rgb(51,51,51)",
            textAlign: "left",
            fontSize: 14,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium
        },
        value: {
            color: "rgb(51,51,51)",
            textAlign: "left",
            fontSize: 16,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold
        },
        walletBalance: {
            color: "rgb(51,51,51)",
            textAlign: "left",
            fontSize: 14,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            marginLeft: 8,
            height: 24,
            width: 24,
            resizeMode: "contain"
        },
        arrow: {
            position: "absolute",
            right: 8,
            marginLeft: 8,
            height: 12,
            width: 12,
            resizeMode: "contain"
        },
        check: {
            resizeMode: "contain",
            height: 12,
            width: 12,
            tintColor: BackgroundColor.primary
        },
        checkSelected: {
            resizeMode: "contain",
            height: 18,
            width: 18,
            tintColor: BackgroundColor.primary,
            opacity: 0.4
        },
        checkUnselected: {
            resizeMode: "contain",
            height: 18,
            width: 18,
            tintColor: "rgb(128,128,128)"
        }
    })

    stylesButton = StyleSheet.create({
        general: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "stretch",
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 16,
            height: 50,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "rgb(209,209,209)",
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            isSelected: props.selectedPaymentMethod.name == paymentMethod.WALLET.name ? true : false
        }

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isSelected: nextProps.selectedPaymentMethod.name == paymentMethod.WALLET.name ? true : false
        })
    }

    onChangePaymentMethod(newPaymentMethod) {
        this.props.onChangePaymentMethod(newPaymentMethod)
    }

    render() {
        return (
            <TouchableOpacity style = { this.stylesButton.general } onPress = { () => this.onChangePaymentMethod(paymentMethod.WALLET) } accessibilityLabel = "viewGeneral" >
                <Image style = { this.stylesImage.icon }
                       source = { this.props.icon }
                       accessibilityLabel = "imageIcon"
                />
                <View style = { this.stylesView.texts } accessibilityLabel = "viewTexts">
                    <Text style = { this.stylesText.walletBalance } accessibilityLabel = "textBrandName">
                        { WalletStrings.walletBalance }
                    </Text>
                    <Text accessibilityLabel = "textAttributed">
                        <Text style = { this.stylesText.currencySymbol } accessibilityLabel = "textCurrencySymbol">
                            { GENERAL_STRINGS.monetary } {}
                        </Text>
                        <Text style = { this.stylesText.value } accessibilityLabel = "textValue">
                            { Numeral(this.props.subtitle / 100).format(GENERAL_STRINGS.currencyFormat) }
                        </Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

