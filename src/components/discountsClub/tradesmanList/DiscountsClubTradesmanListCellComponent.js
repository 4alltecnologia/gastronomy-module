import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import * as Animatable from "react-native-animatable"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../theme/Theme"
import { screenWidthPercentage, AnimationTypes, formatDistance } from "../../../utils"
import Images from "../../../assets/index"

export default class DiscountsClubTradesmanListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        },
        content: {
            flex: 1,
            width: screenWidthPercentage(100),
            height: 108,
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white"
        },
        tradesmanDetails: {
            flex: 1,
            height: 88,
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
        tradesmanDistance: {
            flexDirection: "row",
            alignItems: "center"
        }
    })

    stylesText = StyleSheet.create({
        tradesmanName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: FontColor.secondary
        },
        tradesmanDistance: {
            marginLeft: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 12,
            color: FontColor.secondary,
            opacity: 0.75
        }
    })

    stylesImage = StyleSheet.create({
        tradesmanLogo: {
            height: 84,
            width: 84,
            marginRight: 8,
            borderRadius: 8
        },
        icon: {
            height: 14,
            width: 14,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={ () => { this.props.onSelectItem(this.props.tradesman) } }>
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                        <CachedImage source = { !!this.props.tradesman.image ? { uri: this.props.tradesman.image } : Images.icons.placeholderStore }
                                     resizeMode = { "contain" }
                                     style = { this.stylesImage.tradesmanLogo }
                                     accessibilityLabel = "imageTradesmanLogo"
                        />
                        <View style = { this.stylesView.tradesmanDetails } accessibilityLabel = "viewTradesmanDetails">
                            <View style = { this.stylesView.tradesmanName } accessibilityLabel = "viewTradesmanName">
                                <Text style = { this.stylesText.tradesmanName } numberOfLines = { 1 } accessibilityLabel = { "textTradesmanName" + this.props.tradesman.name }>
                                    { this.props.tradesman.name }
                                </Text>
                            </View>
                            <View style = { this.stylesView.tradesmanDistance } accessibilityLabel = "viewTradesmanDistance">
                                <Image source = { Images.icons.pinLocation } style = { this.stylesImage.icon } accessibilityLabel = "imagePinDistance"/>
                                <Text style = { this.stylesText.tradesmanDistance } accessibilityLabel = "textDistanceDistance">
                                    { formatDistance(this.props.tradesman.distance) }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}