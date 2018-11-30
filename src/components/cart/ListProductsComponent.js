import React, { PureComponent } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { FontWeight } from "../../theme/Theme"
import Numeral from "numeral"
import "numeral/locales/pt-br"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS } from "../../languages/index"
import { LANGUAGE } from "../../configs"
import ProductItem from "./ProductItemComponent"

export default class ListProductsComponent extends PureComponent {

    stylesView = StyleSheet.create({
        content:{
            width:"100%",
            flexGrow:1,
            backgroundColor:"#FFFFFF"
        },
        headerReviewItems:{
            width:"100%",
            height: 30,
            backgroundColor: "rgb(242,242,242)",
            justifyContent: "center",
            alignItems: "flex-start"
        },
        contentSubTotal: {
            flexGrow: 1
        },
        separator: {
            height: 0.5,
            marginTop: 0,
            backgroundColor:"rgb(209,209,209)",
            width:"100%"
        },
        subTotal: {
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "center"
        },
        headerSubTotal:{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 15
        },
        price:{
            flex:0.5,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"center",
            marginRight:15
        }
    })

    stylesText = StyleSheet.create({
        reviewItems:{
            fontSize: 18,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
            marginLeft:15,
            marginBottom:16
        },
        subTotal:{
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)"
        },
        symbol:{
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)",
            marginRight:2
        },
        amount:{
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color:"rgb(61,61,61)"
        }
    })

    constructor(props) {
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    render() {
        return (
            <View style={this.stylesView.content} accessibilityLabel="viewContent">
                <View style={this.stylesView.headerReviewItems} accessibilityLabel="viewHeaderReviewItems">
                    <Text style={this.stylesText.reviewItems} accessibilityLabel="textReviewItems">
                        {CART_CONTAINER_STRINGS.listProductsComponent.reviewItems}
                    </Text>
                </View>
                <FlatList
                    data={this.props.products}
                    keyExtractor={(item) => item.idOnCart + ""}
                    renderItem={({item}) =>
                        <ProductItem
                            id= {item.id}
                            idOnCart= {item.idOnCart}
                            name= {item.name}
                            description= {item.desc}
                            observation={item.observation}
                            quantity= {item.quantity}
                            unityPrice= {item.price}
                            subItemsText = { item.subItemsText }
                            onPlusPressed= {this.props.onPlusPressed}
                            onMinusPressed= {this.props.onMinusPressed}
                        />
                    }
                    accessibilityLabel="=flatList1"
                />
                <View style={this.stylesView.contentSubTotal} accessibilityLabel="viewContentSubTotal">
                    <View style={this.stylesView.separator} accessibilityLabel="viewSeparator" />
                    <View style={this.stylesView.subTotal} accessibilityLabel="viewSubTotal">
                        <View style={this.stylesView.headerSubTotal} accessibilityLabel="viewHeaderSubTotal">
                            <Text style={this.stylesText.subTotal} accessibilityLabel="textSubTotal">
                                {CART_CONTAINER_STRINGS.listProductsComponent.titleSubTotal}:
                            </Text>
                        </View>
                        <View style={this.stylesView.price} accessibilityLabel="viewPrice">
                            <Text style={this.stylesText.symbol} accessibilityLabel="textSymbol">
                                {GENERAL_STRINGS.monetary}
                            </Text>
                            <Text style={this.stylesText.amount} accessibilityLabel="textAmount">
                                {Numeral(this.props.subtotal/100).format(GENERAL_STRINGS.currencyFormat)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


