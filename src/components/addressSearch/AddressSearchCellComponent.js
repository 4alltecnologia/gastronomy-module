import React, { PureComponent } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import Images from "../../assets"
import { AddressType } from "../../utils"
import { FontFamily, FontColor, BackgroundColor, FontWeight } from "../../theme/Theme"

export default class AddressSearchCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        addressContainer: {
            flex: 1,
            flexDirection:"row",
            margin: 16
        },
        addressViewIcon: {
            alignItems: "center",
            justifyContent: "flex-start",
            marginRight: 4
        },
        addressViewInfo: {
            flex: 1
        },
        addressItem: {
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
        }
    })

    stylesText = StyleSheet.create({
        addressStreet: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.bold,
            fontStyle: "normal",
            textAlign: "left",
            color: FontColor.secondary
        },
        addressInfo: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            fontStyle: "normal",
            textAlign: "left",
            color: FontColor.secondary
        }
    })

    stylesImage = StyleSheet.create({
        pin: {
            height: 20,
            width: 20,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.addressContainer } accessibilityLabel = "viewAddressContainer">
                <View style = { this.stylesView.addressViewIcon } accessibilityLabel = "viewAddressIcon">
                    <Image style = { this.stylesImage.pin } source = { Images.icons.pinLocation } accessibilityLabel = "imageAddressIcon"/>
                </View>
                <View style = { this.stylesView.addressViewInfo } accessibilityLabel = "viewAddressInfo">
                    <TouchableOpacity style = { this.stylesView.addressItem } onPress = { () => this.props.selectAddress(this.props.address) }  accessibilityLabel = "touchableAddressItem">
                        <Text style = { this.stylesText.addressStreet }  accessibilityLabel = "textAddressStreet">{ this.props.address._parseFullAddress(AddressType.STREET_NUMBER) }</Text>
                        <Text style = { this.stylesText.addressInfo } accessibilityLabel = "textAddressInfo">{ this.props.address._parseFullAddress(AddressType.NEIGHBORHOOD_CITY_PROVINCE)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}