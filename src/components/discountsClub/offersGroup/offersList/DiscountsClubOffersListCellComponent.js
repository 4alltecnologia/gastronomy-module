import React, { PureComponent } from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import PropTypes from "prop-types"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../../theme/Theme"
import { screenWidthPercentage, AnimationTypes, formatPrice } from "../../../../utils"
import { HOME_CONTENT_TYPE } from "../../../../components/discountsClub/DiscountClubUtils"
import { DISCOUNTS_CLUB_OFFERS_GROUP_CONTAINER_STRINGS } from "../../../../languages"

export default class DiscountsClubOffersListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        },
        content: {
            flex: 1,
            width: screenWidthPercentage(100),
            height: 108,
            paddingHorizontal: 20,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white"
        },
        separator: {
            height: 8,
            width: screenWidthPercentage(100),
            backgroundColor: "rgb(234,234,234)"
        },
        offerDetails: {
            flex: 1,
            height: 84,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            alignSelf: "stretch"
        },
        offerPriceAndUnityName: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        offerPrice: {
            flexDirection: "row",
            alignItems: "center"
        },
        offerTag: {
            position: "absolute",
            top: 0,
            left: 0,
            height: 44,
            width: 64,
            borderBottomRightRadius: 44,
            zIndex: 10
        }
    })

    stylesText = StyleSheet.create({
        offerName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: FontColor.secondary
        },
        unityName: {
            marginLeft: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 12,
            textAlign: "right",
            color: FontColor.secondary,
            opacity: 0.75
        },
        orderTypeName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: BackgroundColor.primary
        },
        offerPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: BackgroundColor.primary
        },
        offerOriginalPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 12,
            marginRight: 8,
            color: "rgb(163,163,163)",
            textDecorationLine: "line-through"
        },
        offerTag: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: FontColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        offerImage: {
            height: 84,
            width: 84,
            marginRight: 8,
            borderRadius: 8
        }
    })

    constructor(props) {
        super(props)
    }

    //THE VIEW IS COMMENTED BECAUSE WE DON'T RECEIVE THE OFFER DATE LIMIT
    render() {
        return (
            <TouchableWithoutFeedback onPress = { () => { this.props.onSelectItem(this.props.offer) } }>
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    <View style = { this.stylesView.separator } accessibilityLabel = "viewSeparator"/>
                    <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                        {/*<View style = { this.stylesView.offerTag } accessibilityLabel = "viewOfferTag">*/}
                        {/*<Text style = { this.stylesText.offerTag} numberOfLines = { 2 } accessibilityLabel = "textOfferTag">*/}
                        {/*Acaba hoje*/}
                        {/*</Text>*/}
                        {/*</View>*/}
                        { !!this.props.offer.image ?
                            <CachedImage source = {{ uri: this.props.offer.image }}
                                         resizeMode = { "cover" }
                                         style = { [ this.stylesImage.offerImage, !this.props.offer.availableNow ? { opacity: 0.5 } : null ]}
                                         accessibilityLabel = "imageOffer"
                            />
                            : null }
                        <View style = { this.stylesView.offerDetails } accessibilityLabel = "viewOfferDetails">
                            <Text style = { [this.stylesText.orderTypeName, !this.props.offer.availableNow ? { color: "rgba(139,139,139, 0.5)" } : null] } numberOfLines = { 1 } accessibilityLabel = "textOrderType">
                                { this.props.offer.idOfferType === HOME_CONTENT_TYPE.OFFER.idOfferType ? this.props.offer.orderType.name : DISCOUNTS_CLUB_OFFERS_GROUP_CONTAINER_STRINGS.voucher}
                            </Text>
                            <Text style = { [this.stylesText.offerName, !this.props.offer.availableNow ? { color: "rgba(139,139,139, 0.5)" } : null] } numberOfLines = { 1 } accessibilityLabel = { "textOfferName" + this.props.offer.name }>
                                { this.props.offer.name }
                            </Text>
                            <View style = { this.stylesView.offerPriceAndUnityName } accessibilityLabel = "viewOfferPriceAndUnityName">
                                <View style = { this.stylesView.offerPrice } accessibilityLabel = "viewOfferPrice">
                                    { !!this.props.offer.originalPrice ?
                                        <Text style = { [this.stylesText.offerOriginalPrice, !this.props.offer.availableNow ? { color: "rgba(139,139,139, 0.5)" } : null] }
                                              accessibilityLabel = "textOfferOriginalPrice">
                                            { formatPrice(this.props.offer.originalPrice, true) }
                                        </Text>
                                        : null
                                    }
                                    <Text style = { [this.stylesText.offerPrice, !this.props.offer.availableNow ? { color: "rgba(139,139,139, 0.5)" } : null] } accessibilityLabel = "textOfferPrice">
                                        { formatPrice(this.props.offer.price, true) }
                                    </Text>
                                </View>
                                <View style = { this.stylesView.general } accessibilityLabel = { "viewUnityName" }>
                                    <Text style = { [this.stylesText.unityName, !this.props.offer.availableNow ? { color: "rgba(139,139,139, 0.5)" } : null] }
                                          numberOfLines = { 1 }
                                          ellipsizeMode = { "tail" }
                                          accessibilityLabel = { "textUnityName" + this.props.offer.unity.name }>
                                        { this.props.offer.unity.name }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

DiscountsClubOffersListCellComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}