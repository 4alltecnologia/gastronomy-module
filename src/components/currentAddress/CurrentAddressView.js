import React, { PureComponent } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator, Image } from "react-native"
import { AddressType, screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, BackgroundColor, FontColor } from "../../theme/Theme"
import Images from "../../assets"
import { ADDRESS_DETAILS_CONTAINER_STRINGS } from "../../languages"

export default class CurrentAddressView extends PureComponent {

    stylesView = StyleSheet.create({
        main: {
            height: 44,
            backgroundColor: BackgroundColor.primary,
            width: screenWidthPercentage(100),
            flexDirection: "column",
            justifyContent: "center",
            paddingHorizontal: 8
        },
        addressItem: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        addressImage: {
            width: 32,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        currentAddress: {
            flex: 1,
            fontSize: 14,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            color: FontColor.primary,
            textAlign: "left"
        }
    })

    stylesImage = StyleSheet.create({
        pin: {
            height: 24,
            width: 24,
            resizeMode: "contain",
            tintColor: FontColor.primary
        },
        change: {
            height: 20,
            width: 20,
            resizeMode: "contain",
            tintColor: FontColor.primary
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.currentAddress){
            return null
        } else {
            return (
                <TouchableOpacity style = { this.stylesView.main } onPress = { () => this.props.changeAddress() } accessibilityLabel = "viewMainAddress">
                    <View style = { this.stylesView.addressItem } accessibilityLabel = "viewAddressViewInfo">
                        <View style = { this.stylesView.addressImage } accessibilityLabel = "buttonChangeAddress">
                            <Image style = { this.stylesImage.pin } accessibilityLabel = "imageAddressPin"
                                   source = { this.props.currentAddress.name === ADDRESS_DETAILS_CONTAINER_STRINGS.home ? Images.icons.pinHome :
                                                this.props.currentAddress.name === ADDRESS_DETAILS_CONTAINER_STRINGS.work ? Images.icons.pinWork : Images.icons.pinLocation }/>
                        </View>
                        <Text style = { this.stylesText.currentAddress } numberOfLines = { 1 } accessibilityLabel = "textAddressInfo">
                            { this.props.currentAddress._parseFullAddress(AddressType.STREET_NUMBER) }
                        </Text>
                        <View style = { this.stylesView.addressImage } accessibilityLabel = "buttonChangeAddress">
                            <Image style = { this.stylesImage.change } source = { Images.icons.change }/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}