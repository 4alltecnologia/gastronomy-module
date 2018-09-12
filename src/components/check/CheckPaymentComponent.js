import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import Images from "../../assets/index"
import { screenWidthPercentage, formatPrice } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { CHECK_PAYMENT_COMPONENT_STRINGS as CheckStrings } from "../../languages/index"
import LoginUserComponent from "../cart/LoginUserComponent"
import CheckProductListCellComponent from "./CheckProductListCellComponent"
import PaymentNowController from "../../components/payment/PaymentNowController"

export default class CheckPaymentComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100)
        },
        header: {
            height: 80,
            width: screenWidthPercentage(100),
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        headerDetails: {
            height: 60,
            marginLeft: 8,
            alignItems: "flex-start",
            justifyContent: "center"
        },
        totalPrice: {
            height: 60,
            width: screenWidthPercentage(100),
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgb(250,250,250)",
            borderWidth: 1,
            borderColor: "rgb(224,224,224)"
        },
        bottom: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            marginTop: 8
        },
        buttonPayCheck: {
            height: 64,
            width: screenWidthPercentage(100),
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
        },
    })

    stylesText = StyleSheet.create({
        unityName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: BackgroundColor.primary
        },
        checkName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "rgb(61,61,61)"
        },
        checkNumber: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "rgb(128,128,128)"
        },
        paymentMessage: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "rgb(61,61,61)",
            paddingHorizontal: 20
        },
        totalToPay: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "rgb(61,61,61)"
        },
        totalPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 18,
            color: BackgroundColor.primary
        },
        buttonPayCheck: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "white"
        }
    })

    stylesButton = StyleSheet.create({
        buttonPayCheck: {
            height: 44,
            marginHorizontal: 20,
            marginVertical: 8,
            borderRadius: 4,
            backgroundColor: BackgroundColor.primary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
        }
    })

    stylesImage = StyleSheet.create({
        unityLogo: {
            height: 60,
            width: 60,
            borderRadius: 8
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    <View style = { this.stylesView.header } accessibilityLabel = "viewHeader">
                        <CachedImage source = { !!this.props.unityLogoURL ? { uri: this.props.unityLogoURL } : Images.icons.placeholderStore } resizeMode = { "contain" } style = { this.stylesImage.unityLogo }/>
                        <View style = { this.stylesView.headerDetails } accessibilityLabel = "viewHeaderDetails">
                            <Text style = { this.stylesText.unityName } accessibilityLabel = "textUnityName">
                                { this.props.unityName }
                            </Text>
                            <Text style = { this.stylesText.checkName } accessibilityLabel = "textCheckName">
                                { this.props.checkName }
                            </Text>
                            <Text style = { this.stylesText.checkNumber } accessibilityLabel = "textCheckNumber">
                                { this.props.checkNumber }
                            </Text>
                        </View>
                    </View>
                    <View style = { this.stylesView.totalPrice } accessibilityLabel = "viewTotalPrice">
                        <Text style = { this.stylesText.totalToPay } accessibilityLabel = "textTotalToPay">
                            { CheckStrings.totalToPay }
                        </Text>
                        <Text style = { this.stylesText.totalPrice } accessibilityLabel = "textTotalPrice">
                            { formatPrice(this.props.totalPrice, true) }
                        </Text>
                    </View>
                    <View style = { this.stylesView.bottom } accessibilityLabel = "viewBottom">
                        <Text style = { this.stylesText.paymentMessage } accessibilityLabel = "textPaymentMessage">
                            { CheckStrings.selectPaymentMethod }
                        </Text>
                        <PaymentNowController selectedPaymentMethod = { this.props.selectedPaymentMethod }
                                              onLoadingCards = { this.props.onLoadingCards }
                                              onIsDeviceConnected = { this.props.onIsDeviceConnected }
                                              onCreditCardChanged = { this.props.onCreditCardChanged }
                                              onChangePaymentMethod = { this.props.onChangePaymentMethod }
                        />
                        <View style = { this.stylesView.buttonPayCheck } accessibilityLabel = "viewButtonPayCheck">
                            <TouchableWithoutFeedback style = { this.stylesButton.buttonPayCheck } onPress = { () => this.props.onPayCheck() } accessibilityLabel = "buttonPayCheck">
                                <View style = { this.stylesButton.buttonPayCheck }>
                                    <Text style = { this.stylesText.buttonPayCheck } accessibilityLabel = "textButtonPayCheck">
                                        { CheckStrings.payNow }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}