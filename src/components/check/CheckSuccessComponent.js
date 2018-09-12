import React, { PureComponent } from "react"
import { Image, View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { formatPrice, screenWidthPercentage } from "../../utils"
import Images from "../../assets/index"
import { CHECK_SUCCESS_COMPONENT_STRINGS as SuccessStrings, GENERAL_STRINGS } from "../../languages/index"

export default class CheckSuccessComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            margin: 0,
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        topMessages: {
            height: 54,
            marginTop: 24,
            marginHorizontal: 20,
            alignSelf: "stretch"
        },
        checkImage: {
            marginTop: 40,
            alignSelf: "center",
            justifyContent: "center"
        },
        unityDetails: {
            height: 60,
            marginTop: 48,
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "stretch"
        },
        unityDetailsTexts: {
            height: 60,
            marginLeft: 8,
            marginRight: 0,
            alignItems: "flex-start",
            justifyContent: "center",
            alignSelf: "stretch"
        },
        price: {
            height: 60,
            width: screenWidthPercentage(100),
            marginTop: 8,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgb(250,250,250)"
        },
        buttonFinish: {
            height: 64,
            width: screenWidthPercentage(100),
            marginTop: 8,
            marginBottom: 16,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        firstMessage: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.bold,
            textAlign: "center",
            color: BackgroundColor.primary
        },
        secondMessage: {
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.light,
            textAlign: "center",
            color: "rgb(61,61,61)"
        },
        unityName: {
            fontFamily: FontFamily.font,
            fontSize: 12,
            fontWeight: FontWeight.bold,
            textAlign: "center",
            color: BackgroundColor.primary
        },
        checkName: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.bold,
            textAlign: "center",
            color: "rgb(61,61,61)"
        },
        checkNumber: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.semibold,
            textAlign: "center",
            color: "rgb(128,128,128)"
        },
        paidValue: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            textAlign: "center",
            color: "rgb(61,61,61)"
        },
        totalPrice: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.bold,
            textAlign: "center",
            color: BackgroundColor.primary
        },
        buttonFinish: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "white"
        }
    })

    stylesImage = StyleSheet.create({
        checkImage: {
            width: 150,
            height: 150,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        unityLogo: {
            width: 60,
            height: 60,
            borderRadius: 8,
        }
    })

    stylesButton = StyleSheet.create({
        finish: {
            height: 44,
            marginHorizontal: 20,
            marginVertical: 8,
            borderRadius: 4,
            backgroundColor: BackgroundColor.primary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.topMessages } accessibilityLabel = "viewTopMessages">
                    <Text style = { this.stylesText.firstMessage } accessibilityLabel = "textFirstMessage">
                        { SuccessStrings.firstMessage }
                    </Text>
                    <Text style = { this.stylesText.secondMessage } accessibilityLabel = "textSecondMessage">
                        { SuccessStrings.secondMessage }
                    </Text>
                </View>
                <View style = { this.stylesView.checkImage } accessibilityLabel = "viewCheckImage">
                    <Image style = { this.stylesImage.checkImage } source = { Images.icons.success } accessibilityLabel = "imageCheck"/>
                </View>
                <View style = { this.stylesView.unityDetails } accessibilityLabel = "viewUnityDetails">
                    <CachedImage  style = { this.stylesImage.unityLogo }
                                  source = { !!this.props.unityLogo ? {uri: this.props.unityLogo } : Images.icons.placeholderStore }
                                  resizeMode = { "contain" }
                                  accessibilityLabel = "cachedImageUnityLogo"
                    />
                    <View style = { this.stylesView.unityDetailsTexts } accessibilityLabel = "viewUnityDetails">
                        <Text style = { this.stylesText.unityName } accessibilityLabel = "textUnityName">
                            { this.props.unityName }
                        </Text>
                        <Text style = { this.stylesText.checkName } accessibilityLabel = "textCheckName">
                            { this.props.checkName }
                        </Text>
                        <Text style = { this.stylesText.checkNumber } accessibilityLabel = "textCheckNumber">
                            { this.props.checkNumber }
                        </Text>
                    </View>
                </View>
                <View style = { this.stylesView.price } accessibilityLabel = "viewPrice">
                    <Text style = { this.stylesText.paidValue } accessibilityLabel = "textPaidValue">
                        { SuccessStrings.paidValue }
                    </Text>
                    <Text style = { this.stylesText.totalPrice } accessibilityLabel = "textTotalPrice">
                        { this.props.totalPrice }
                    </Text>
                </View>
                <View style = { this.stylesView.buttonFinish } accessibilityLabel = "viewButtonPayCheck">
                    <TouchableWithoutFeedback style = { this.stylesButton.finish } onPress = { () => this.props.onFinishTapped() } accessibilityLabel = "buttonFinish">
                        <View style = { this.stylesButton.finish } accessibilityLabel = "viewButtonFinish">
                            <Text style = { this.stylesText.buttonFinish } accessibilityLabel = "textButtonFinish">
                                { SuccessStrings.finish }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
