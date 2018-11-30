import React, { Component } from "react"
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAYMENT_ON_DELIVERY_COMPONENT_STRINGS as PaymentStrings, GENERAL_STRINGS } from "../../languages/index"
import Images from "../../assets/index"
import Numeral from "numeral"
import { LANGUAGE } from "../../configs"
import { IdOrderType, formatDeliveryTime } from "../../utils"

export default class PaymentBottomComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            width: "100%",
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        line: {
            height: 0.5,
            width: "100%",
            marginBottom: 1,
            backgroundColor: "rgb(209,209,209)"
        },
        boldLine: {
            height: 1,
            width: "100%",
            marginBottom: 1,
            backgroundColor: "rgb(209,209,209)"
        },
        deliveryItems: {
            width: "100%"
        },
        deliveryItem: {
            margin: 0,
            height: 32,
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "rgb(242,242,242)"
        }
    })

    stylesText = StyleSheet.create({
        deliveryTitle: {
            fontFamily: FontFamily.font,
            fontSize: 12,
            fontWeight: FontWeight.light,
            textAlign: "left",
            marginLeft: 20,
            color: "rgb(61,61,61)"
        },
        deliverySubtitle: {
            fontFamily: FontFamily.font,
            fontSize: 12,
            fontWeight: FontWeight.light,
            textAlign: "right",
            marginRight: 20,
            color: "rgb(128,128,128)",
            flex: 1,
            justifyContent: "flex-end"
        },
        deliveryTime: {
            fontFamily: FontFamily.font,
            fontSize: 12,
            fontWeight: FontWeight.light,
            textAlign: "left",
            color: "rgb(128,128,128)"
        },
        currencySymbol: {
            color: "rgb(51,51,51)",
            textAlign: "left",
            fontSize: 12,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium
        },
        currencySymbolTotalValue: {
            color: BackgroundColor.primary,
            textAlign: "left",
            fontSize: 12,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium
        },
        value: {
            color: "rgb(61,61,61)",
            textAlign: "left",
            fontSize: 12,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold
        },
        totalValue: {
            color: BackgroundColor.primary,
            textAlign: "left",
            fontSize: 20,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold
        }
    })

    constructor(props) {
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.deliveryItems } accessibilityLabel = "viewDeliveryItems">
                    <View style = { this.stylesView.line } accessibilityLabel = "viewLine"/>
                    <View style = { this.stylesView.deliveryItem } accessibilityLabel = "viewDeliveryItem1">
                        <Text style = { this.stylesText.deliveryTitle } accessibilityLabel = "textDeliveryTitle1">
                            { PaymentStrings.subtotal }
                        </Text>
                        <Text style = { this.stylesText.deliverySubtitle } accessibilityLabel = "textAttributed">
                            <Text style = { this.stylesText.currencySymbol } accessibilityLabel = "textCurrencySymbol">
                                { GENERAL_STRINGS.monetary } {}
                            </Text>
                            <Text style = { this.stylesText.value } accessibilityLabel = "textValue">
                                { Numeral(this.props.subtotalValue / 100).format(GENERAL_STRINGS.currencyFormat) }
                            </Text>
                        </Text>
                    </View>
                    <View style = { this.stylesView.line } accessibilityLabel = "viewLine1"/>
                    <View style = { this.stylesView.deliveryItem } accessibilityLabel = "viewDeliveryItem2">
                        <Text style = { this.stylesText.deliveryTitle } accessibilityLabel = "textDeliveryTitle2">
                            <Text accessibilityLabel = "textDeliveryTitle2">
                                { this.props.idOrderType == IdOrderType.DELIVERY.id ? PaymentStrings.delivery : PaymentStrings.takeaway }
                            </Text>
                            <Text style = { this.stylesText.deliveryTime } accessibilityLabel = "textDeliveryTime">
                                { "(" + ( this.props.idOrderType == IdOrderType.DELIVERY.id ?
                                    formatDeliveryTime(this.props.deliveryTime, this.props.deliveryEstimatedIdUnitTime) :
                                    formatDeliveryTime(this.props.takeAwayEstimatedTime, this.props.takeAwayEstimatedIdUnitTime) ) + "):"
                                }
                            </Text>
                        </Text>
                        <Text style = { this.stylesText.deliverySubtitle } accessibilityLabel = "textAttributed">
                            <Text style = { this.stylesText.currencySymbol } accessibilityLabel = "textCurrencySymbol">
                                { this.props.deliveryValue ? this.props.deliveryValue == 0 ? " " : GENERAL_STRINGS.monetary : " " } {}
                            </Text>
                            <Text style = { this.stylesText.value } accessibilityLabel = "textValue">
                                { this.props.deliveryValue ? this.props.deliveryValue == 0 ? PaymentStrings.free : Numeral(this.props.deliveryValue / 100).format(GENERAL_STRINGS.currencyFormat) : PaymentStrings.free }
                            </Text>
                        </Text>
                    </View>
                    <View style = { this.stylesView.line } accessibilityLabel = "viewLine2"/>
                    <View style = { this.stylesView.deliveryItem } accessibilityLabel = "viewDeliveryItem3">
                        <Text style = { this.stylesText.deliveryTitle } accessibilityLabel = "textDeliveryTitle3">
                            { PaymentStrings.totalValue }
                        </Text>
                        <Text style = { this.stylesText.deliverySubtitle } accessibilityLabel = "textAttributed">
                            <Text style = { this.stylesText.currencySymbolTotalValue } accessibilityLabel = "textCurrencySymbol">
                                { GENERAL_STRINGS.monetary } {}
                            </Text>
                            <Text style = { this.stylesText.totalValue } accessibilityLabel = "textValue">
                                { Numeral(this.props.totalValue / 100).format(GENERAL_STRINGS.currencyFormat) }
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style = { this.stylesView.boldLine } accessibilityLabel = "viewBoldLine2"/>
            </View>
        )
    }
}
