import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from "react-native"
import { BackgroundColor, FontFamily } from "../../theme/Theme"
import Images from "../../assets/index"
import { paymentMethod } from "../../utils"

export default class SelectGenericCardComponent extends Component {

    stylesText = StyleSheet.create({
        brandName: {
            marginLeft: 8,
            color: "rgb(91,91,91)",
            textAlign: "left",
            fontSize: 16,
            backgroundColor: "transparent",
            fontFamily: FontFamily.font
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
    }

    render() {
         return (
            <TouchableOpacity style = { this.stylesButton.general } onPress = { () => this.props.onShow(true) } accessibilityLabel = "touchableGeneral" >
                <Image style = { this.stylesImage.icon }
                       source = { this.props.card.icon ? { uri: this.props.card.icon } : this.props.card.type.name == paymentMethod.DEBIT.name ? Images.icons.creditCard : Images.icons.foodTicket }
                       accessibilityLabel = "imageIcon"
                />
                <Text style = { this.stylesText.brandName } accessibilityLabel = "textBrandName">
                    { this.props.card.name }
                </Text>
                <Image style = { this.stylesImage.arrow } source = { Images.icons.arrowDown } accessibilityLabel = "imageArrow"/>
            </TouchableOpacity>
        )
    }
}

