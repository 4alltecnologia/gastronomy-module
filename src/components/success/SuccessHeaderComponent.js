import React, { Component } from "react"
import { Image, View, Text, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { paymentMethod, IdOrderType, formatDeliveryTime } from "../../utils"
import Images from "../../assets/index"
import { SUCCESS_HEADER_COMPONENT_STRINGS as SuccessStrings, GENERAL_STRINGS } from "../../languages/index"

export default class SuccessHeaderComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        primaryTexts: {
            marginTop: 24,
            alignItems: "center",
            justifyContent: "space-around"
        },
        secondaryTexts: {
            marginTop: 16,
            alignItems: "center",
            justifyContent: "space-around"
        },
        icon: {
            marginTop: 16,
            height: 150,
            width: 150
        },
        line: {
            height: 0.5,
            width: "100%",
            marginTop: 8,
            marginBottom: 1,
            backgroundColor: "rgb(209,209,209)"
        }
    })

    stylesText = StyleSheet.create({
        thanks: {
            fontFamily: FontFamily.font,
            fontSize: 24,
            fontWeight: FontWeight.bold,
            textAlign: "center",
            color: BackgroundColor.primary
        },
        paymentSuccessful: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "center",
            color: "rgb(61,61,61)"
        },
        orderDeliveryGeneral: {
            marginHorizontal: 20,
            textAlign: "center"
        },
        orderDelivery: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "center",
            color: "rgb(61,61,61)"
        },
        orderDeliveryTime: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.bold,
            textAlign: "center",
            color: "rgb(61,61,61)"
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            width: "100%",
            height: "100%",
            margin: 0,
            tintColor: BackgroundColor.primary,
            resizeMode: "contain"
        }
    })

    constructor(props) {
        super(props)
    }

    _renderDeliveryText() {
        if (this.props.deliveryMode == IdOrderType.VOUCHER.id) {
            return (
                <Text accessibilityLabel = "textOrderDelivery">
                    <Text style = { this.stylesText.orderDelivery } >
                        { SuccessStrings.orderVoucher.firstMessage }
                    </Text>
                    <Text style = { this.stylesText.orderDeliveryTime } >
                        { SuccessStrings.orderVoucher.secondMessage }
                    </Text>
                    <Text style = { this.stylesText.orderDelivery } >
                        { SuccessStrings.orderVoucher.thirdMessage }
                    </Text>
                    <Text style = { this.stylesText.orderDeliveryTime } >
                        { SuccessStrings.orderVoucher.fourthMessage }
                    </Text>
                    <Text style = { this.stylesText.orderDelivery } >
                        { SuccessStrings.orderVoucher.fifthMessage }
                    </Text>
                </Text>
            )
        } else {
            return (
                <Text style = { this.stylesText.orderDeliveryGeneral } accessibilityLabel = "textOrderDelivery">
                    <Text style = { this.stylesText.orderDelivery }>
                        { this.props.deliveryMode == IdOrderType.DELIVERY.id ? SuccessStrings.orderDelivery :
                            this.props.deliveryMode == IdOrderType.TAKEAWAY.id ? SuccessStrings.orderTakeaway :
                                SuccessStrings.orderShortDelivery }
                    </Text>
                    <Text style = { this.stylesText.orderDeliveryTime }>
                        { this.props.deliveryMode == IdOrderType.TAKEAWAY.id ? formatDeliveryTime(this.props.takeAwayEstimatedTime, this.props.takeAwayEstimatedIdUnitTime) : formatDeliveryTime(this.props.deliveryTime, this.props.deliveryEstimatedIdUnitTime) }
                    </Text>
                </Text>
            )
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.primaryTexts } accessibilityLabel = "viewPrimaryTexts">
                    <Text style = { this.stylesText.thanks } accessibilityLabel = "textThanks">
                        { SuccessStrings.thanks }
                    </Text>
                    <Text style = { this.stylesText.paymentSuccessful } accessibilityLabel = "textPaymentSuccessful">
                        { this.props.paymentMode == paymentMethod.CREDITCARD.id || this.props.paymentMode == paymentMethod.WALLET.id ? SuccessStrings.paymentSuccessfulNow : SuccessStrings.paymentSuccessfulDeliver }
                    </Text>
                </View>
                <View style = { this.stylesView.icon } accessibilityLabel = "viewIcon">
                    <Image style = { this.stylesImage.icon } source = { Images.icons.success } accessibilityLabel = "imageIcon"/>
                </View>
                <View style = { this.stylesView.secondaryTexts } accessibilityLabel = "viewSecondaryTexts">
                    { this._renderDeliveryText() }
                </View>
                <View style = { this.stylesView.line} accessibilityLabel = "viewLine"/>
            </View>
        )
    }
}
