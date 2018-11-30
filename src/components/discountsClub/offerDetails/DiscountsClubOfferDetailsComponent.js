import React, { PureComponent } from "react"
import { StyleSheet, View, ScrollView, Animated, Platform } from "react-native"
import PropTypes from "prop-types"
import { getNavigationHeaderHeight } from "../../../utils"
import { BackgroundColor } from "../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../languages"
import DiscountsClubOfferDetailsProductImageComponent from "./DiscountsClubOfferDetailsProductImageComponent"
import DiscountsClubOfferDetailsUnityDetailsComponent from "./DiscountsClubOfferDetailsUnityDetailsComponent"
import DiscountsClubOfferDetailsBuyButtonComponent from "./DiscountsClubOfferDetailsBuyButtonComponent"

export default class DiscountsClubOfferDetailsComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        },
        scrollView: {
            flex: 1,
            marginTop: Platform.OS === "ios" ? getNavigationHeaderHeight(true) * -1 : 0,
            backgroundColor: "transparent"
        },
        contentContainer: {
            marginTop: 300, //IMAGE HEIGHT
            paddingBottom: 380, //IMAGE HEIGHT PLUS BUY BUTTON
            backgroundColor: "transparent"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <Animated.ScrollView style = { this.stylesView.scrollView }
                                     contentContainerStyle = { this.stylesView.contentContainer }
                                     scrollEventThrottle = { 8 }
                                     onScroll = { Animated.event(
                                         [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                                         { useNativeDrive: true }
                                     )}
                                     removeClippedSubviews = { false }
                >
                    <DiscountsClubOfferDetailsUnityDetailsComponent offer = { this.props.offer }
                                                                    product = { this.props.product }
                                                                    unity = { this.props.unity }
                    />
                </Animated.ScrollView>
                <DiscountsClubOfferDetailsProductImageComponent product = { this.props.product }
                                                                navigation = { this.props.navigation }
                                                                scrollY = { this.state.scrollY }
                />
                <DiscountsClubOfferDetailsBuyButtonComponent onBuyTapped = { this.props.onBuyTapped }/>
            </View>
        )
    }
}

//FIXME: WHICH OBJECT?
// DiscountsClubOfferDetailsComponent.propTypes = {
//     offer: PropTypes.object.isRequired
// }