import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import Numeral from "numeral"
import "numeral/locales/pt-br"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS } from "../../languages/index"
import { LANGUAGE } from "../../configs"
import { screenWidthPercentage, formatPrice } from "../../utils"

export default class PayCartComponent extends PureComponent {

    stylesView = StyleSheet.create({
        content:{
            width:"100%",
            height: 140
        },
        separator:{
            height:0.5,
            backgroundColor:"rgb(209,209,209)",
            width:"100%"
        },
        contentDeliveryPrice: {
            height: 20,
            width: screenWidthPercentage(100),
            marginVertical: 8,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        contentTotal:{
            flex: 0.4,
            flexDirection:"row",
            justifyContent: "space-between"
        },
        headerLabelTotal: {
            justifyContent:"flex-end",
            alignItems:"flex-start",
            marginLeft:15,
            marginBottom:5
        },
        contentPrice: {
            justifyContent:"flex-end",
            alignItems:"flex-end",
            marginRight:15,
            marginBottom:5
        },
        subContentPrice:{
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"flex-end"
        },
        buttonChoosePayment:{
            flex: 0.6,
            justifyContent:"center"
        },
        button: {
            marginHorizontal: 20,
            height: 44,
            backgroundColor:BackgroundColor.primary,
            borderRadius:8,
            justifyContent:"center",
            alignItems:"center"
        }
    })

    stylesText = StyleSheet.create({
        deliveryText: {
            fontSize: 14,
            fontWeight: FontWeight.medium,
            fontFamily: FontFamily.font,
            color: "rgb(61, 61, 61)"
        },
        deliveryTextLight: {
            fontSize: 16,
            fontWeight: FontWeight.medium,
            fontFamily: FontFamily.font,
            color: "rgb(128, 128, 128)"
        },
        deliveryPriceText: {
            fontSize: 16,
            fontWeight: FontWeight.bold,
            fontFamily: FontFamily.font,
            color: "rgb(61, 61, 61)"
        },
        headerLabelTotal:{
            fontFamily: FontFamily.font,
            fontSize: 22,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
        },
        symbol:{
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.medium,
            color:BackgroundColor.primary
        },
        price:{
            fontFamily: FontFamily.font,
            fontSize: 26,
            fontWeight: FontWeight.bold,
            color:BackgroundColor.primary,
            justifyContent:"flex-end"
        },
        buttonPayment:{
            margin: 4,
            color:FontColor.primary,
            fontSize: 16,
            fontWeight: FontWeight.medium
        }
    })

    constructor(props) {
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    render() {
        return (
            <View style={this.stylesView.content} accessibilityLabel="viewContent">
                <View style={this.stylesView.separator} accessibilityLabel="viewSeparator"/>
                {this.props.showIndoorDeliveryPrice ?
                    <View style={this.stylesView.contentDeliveryPrice}>
                        <Text>
                            <Text style={this.stylesText.deliveryText}>
                                Retirada {}
                            </Text>
                            <Text style={this.stylesText.deliveryTextLight}>
                                (0 min):
                            </Text>
                        </Text>
                        <Text style={this.stylesText.deliveryPriceText}>
                            {formatPrice(100, true)}
                        </Text>
                    </View>
                    : null
                }
                <View style={this.stylesView.contentTotal} accessibilityLabel="viewContentTotal">
                    <View style={this.stylesView.headerLabelTotal} accessibilityLabel="viewHeaderLabelTotal">
                        <Text style={this.stylesText.headerLabelTotal} accessibilityLabel="textHeaderLabelTotal">
                            {CART_CONTAINER_STRINGS.paymentCartComponent.totalPrice}:
                        </Text>
                    </View>
                    <View style={this.stylesView.contentPrice} accessibilityLabel="viewContentPrice">
                        <View style={this.stylesView.subContentPrice} accessibilityLabel="viewSubContentPrice">
                            <Text>
                                <Text style={this.stylesText.symbol} accessibilityLabel="textSymbol">
                                    {GENERAL_STRINGS.monetary} {}
                                </Text>
                                <Text style={this.stylesText.price} accessibilityLabel="textPrice">
                                    {Numeral(this.props.total/100).format(GENERAL_STRINGS.currencyFormat)}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={this.stylesView.buttonChoosePayment} accessibilityLabel="viewButtonChoosePayment">
                    <TouchableOpacity onPress={() => {this.props.choosePaymentMethod()}} disabled = { !this.props.canPay } accessibilityLabel="touchableOpacity">
                        <View style={ [this.stylesView.button, { opacity : this.props.canPay ? 1 : 0.3 }] } accessibilityLabel="viewButton">
                            <Text style={this.stylesText.buttonPayment} accessibilityLabel="textButtonPayment">
                                {CART_CONTAINER_STRINGS.paymentCartComponent.titleButtomPayment}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


