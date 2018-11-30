import React, { PureComponent } from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { CachedImage } from "react-native-cached-image"
import PropTypes from "prop-types"
import { FontColor, FontWeight, FontFamily } from "../../../../theme/Theme"
import Category from "../../../../models/discountsClub/Category"
import Coupon from "../../../../models/discountsClub/Coupon"
import DiscountVoucher from "../../../../models/discountsClub/DiscountVoucher"
import Offer from "../../../../models/discountsClub/Offer"
import { FirebaseActions, screenWidthPercentage } from "../../../../utils"

export default class DiscountsClubFeaturedCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            paddingBottom: 16,
            paddingHorizontal: 8,
            alignItems: "center",
            justifyContent: "flex-start"
        },
        content: {
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#FFFFFF",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 4,
            borderRadius: 4
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            height: screenWidthPercentage(52) - 80,
            width: screenWidthPercentage(100) - 80,
            borderRadius: 4
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress = { () => this.props.onSelectItem(this.props.featuredItem, FirebaseActions.DISCOUNTS_CLUB_HOME.actions.FEATURED) } accessibilityLabel = "buttonGeneralFeaturedItem">
                <View style = { this.stylesView.general } accessibilityLabel = { "viewGeneralFeaturedItem" + this.props.featuredItem.position }>
                    <View style = { this.stylesView.content } accessibilityLabel = "viewContentFeaturedItem">
                        <CachedImage style = { this.stylesImage.image }
                                     resizeMode = { "cover" }
                                     source = {{ uri: this.props.featuredItem.image }}
                                     accessibilityLabel = "imageFeaturedItem"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

DiscountsClubFeaturedCellComponent.propTypes = {
    featuredItem: PropTypes.oneOfType([PropTypes.instanceOf(Category), PropTypes.instanceOf(Coupon), PropTypes.instanceOf(DiscountVoucher), PropTypes.instanceOf(Offer)]).isRequired,
    onSelectItem: PropTypes.func.isRequired,
}