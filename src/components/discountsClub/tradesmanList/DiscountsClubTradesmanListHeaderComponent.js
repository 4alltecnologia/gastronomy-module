import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { screenWidthPercentage } from "../../../utils"
import { BackgroundColor, FontColor, FontWeight, FontFamily } from "../../../theme/Theme"
import Images from "../../../assets"

export default class DiscountsClubTradesmanListHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 40,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: BackgroundColor.primary
        }
    })

    stylesText = StyleSheet.create({
        previousOffersGroup: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: FontColor.primary,
            opacity: 0.5
        },
        offerGroup: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: FontColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 8,
            width: 8,
            marginHorizontal: 8,
            resizeMode: "contain",
            tintColor: FontColor.primary,
            opacity: 0.3
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneralHeader">
                <Text style = { this.stylesText.previousOffersGroup } accessibilityLabel = "textPreviousOffersGroup">
                    { this.props.previousOffersGroupName }
                </Text>
                <Image style = { this.stylesImage.icon } source = { Images.icons.arrowRight } accessibilityLabel = "imageIcon"/>
                <Text style = { this.stylesText.offerGroup } accessibilityLabel = "textOffersGroup">
                    { this.props.offersGroupName }
                </Text>
            </View>
        )
    }
}