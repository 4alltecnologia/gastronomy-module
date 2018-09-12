import React, { Component } from "react"
import { Image, ImageBackground, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAYMENT_NOW_WALLET_COMPONENT_STRINGS as PaymentStrings } from "../../languages/index"
import Images from "../../assets/index"
import { paymentMethod, screenWidthPercentage } from "../../utils"
import WalletAccountBalanceComponent from "./WalletAccountBalanceComponent"

export default class PaymentNowWalletComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            width: screenWidthPercentage(100),
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        title: {
            height: 48,
            width: screenWidthPercentage(100),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        description: {
            marginTop: 8,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 16
        },
        expandable: {
            margin: 0,
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgb(242,242,242)"
        },
        line: {
            height: 1,
            width: screenWidthPercentage(100),
            marginBottom: 1,
            backgroundColor: "rgb(209,209,209)"
        },
        imageBackground: {
            height: 18,
            width: 18,
            marginRight: 8,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            marginRight: 20,
            color: "rgb(91,91,91)"
        },
        description: {
            fontFamily: FontFamily.font,
            fontSize: 13,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(128,128,128)"
        },
        descriptionBold: {
            fontFamily: FontFamily.font,
            fontSize: 13,
            fontWeight: FontWeight.bold,
            textAlign: "left",
            color: "rgb(128,128,128)"
        }
    })

    stylesButton = StyleSheet.create({
        checkSelected: {
            color: "rgb(61,61,61)"
        }
    })

    stylesImage = StyleSheet.create({
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
        },
        cardTitle: {
            resizeMode: "contain",
            height: 24,
            width: 24,
            marginRight: 8,
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            isWallet: props.selectedPaymentMethod.name == paymentMethod.WALLET.name ? true : false,
            selectedPaymentMethod: props.selectedPaymentMethod
        }

        this.onIsWallet = this._onIsWallet.bind(this)
        this.onChangePaymentMethod = this._onChangePaymentMethod.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isWallet: nextProps.selectedPaymentMethod.name == paymentMethod.WALLET.name ? true : false,
            selectedPaymentMethod: nextProps.selectedPaymentMethod
        })
    }

    _onIsWallet() {
        this.props.onPayNowTapped(paymentMethod.WALLET)
    }

    _onChangePaymentMethod(newPaymentMethod) {
        this.props.onChangePaymentMethod(newPaymentMethod)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine"/>
                <TouchableOpacity style = { this.stylesView.title } onPress = { () => this.onIsWallet() } accessibilityLabel = "touchableWallet">
                    <TouchableOpacity onPress = { () => this.onIsWallet() } accessibilityLabel = "touchableOpacity">
                        <ImageBackground style = { this.stylesView.imageBackground }
                                         imageStyle = { this.state.isWallet ? this.stylesImage.checkSelected : this.stylesImage.checkUnselected }
                                         source = { Images.icons.checkBorder }
                                         accessibilityLabel = "imageBackground">
                            <Image style = { this.stylesImage.check }
                                   source = { this.state.isWallet ? Images.icons.check : null }
                                   accessibilityLabel = "imageCheckSelected"
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                    <Image style = { this.stylesImage.cardTitle } source = { Images.icons.logo4all } accessibilityLabel = "imageCardTitle"/>
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                        { PaymentStrings.title }
                    </Text>
                </TouchableOpacity>
                { this.state.isWallet ?
                <View style = { this.stylesView.expandable } accessibilityLabel = "viewExpandable">
                    <View style = { this.stylesView.description } accessibilityLabel = "viewDescription">
                        <Text style = { this.stylesText.description } accessibilityLabel = "textDescription">
                            <Text style = { this.stylesText.description } accessibilityLabel = "textDescription1">
                                { PaymentStrings.description.first }
                            </Text>
                            <Text style = { this.stylesText.descriptionBold } accessibilityLabel = "textDescriptionBold1">
                                { PaymentStrings.description.second }
                            </Text>
                            <Text style = { this.stylesText.description } accessibilityLabel = "textDescription2">
                                { PaymentStrings.description.third }
                            </Text>
                        </Text>
                    </View>
                    <WalletAccountBalanceComponent subtitle = { this.props.accountBalance }
                                                   icon = { Images.icons.logo4all }
                                                   onChangePaymentMethod = { this.onChangePaymentMethod }
                                                   selectedPaymentMethod = { this.state.selectedPaymentMethod }
                    />
                </View> : null }
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine"/>
            </View>
        )
    }
}
