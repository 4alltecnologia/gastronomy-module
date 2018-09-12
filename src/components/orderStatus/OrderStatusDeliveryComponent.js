import React, { Component } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableOpacity, SectionList } from "react-native"
import { ORDER_STATUS_DELIVERY_COMPONENT_STRINGS as OrderStrings } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"

export default class OrderStatusDeliveryComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100)
        },
        deliveryTime: {
            height: 44,
            width: screenWidthPercentage(100),
            marginBottom: 20,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white"
        },
        address: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            marginBottom: 20,
            paddingHorizontal: 20,
            paddingVertical: 8,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            backgroundColor: "white"
        }
    })

    stylesText = StyleSheet.create({
        deliveryTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        deliveryTime: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        addressTitle: {
            marginBottom: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        address: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <View style = { this.stylesView.deliveryTime }>
                    <Text style = { this.stylesText.deliveryTitle }>
                        { OrderStrings.deliveryTitle }
                    </Text>
                    <Text style = { this.stylesText.deliveryTime }>
                        { this.props.deliveryTime }
                    </Text>
                </View>
                <View style = { this.stylesView.address }>
                    <Text style = { this.stylesText.addressTitle }>
                        { OrderStrings.addressTitle }
                    </Text>
                    <Text style = { this.stylesText.address }>
                        { this.props.orderAddress }
                    </Text>
                </View>
            </View>
        )
    }
}