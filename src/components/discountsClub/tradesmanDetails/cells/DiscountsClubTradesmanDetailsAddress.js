import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../../theme/Theme"
import { screenWidthPercentage, openExternalLink, ExternalLink } from "../../../../utils"
import Images from "../../../../assets/index"
import { DISCOUNTS_CLUB_TRADESMAN_DETAILS_CONTAINER_STRINGS as DiscountsStrings } from "../../../../languages/index"

export default class DiscountsClubTradesmanDetailsAddress extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            backgroundColor: "white"
        },
        address: {
            marginBottom: 20,
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginVertical: 20,
            marginHorizontal: 20,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 22,
            color: FontColor.secondary
        },
        address: {
            flex: 1,
            marginLeft: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.5
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 16,
            width: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                    { DiscountsStrings.address }
                </Text>
                <TouchableWithoutFeedback onPress = { () => openExternalLink(this.props.tradesmanLatitude + "," + this.props.tradesmanLongitude, ExternalLink.MAPS, false) } accessibilityLabel = "touchableAddress">
                    <View style = { this.stylesView.address } accessibilityLabel = "viewAddress">
                        <Image style = { this.stylesImage.icon } source = { Images.icons.pinLocation } accessibilityLabel = "imagePin"/>
                        <Text style = { this.stylesText.address } accessibilityLabel = "textAddress">
                            { this.props.tradesmanAddress }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}