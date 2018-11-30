import React, { PureComponent } from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import * as Animatable from "react-native-animatable"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../../theme/Theme"
import { screenWidthPercentage, AnimationTypes } from "../../../../utils"
import Images from "../../../../assets/index"
import { DISCOUNTS_CLUB_TRADESMAN_DETAILS_CONTAINER_STRINGS as DiscountsStrings } from "../../../../languages/index"

export default class DiscountsClubTradesmanDetailsName extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white"
        },
        tradesmanDetails: {
            flex: 1,
            height: 84,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            alignSelf: "stretch"
        },
        tradesmanName: {
            marginBottom: 16,
            flexDirection: "row",
            alignItems: "center",
        },
        contact: {
            height: 32,
            flexDirection: "row",
            alignItems: "center",
        }
    })

    stylesText = StyleSheet.create({
        tradesmanName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: FontColor.secondary
        },
        contact: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: BackgroundColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        tradesmanLogo: {
            height: 84,
            width: 84,
            marginRight: 20,
            borderRadius: 8
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <CachedImage source = { !!this.props.tradesmanLogo ? { uri: this.props.tradesmanLogo } : Images.icons.placeholderStore }
                             resizeMode = { "contain" }
                             style = { this.stylesImage.tradesmanLogo }
                             accessibilityLabel = "imageTradesmanLogo"
                />
                <View style = { this.stylesView.tradesmanDetails } accessibilityLabel = "viewTradesmanDetails">
                    <View style = { this.stylesView.tradesmanName }>
                        <Text style = { this.stylesText.tradesmanName } accessibilityLabel = "textTradesmanName">
                            { this.props.tradesmanName }
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress = { () => { this.props.onContactTradesman() } }>
                        <View style = { this.stylesView.contact }>
                            <Text style = { this.stylesText.contact } accessibilityLabel = "textContactTradesman">
                                { DiscountsStrings.contact }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}