import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import { screenWidthPercentage, screenHeightPercentage } from "../../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../languages/index"
import Numeral from "numeral"
import "numeral/locales/pt-br"
import { LANGUAGE } from "../../../configs"

export default class ModifierFooterComponent extends PureComponent {

    stylesView = StyleSheet.create({
        footer: {
            width: screenWidthPercentage(100),
            height: 64,
            backgroundColor: "rgb(242,242,242)",
            flexDirection: "row"
        },
        total: {
            flex: 0.4,
            justifyContent: "center",
            marginLeft: 20
        },
        addInCart: {
            flex: 0.6,
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
        },
        iconCartEnable: {
            backgroundColor: BackgroundColor.primary,
            marginRight: 20,
            height: 40,
            width: 152,
            alignItems:"center",
            justifyContent: "center",
            flexDirection:"row",
            borderRadius: 8
        },
        iconCartDisable: {
            backgroundColor:"gray",
            marginRight:20,
            height:40,
            width:152,
            alignItems:"center",
            justifyContent: "center",
            flexDirection:"row",
            borderRadius: 8
        }
    })

    stylesText = StyleSheet.create({
        addInCart: {
            marginRight: 5,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
            textAlign: "left",
        },
        totalValue: {
            color: "rgb(61, 61, 61)",
            fontSize: 24,
            fontWeight: FontWeight.medium,
            textAlign: "left"
        }
    })

    stylesImage = StyleSheet.create({
        addInCart: {
            width: 24,
            height: 24,
            tintColor:FontColor.primary
        }
    })

    constructor(props){
        super(props)

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    render() {
        let styleButtonNext = this.props.enableNext == true ? this.stylesView.iconCartEnable : this.stylesView.iconCartDisable

        return(
            <View style={this.stylesView.footer} accessibilityLabel="viewFooter">
                <View style={this.stylesView.total} accessibilityLabel="viewTotal">
                    <Text style = { this.stylesText.totalValue } accessibilityLabel="textTotalValue">
                        {GENERAL_STRINGS.monetary + " " + Numeral(this.props.totalValue/100).format(GENERAL_STRINGS.currencyFormat) }
                    </Text>
                </View>
                <View style={this.stylesView.addInCart} accessibilityLabel="viewAddInCart">
                    <TouchableOpacity disabled = { !this.props.enableNext } onPress = { () => this.props.onNextPressed() } accessibilityLabel="touchableOpacity3">
                        <View style={styleButtonNext} accessibilityLabel="viewIconCart">
                            <Text style={this.stylesText.addInCart} accessibilityLabel="textAddInCart">
                                { GENERAL_STRINGS.next }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
