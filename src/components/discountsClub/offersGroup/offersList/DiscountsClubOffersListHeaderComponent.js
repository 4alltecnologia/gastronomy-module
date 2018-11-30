import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Animated } from "react-native"
import { screenWidthPercentage } from "../../../../utils"
import { BackgroundColor, FontColor, FontWeight, FontFamily } from "../../../../theme/Theme"

const HEADER_BASE_HEIGHT = 64
const HEADER_MIN_HEIGHT = 40
const FONT_BASE_SIZE = 20
const FONT_MIN_SIZE = 14
const SHADOW_BASE_OPACITY = 0.5
const SHADOW_MIN_OPACITY = 0.0
const ELEVATION_BASE = 4
const ELEVATION_MIN = 0

export default class DiscountsClubOffersListHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            height: 64,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8
        },
        content: {
            flex: 1,
            width: screenWidthPercentage(100),
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            color: FontColor.secondary
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        const headerHeight = this.props.scrollY.interpolate({
            inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
            outputRange: [HEADER_BASE_HEIGHT, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: "clamp"
        })

        const fontSize = this.props.scrollY.interpolate({
            inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
            outputRange: [FONT_BASE_SIZE, FONT_MIN_SIZE, FONT_MIN_SIZE],
            extrapolate: "clamp"
        })

        const shadowOpacity = this.props.scrollY.interpolate({
            inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
            outputRange: [SHADOW_MIN_OPACITY, SHADOW_BASE_OPACITY, SHADOW_BASE_OPACITY],
            extrapolate: "clamp"
        })

        const elevation = this.props.scrollY.interpolate({
            inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
            outputRange: [ELEVATION_MIN, ELEVATION_BASE, ELEVATION_BASE],
            extrapolate: "clamp"
        })

        return (
            <Animated.View style = {[ this.stylesView.general, { shadowOpacity: shadowOpacity, elevation: elevation } ]}>
                <Animated.View style = {[ this.stylesView.content, { height: headerHeight } ]} accessibilityLabel = "viewGeneralHeader">
                    <Animated.Text style = {[ this.stylesText.title, { fontSize: fontSize } ]} accessibilityLabel = { "textTitleHeader" + this.props.title }>
                        { this.props.title }
                    </Animated.Text>
                </Animated.View>
            </Animated.View>
        )
    }
}