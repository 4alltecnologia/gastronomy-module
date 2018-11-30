import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { screenWidthPercentage, screenHeightPercentage, PriceType, formatPrice } from "../../../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../../../theme/Theme"
import Images from "../../../../assets"

export default class MultipleSelectionProductsListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        viewMain: {
            flexDirection:"row",
            backgroundColor:"white"
        },
        viewText: {
            flex: 1,
            alignSelf: "stretch"
        },
        viewButtons: {
            height: 40,
            width: 108,
            marginBottom: 8,
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        viewItemPrice: {
            flexDirection:"row"
        },
        viewItemDesc: {
            marginLeft:20,
            marginRight:20,
            marginBottom: 10,
            marginTop: 5
        },
        viewItemName: {
            flex:0.7,
            justifyContent:"center",
            alignItems:"flex-start",
            marginTop: 10,
            marginLeft: 20
        },
        viewItemPriceInfo: {
            flex:0.35,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"center",
            marginRight: 8,
            marginTop: 8
        }
    })

    stylesText = StyleSheet.create({
        textQuantity:{
            width: 20,
            marginRight: 4,
            marginLeft: 4,
            textAlign: "center"
        },
        textDesc: {
            fontSize: 12,
            fontWeight: FontWeight.medium,
            color:"rgb(128,128,128)",
            textAlign: "left"
        },
        textPriceInfo: {
            color:BackgroundColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        minus:{
            width: 24,
            height: 24,
            tintColor:BackgroundColor.primary
        },
        plus:{
            width: 24,
            height: 24,
            tintColor:BackgroundColor.primary
        }
    })

    stylesButton = StyleSheet.create({
        addRemove: {
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            item: props.item,
            itemQuantity: props.itemQuantity
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            item: !!nextProps.item ? nextProps.item : this.state.item,
            itemQuantity: !!nextProps.itemQuantity ? nextProps.itemQuantity : 0
        })
    }

    _renderDesc(description) {
        return(
            <Text numberOfLines = { 3 } style = { this.stylesText.textDesc } accessibilityLabel = "textDesc">
                { description }
            </Text>
        )
    }

    render() {
        return (
                <View style={this.stylesView.viewMain} accessibilityLabel="viewMain">
                    <View style={this.stylesView.viewText} accessibilityLabel="viewText">
                        <View style={this.stylesView.viewItemPrice} accessibilityLabel="viewItemPrice">
                            <View style={this.stylesView.viewItemName} accessibilityLabel="viewItemName">
                                <Text numberOfLines={2} accessibilityLabel="textItemName">
                                    { this.state.item.name }
                                </Text>
                            </View>
                            { this.props.priceType == PriceType.SUM_TOTAL ?
                                <View style={this.stylesView.viewItemPriceInfo} accessibilityLabel="viewItemPriceInfo">
                                    <Text style={this.stylesText.textPriceInfo} accessibilityLabel="textPriceInfo">
                                        { this.state.item.originalPrice ? "+" + formatPrice(this.state.item.originalPrice, true) : "" }
                                    </Text>
                                </View>
                                : null }
                        </View>
                        { !!this.state.item.desc ?
                            <View style = { this.stylesView.viewItemDesc } accessibilityLabel = "viewItemDesc">
                                { this._renderDesc(this.state.item.desc) }
                            </View>
                            : null }
                    </View>
                    <View style={this.stylesView.viewButtons} accessibilityLabel="viewButtons">
                        <TouchableOpacity onPress = { () => this.props.onMinus(this.state.item) } accessibilityLabel="touchableOpacityMinus">
                            <View style = { this.stylesButton.addRemove } accessibilityLabel = "viewButtonAddRemove1">
                                <Image style = { this.stylesImage.minus } source = { Images.icons.minus } accessibilityLabel="imageMinus"/>
                            </View>
                        </TouchableOpacity>
                        <Text style = { this.stylesText.textQuantity } accessibilityLabel = "textQuantity">
                            { this.state.itemQuantity }
                        </Text>
                        <TouchableOpacity onPress = { () => this.props.onPlus(this.state.item) } accessibilityLabel="touchableOpacityPlus">
                            <View style = { this.stylesButton.addRemove } accessibilityLabel = "viewButtonAddRemove1">
                                <Image style = { this.stylesImage.plus } source = { Images.icons.plus } accessibilityLabel="imagePlus"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}
