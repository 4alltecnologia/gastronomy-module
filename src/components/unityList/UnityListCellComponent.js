import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, AnimationTypes } from "../../utils"
import Images from "../../assets/index"
import * as Animatable from "react-native-animatable"

export default class UnityListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            height: 108,
            paddingHorizontal: 20,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white"
        },
        unityDetails: {
            flex: 1,
            height: 92,
            marginLeft: 8,
            paddingVertical: 8,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            alignSelf: "stretch"
        },
        unityName: {
            flexDirection: "row",
            alignItems: "center",
        },
        unityDistance: {
            flexDirection: "row",
            alignItems: "center"
        },
        unityDeliveryTime: {
            flexDirection: "row",
            alignItems: "center"
        },
        arrow: {
            width: 8,
            marginLeft: 8,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        unityName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 16,
            color: FontColor.secondary
        },
        unityDistance: {
            marginLeft: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.5
        },
        unityDeliveryTime: {
            marginLeft: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.5
        }
    })

    stylesImage = StyleSheet.create({
        unityLogo: {
            height: 92,
            width: 92,
            borderRadius: 8
        },
        arrow: {
            height: 8,
            width: 8,
            tintColor: BackgroundColor.primary
        },
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
            <TouchableWithoutFeedback onPress={ () => { this.props.onSelectUnity(this.props.unity) } }>
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    <CachedImage source = { !!this.props.unity.logo ? { uri: this.props.unity.logo } : Images.icons.placeholderStore }
                                 resizeMode = { "contain" }
                                 style = { this.stylesImage.unityLogo }
                                 accessibilityLabel = "imageUnityLogo"
                    />
                    <View style = { this.stylesView.unityDetails } accessibilityLabel = "viewUnityDetails">
                        <View style = { this.stylesView.unityName } accessibilityLabel = "viewUnityName">
                            <Text style = { this.stylesText.unityName } numberOfLines = { 1 } accessibilityLabel = { "textUnityName" + this.props.unity.name }>
                                { this.props.unity.name }
                            </Text>
                        </View>
                        <View style = { this.stylesView.unityDistance } accessibilityLabel = "viewUnityDistance">
                            <Image source = { Images.icons.pinLocation } style = { this.stylesImage.icon } accessibilityLabel = "imagePinDistance"/>
                            <Text style = { this.stylesText.unityDistance } accessibilityLabel = "textUnityDistance">
                                { this.props.unity.distance }
                            </Text>
                        </View>
                        <View style = { this.stylesView.unityDeliveryTime } accessibilityLabel = "viewUnityDeliveryTime">
                            <Image source = { Images.icons.clock } style = { this.stylesImage.icon } accessibilityLabel = "image"/>
                            <Text style = { this.stylesText.unityDeliveryTime } accessibilityLabel = "textUnityDeliveryTime">
                                { this.props.unity.deliveryTime }
                            </Text>
                        </View>
                    </View>
                    <View style = { this.stylesView.arrow } accessibilityLabel = "viewArrow">
                        <Image source = { Images.icons.arrowRight } style = { this.stylesImage.arrow } accessibilityLabel = "imageArrow"/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
