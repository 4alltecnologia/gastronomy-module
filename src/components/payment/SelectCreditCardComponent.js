import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ImageBackground } from "react-native"
import { BackgroundColor, FontFamily, FontWeight } from "../../theme/Theme"
import Images from "../../assets/index"
import { paymentMethod } from "../../utils"
import { SELECT_CREDIT_CARD_COMPONENT_STRINGS as SelectCreditCardStrings } from "../../languages/index"

export default class SelectCreditCardComponent extends Component {
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
        change: {
            color: BackgroundColor.primary,
            textAlign: "left",
            fontSize: 14,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium
        },
        register: {
            color: BackgroundColor.primary,
            textAlign: "left",
            fontSize: 14,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium
        },
        text: {
            color: "rgb(51,51,51)",
            textAlign: "left",
            fontSize: 13,
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
        },
        change: {
            position: "absolute",
            right: 8,
            marginLeft: 8
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            isSelected: props.selectedPaymentMethod.name == paymentMethod.CREDITCARD.name ? true : false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isSelected: nextProps.selectedPaymentMethod.name == paymentMethod.CREDITCARD.name ? true : false
        })
    }

    onChangePaymentMethod(newPaymentMethod) {
        this.props.onChangePaymentMethod(newPaymentMethod)
    }

    _renderCard() {
        return (
            <TouchableOpacity style = { this.stylesButton.general } onPress = { () => this.onChangePaymentMethod(paymentMethod.CREDITCARD) } accessibilityLabel = "touchableGeneral" >
                <Image style = { this.stylesImage.icon }
                       source = { this.props.icon }
                       accessibilityLabel = "imageIcon"
                />
                <View style = { this.stylesView.texts } accessibilityLabel = "textTexts">
                    <Text style = { this.stylesText.text } accessibilityLabel = "textBrandName">
                        { SelectCreditCardStrings.creditCard }
                    </Text>
                    <Text style = { this.stylesText.text } accessibilityLabel = "textBrandName">
                        ●●●● ●●●● ●●●● { this.props.subtitle }
                    </Text>
                </View>
                <TouchableOpacity style = { this.stylesButton.change } onPress = { this.props.onCallCardFlowTapped } accessibilityLabel = "touchableChange">
                    <Text style = { this.stylesText.change }>
                        { SelectCreditCardStrings.change }
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    _renderRegisterCard() {
        return (
            <TouchableOpacity style = { this.stylesButton.general } onPress = { this.props.onCallCardFlowTapped } accessibilityLabel = "touchableGeneral" >
                <Image style = { this.stylesImage.icon }
                       source = { this.props.icon }
                       accessibilityLabel = "imageIcon"
                />
                <View style = { this.stylesView.texts } accessibilityLabel = "textTexts">
                    <Text style = { this.stylesText.register } accessibilityLabel = "textRegister">
                        { SelectCreditCardStrings.addCreditCard }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            this.props.subtitle == "0000" ? this._renderRegisterCard() : this._renderCard()
        )
    }
}

