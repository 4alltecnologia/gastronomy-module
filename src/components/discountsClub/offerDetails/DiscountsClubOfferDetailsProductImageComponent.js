import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Animated, Platform } from "react-native"
import { CachedImage } from "react-native-cached-image"
import LinearGradient from "react-native-linear-gradient"
import { screenWidthPercentage, getNavigationHeaderHeight } from "../../../utils"
import { BackgroundColor, FontColor, FontWeight, FontFamily } from "../../../theme/Theme"

const HEADER_BASE_HEIGHT = 300
const HEADER_MIN_HEIGHT = getNavigationHeaderHeight(true)
const HEADER_MAX_HEIGHT = 600

export default class DiscountsClubOfferDetailsProductImageComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            position: "absolute",
            top: Platform.OS === "ios" ? getNavigationHeaderHeight(true) * -1 : 0,
            right: 0,
            left: 0,
            height: 300,
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white"
        },
        gradientContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 10
        },
        gradient: {
            flex: 1
        }
    })

    stylesText = StyleSheet.create({
        offerName: {
            fontSize: 22,
            bottom: 20,
            right: 20,
            left: 20,
            position: "absolute",
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            color: FontColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        offerImage: {
            flex: 1,
            width: screenWidthPercentage(100)
        }
    })

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.navigation.setParams({ animatedValue: this.props.scrollY.interpolate({
                inputRange: [-HEADER_BASE_HEIGHT, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT - 20, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [0, 0, 1],
                extrapolate: "clamp"
            })
        })
    }

    render() {

        const numberOfLines = this.props.scrollY.interpolate({
            inputRange: [-HEADER_BASE_HEIGHT, 0, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [3.2, 3.2, 1],
            extrapolate: "clamp"
        })

        const zIndex = this.props.scrollY.interpolate({
            inputRange: [-HEADER_BASE_HEIGHT, 0, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [-10, -10, 10],
            extrapolate: "clamp"
        })

        const headerHeight = this.props.scrollY.interpolate({
            inputRange: [-HEADER_BASE_HEIGHT, 0, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_BASE_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: "clamp"
        })

        const opacity = this.props.scrollY.interpolate({
            inputRange: [-HEADER_BASE_HEIGHT, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT - 20, HEADER_BASE_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [1, 1, 0],
            extrapolate: "clamp"
        })

        return (
            <Animated.View style = {[ this.stylesView.general, { zIndex: zIndex, height: headerHeight } ]} accessibilityLabel = "viewGeneral">
                <Animated.View style = {[ this.stylesImage.offerImage, { height: headerHeight } ]} accessibilityLabel = "viewOfferImage">
                    <CachedImage source = {{ uri: this.props.product.image }}
                                 resizeMode = { "cover" }
                                 style = { this.stylesImage.offerImage }
                                 accessibilityLabel = "imageOffer"
                    />
                    <View style = { this.stylesView.gradientContainer } accessibilityLabel = "viewGradientContainer">
                        <LinearGradient colors = {["rgba(15,15,15,0.25)", "transparent", "transparent", "rgba(15,15,15,0.75)" ]} locations = {[0.1,0.2,0.7,1]} style = { this.stylesView.gradient }/>
                        <Animated.Text style = {[ this.stylesText.offerName, { opacity: opacity } ]}
                                       numberOfLines = { Math.floor(numberOfLines) }
                                       accessibilityLabel = "textOfferName"
                        >
                            { this.props.product.name }
                        </Animated.Text>
                    </View>
                </Animated.View>
            </Animated.View>
        )
    }
}