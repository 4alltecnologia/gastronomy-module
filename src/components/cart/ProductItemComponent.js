import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { FontWeight, BackgroundColor } from "../../theme/Theme"
import Images from "../../assets"
import Numeral from "numeral"
import "numeral/locales/pt-br"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS } from "../../languages/index"
import { LANGUAGE } from "../../configs"

export default class ProductItemComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1
        },
        separator:{
            height: 0.5,
            backgroundColor:"rgb(209,209,209)",
            width:"100%"
        },
        content: {
            marginTop: 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        contentQuantity:{
            width: 78,
            marginRight: 8,
            marginLeft: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            alignSelf: "stretch"
        },
        contentDetailItem: {
            marginTop: 2,
            marginRight: 8,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch"
        },
        contentDetail: {
            flex: 1,
            flexGrow: 1,
            marginTop: 2,
            marginRight: 8,
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch"
        },
        contentPrice: {
            width: 72,
            marginRight: 15,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            alignSelf: "stretch"
        },
        price: {
            marginTop: 4,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems: "center"
        },
        quantity: {
            width: 18,
            height: 26,
            marginRight: 4,
            marginLeft: 4,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
        },
        nameProduct: {
            marginTop: 2,
            marginBottom: 8,
            flex: 1,
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch"
        },
        description:{
            flex: 1,
            flexGrow: 1,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"flex-start",
            alignSelf: "stretch"
        }
    })

    stylesImage = StyleSheet.create({
        minus:{
            height: 26,
            width: 26,
            tintColor:BackgroundColor.primary
        },
        plus:{
            height: 26,
            width: 26,
            tintColor:BackgroundColor.primary
        }
    })

    stylesText = StyleSheet.create({
        quantity: {
            textAlign: "center"
        },
        nameProduct:{
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
            textAlign: "left"
        },
        description:{
            fontSize: 12,
            fontWeight: FontWeight.medium,
            color:"rgb(128,128,128)",
            textAlign:"left"
        },
        symbol:{
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
            marginRight: 2
        },
        price: {
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)"
        }
    })

    constructor(props) {
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <View style={this.stylesView.separator} accessibilityLabel="viewSeparator"/>
                <View style={this.stylesView.content} accessibilityLabel="viewContent">
                    <View style={this.stylesView.contentQuantity} accessibilityLabel="viewContentQuantity">
                        <TouchableOpacity
                            onPress={() => {this.props.onMinusPressed(this.props.id, this.props.idOnCart)}}
                            accessibilityLabel="touchableOpacity1">
                            <Image
                                style={this.stylesImage.minus}
                                source={Images.icons.minus}
                                accessibilityLabel="imageMinus"
                            />
                        </TouchableOpacity>
                        <View style={this.stylesView.quantity} accessibilityLabel="viewQuantity">
                            <Text style={this.stylesText.quantity} accessibilityLabel="textQuantity">
                                {this.props.quantity}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {this.props.onPlusPressed(this.props.id, this.props.idOnCart)}}
                            accessibilityLabel="touchableOpacity2">
                            <Image
                                style={this.stylesImage.plus}
                                source={Images.icons.plus}
                                accessibilityLabel="imagePlus"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={this.stylesView.contentDetail} accessibilityLabel="viewContentDetail">
                        <View style={this.stylesView.nameProduct} accessibilityLabel="viewNameProduct">
                            <Text style={this.stylesText.nameProduct} accessibilityLabel="textNameProduct">
                                {this.props.name}
                            </Text>
                        </View>
                        { this.props.observation || this.props.subItemsText ?
                            <View style={this.stylesView.description} accessibilityLabel="viewDescription">
                                <Text style={this.stylesText.description} accessibilityLabel="textDescription">
                                    { !!this.props.observation && !!this.props.subItemsText ? this.props.observation + "\n \n" + this.props.subItemsText :
                                        !this.props.observation && !!this.props.subItemsText ? this.props.subItemsText :
                                            !!this.props.observation && !this.props.subItemsText ?  this.props.observation : ""
                                    }
                                </Text>
                            </View>
                            : null }
                    </View>
                    <View style={this.stylesView.contentPrice} accessibilityLabel="viewContentPrice">
                        <View style={this.stylesView.price} accessibilityLabel="viewPrice">
                            <Text style={this.stylesText.symbol} accessibilityLabel="textSymbol">
                                {GENERAL_STRINGS.monetary}
                            </Text>
                            <Text style={this.stylesText.price} accessibilityLabel="textPrice">
                                {Numeral(this.props.unityPrice/100).format(GENERAL_STRINGS.currencyFormat)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}