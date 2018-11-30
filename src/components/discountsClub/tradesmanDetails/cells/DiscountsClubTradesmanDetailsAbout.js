import React, { PureComponent } from "react"
import { StyleSheet, View, Text,  } from "react-native"
import * as Animatable from "react-native-animatable"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../../theme/Theme"
import { screenWidthPercentage, AnimationTypes, formatDistance } from "../../../../utils"
import Images from "../../../../assets/index"
import { DISCOUNTS_CLUB_TRADESMAN_DETAILS_CONTAINER_STRINGS as DiscountsStrings } from "../../../../languages/index"

export default class DiscountsClubTradesmanDetailsAbout extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "white"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginBottom: 16,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 22,
            color: FontColor.secondary
        },
        description: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.85
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                    { DiscountsStrings.about }
                </Text>
                <Text style = { this.stylesText.description } accessibilityLabel = "textTradesmanDescription">
                    { this.props.tradesmanDescription }
                </Text>
            </View>
        )
    }
}