import React, { PureComponent } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { FontWeight, BackgroundColor } from "../../theme/Theme"
import Numeral from "numeral"
import "numeral/locales/pt-br"
import { screenWidthPercentage } from "../../utils"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS } from "../../languages/index"
import { LANGUAGE } from "../../configs"
import Images from "../../assets"

export default class AddressCartComponent extends PureComponent {

    stylesView = StyleSheet.create({
        content:{
            width: screenWidthPercentage(100),
            flexGrow:1,
            backgroundColor:"#FFFFFF"
        },
        headerAddress:{
            width:"100%",
            height:53,
            backgroundColor:"rgb(242,242,242)",
            justifyContent:"center",
            alignItems:"flex-start"
        },
        separator:{
            height:0.5,
            backgroundColor:"rgb(209,209,209)",
            width:"100%"
        },
        contentAddress:{
            width:"100%",
            height:140,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        detailAddress:{
            flex:0.78,
            justifyContent:"center",
            alignItems:"flex-start",
            marginLeft:15
        },
        changeAddress:{
            flex: 0.22,
            justifyContent:"center",
            alignItems:"center"
        },
        changeAddressChild:{
            flex: 0.22,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        },
        contentTimeDelivery:{
            height: 40,
            flexDirection:"row"
        },
        childTimeDelivery:{
            flex:0.5,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
            marginLeft:15
        },
        contentPrice:{
            flex:0.5,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"center",
            marginRight:15
        },
        contentNewAddress:{
            width: screenWidthPercentage(100),
            height:44,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        iconArrow:{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "flex-end"
        }
    })

    stylesText = StyleSheet.create({
        headerAddress:{
            fontSize: 18,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
            marginLeft:15
        },
        nameAddress:{
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
            marginBottom:2
        },
        description:{
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(128,128,128)"
        },
        changeAddress:{
            color:BackgroundColor.primary,
            fontSize: 14,
            fontWeight: FontWeight.medium
        },
        titleTimeDelivery:{
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)"
        },
        symbolMonetary:{
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)", marginRight:2
        },
        priceDelivery:{
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color:"rgb(61,61,61)"
        },
        informAddress:{
            fontSize: 16,
            fontWeight: FontWeight.medium,
            marginBottom:2
        }
    })

    stylesImage = StyleSheet.create({
        arrowRight: {
            height: 8,
            width: 8,
            marginRight: 20,
            marginLeft: 4,
            tintColor: BackgroundColor.primary,
        }
    })

    stylesTouchable = StyleSheet.create({
        content: {
            height: 100,
            width: screenWidthPercentage(100),
            flexDirection: "row"
        }
    })

    constructor(props) {
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    renderPriceDelivery(price){
        if (price > 0){
            return (
                <View style={this.stylesView.contentPrice} accessibilityLabel="viewContentPrice">
                    <Text style={this.stylesText.symbolMonetary} accessibilityLabel="textSymbolMonetary">
                        {GENERAL_STRINGS.monetary}
                    </Text>
                    <Text style={this.stylesText.priceDelivery} accessibilityLabel="textPriceDelivery">
                        {Numeral(price/100).format(GENERAL_STRINGS.currencyFormat)}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={this.stylesView.contentPrice} accessibilityLabel="viewContentPrice">
                    <Text style={this.stylesText.priceDelivery} accessibilityLabel="textPriceDelivery">
                        {CART_CONTAINER_STRINGS.addressComponent.priceFree}
                    </Text>
                </View>
            )
        }
    }

    render() {
        if (!!this.props.address){
            let street = this.props.address.street + ", " + this.props.address.number
            street += this.props.address.complement ? " - " + this.props.address.complement : ""

            return (
                <View style={this.stylesView.content} accessibilityLabel="viewContent1">
                    <View style={this.stylesView.headerAddress} accessibilityLabel="viewHeaderAddress1">
                        <Text style={this.stylesText.headerAddress} accessibilityLabel="textHeaderAddress1">
                            {CART_CONTAINER_STRINGS.addressComponent.headerAddress}
                        </Text>
                    </View>
                    <View style={this.stylesView.separator} accessibilityLabel="viewSeparator1" />
                    <View style={this.stylesView.contentAddress} accessibilityLabel="viewContentAddress">
                        <TouchableOpacity
                            style={this.stylesTouchable.content}
                            onPress={() => {this.props.onSelectAddress()}}
                            accessibilityLabel="touchableOpacityContent1">
                            <View style={this.stylesView.detailAddress} accessibilityLabel="viewDetailAddress1">
                                <Text style={this.stylesText.nameAddress} accessibilityLabel="textNameAddress">
                                    {this.props.address.name}
                                </Text>
                                <Text style={this.stylesText.description} accessibilityLabel="textDescription1">
                                    {street}
                                </Text>
                                <Text style={this.stylesText.description} accessibilityLabel="textDescription2">
                                    {this.props.address.neighborhood}, {this.props.address.city}/{this.props.address.province}
                                </Text>
                                <Text style={this.stylesText.description} accessibilityLabel="textDescription3">
                                    {CART_CONTAINER_STRINGS.addressComponent.zip}: {this.props.address.zip}
                                </Text>
                            </View>
                            <View style={this.stylesView.changeAddress} accessibilityLabel="viewChangeAddress">
                                <View style={this.stylesView.changeAddressChild} accessibilityLabel="viewChangeAddressChild1">
                                    <Text style={this.stylesText.changeAddress} accessibilityLabel="textChangeAddress">
                                        { CART_CONTAINER_STRINGS.addressComponent.changeAddress }
                                    </Text>
                                    <Image style = { this.stylesImage.arrowRight }
                                           source = { Images.icons.arrowRight }
                                           accessibilityLabel = "imageChangeAddress2"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={this.stylesView.separator} accessibilityLabel="viewSeparator2"/>
                        <View style={this.stylesView.contentTimeDelivery} accessibilityLabel="viewContentTimeDelivery">
                            <View style={this.stylesView.childTimeDelivery} accessibilityLabel="viewChildTimeDelivery">
                                <Text style={this.stylesText.titleTimeDelivery} accessibilityLabel="textTitleTimeDelivery">
                                    {CART_CONTAINER_STRINGS.addressComponent.delivery} {}
                                </Text>
                                <Text style={this.stylesText.description} accessibilityLabel="textDescription4">
                                    {
                                        "(" + this.props.deliveryEstimatedTime + " " +
                                        ((this.props.deliveryEstimatedIdUnitTime === undefined || this.props.deliveryEstimatedIdUnitTime == 1) ? CART_CONTAINER_STRINGS.addressComponent.min :
                                            (this.props.deliveryEstimatedIdUnitTime == 2 ? CART_CONTAINER_STRINGS.addressComponent.hours : CART_CONTAINER_STRINGS.addressComponent.days)) +
                                        "):"
                                    }
                                </Text>
                            </View>
                            {
                                this.renderPriceDelivery(this.props.deliveryFee)
                            }
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={this.stylesView.content} accessibilityLabel="viewContent2">
                    <View style={this.stylesView.headerAddress} accessibilityLabel="viewHeaderAddress2">
                        <Text style={this.stylesText.headerAddress} accessibilityLabel="textHeaderAddress2">
                            {CART_CONTAINER_STRINGS.addressComponent.headerAddress}
                        </Text>
                    </View>
                    <View style={this.stylesView.separator} accessibilityLabel="viewSeparator3" />
                    <View style={this.stylesView.contentNewAddress} accessibilityLabel="viewContentNewAddress">
                        <TouchableOpacity style = { this.stylesTouchable.content }
                                          onPress = { () => { this.props.onSelectAddress() } }
                                          accessibilityLabel = "touchableOpacityContent2">
                            <View style = { this.stylesView.detailAddress } accessibilityLabel="viewDetailAddress2">
                                <Text style = { this.stylesText.informAddress } accessibilityLabel="textInformAddress">
                                    { CART_CONTAINER_STRINGS.addressComponent.informAddress }
                                </Text>
                            </View>
                            <View style = { this.stylesView.iconArrow } accessibilityLabel="viewIconArrow">
                                <View style = { this.stylesView.changeAddressChild } accessibilityLabel="viewChangeAddressChild2">
                                    <Image style = { this.stylesImage.arrowRight }
                                           source = { Images.icons.arrowRight }
                                           accessibilityLabel = "imageChangeAddress2"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}