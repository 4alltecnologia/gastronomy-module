import React, { PureComponent } from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CachedImage } from "react-native-cached-image"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontWeight, FontFamily } from "../../../../theme/Theme"
import Category from "../../../../models/discountsClub/Category"
import Coupon from "../../../../models/discountsClub/Coupon"
import DiscountVoucher from "../../../../models/discountsClub/DiscountVoucher"
import Offer from "../../../../models/discountsClub/Offer"
import { FirebaseActions } from "../../../../utils"

export default class DiscountsClubBannerCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "transparent"
        },
        content: {
            flex: 1,
            zIndex: -10
        },
        gradientContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        },
        gradient: {
            flex: 1
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            flex: 1
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress = { () => this.props.onSelectItem(this.props.bannerItem, FirebaseActions.DISCOUNTS_CLUB_HOME.actions.BANNER) }
                                      accessibilityLabel = { "buttonGeneralCarouselItem" + this.props.bannerItem.position }
            >
                <View style = { this.stylesView.general }  accessibilityLabel = { "viewBannerGeneral" + this.props.bannerItem.position }>
                    <View style = { this.stylesView.content }>
                    <CachedImage style = { this.stylesImage.image }
                                 resizeMode = { "cover" }
                                 source = {{ uri: this.props.bannerItem.image }}
                                 accessibilityLabel = { "imageProductCarouselItem" + this.props.bannerItem.position }
                    />
                    </View>
                    <View style = { this.stylesView.gradientContainer }>
                        <LinearGradient colors = {["transparent", "rgba(15,15,15,0.75)" ]} locations = {[0.5,1]} style = { this.stylesView.gradient }/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

DiscountsClubBannerCellComponent.propTypes = {
    bannerItem: PropTypes.oneOfType([PropTypes.instanceOf(Category), PropTypes.instanceOf(Coupon), PropTypes.instanceOf(DiscountVoucher), PropTypes.instanceOf(Offer)]).isRequired,
    onSelectItem: PropTypes.func.isRequired,
}