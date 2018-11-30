import React, { PureComponent } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Platform } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { formatPrice, screenWidthPercentage, getNavigationHeaderHeight, getUnityMedia, MediaTypes } from "../../../utils"
import { BackgroundColor, FontColor, FontWeight, FontFamily } from "../../../theme/Theme"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS } from "../../../languages"
import Images from "../../../assets"
import WorkingHoursComponent from "../../unityInfo/WorkingHoursComponent"

export default class DiscountsClubOfferDetailsUnityDetailsComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100)
        },
        offerDetailsAndUnityImage: {
            flex: 1,
            paddingVertical: 16,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        offerDetails: {
            flex: 1,
            marginRight: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        offerUnityNameAndOrderType: {
            flex: 1,
            marginLeft: 8,
            alignItems: "flex-end",
            justifyContent: "center"
        },
        sectionHeader: {
            width: screenWidthPercentage(100),
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: "flex-start",
            justifyContent: "center"
        },
        unityAddress: {
            width: screenWidthPercentage(100),
            paddingBottom: 16,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start"
        },
        content: {
            flex: 1
        },
        separator: {
            height: 10,
            width: screenWidthPercentage(100),
            backgroundColor: "rgb(238,238,238)"
        }
    })

    stylesText = StyleSheet.create({
        productPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: BackgroundColor.primary
        },
        productOriginalPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: "rgb(163,163,163)",
            textDecorationLine: "line-through"
        },
        offerExpiration: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 12,
            color: "rgb(155,155,155)"
        },
        offerExpirationDate: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: "rgb(74,74,74)"
        },
        unityName: {
            marginTop: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: FontColor.secondary
        },
        orderTypeName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: BackgroundColor.primary
        },
        sectionHeader: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 22,
            color: FontColor.secondary
        },
        offerDescription: {
            marginBottom: 16,
            marginHorizontal: 20,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.75
        },
        unityAddress: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.75
        }
    })

    stylesImage = StyleSheet.create({
        unityImage: {
            height: 80,
            width: 80,
            borderRadius: 8
        },
        pinAddress: {
            marginRight: 8,
            height: 16,
            width: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            unityLogoURL: getUnityMedia(MediaTypes.LOGO, this.props.unity.media)
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.offerDetailsAndUnityImage } accessibilityLabel = "viewOfferDetailsAndUnityImage">
                    <View style = { this.stylesView.offerDetails } accessibilityLabel = "viewOfferDetails">
                        <View style = {{ alignItems: "flex-start", justifyContent: "center" }}>
                            <Text style = { this.stylesText.productOriginalPrice }>
                                { formatPrice(this.props.product.originalPrice, true) }
                            </Text>
                            <Text style = { this.stylesText.productPrice }>
                                { formatPrice(this.props.product.price, true) }
                            </Text>
                            { !!this.props.offer.expirationDate ?
                                <Text style = {{ marginTop: 8 }}>
                                    <Text style = { this.stylesText.offerExpiration } accessibilityLabel = "textOfferExpiration">
                                        { DISCOUNTS_CLUB_CONTAINER_STRINGS.offerDetailsComponent.offerExpiration }
                                    </Text>
                                    <Text style = { this.stylesText.offerExpirationDate } accessibilityLabel = "textOfferExpirationDate">
                                        { this.props.offer.expirationDate }
                                    </Text>
                                </Text>
                            : null }
                        </View>
                        <View style = { this.stylesView.offerUnityNameAndOrderType } accessibilityLabel = "viewOfferUnityNameAndOrderType">
                            <Text style = { this.stylesText.orderTypeName } accessibilityLabel = "textOfferOrderType">
                                { this.props.product.orderType.name }
                            </Text>
                            <Text style = { this.stylesText.unityName } numberOfLines = { 3 } accessibilityLabel = { "textOfferUnityName" + this.props.unity.name }>
                                { this.props.unity.name }
                            </Text>
                        </View>
                    </View>
                    { !!this.state.unityLogoURL ?
                    <CachedImage source = {{ uri: this.state.unityLogoURL }}
                                 resizeMode = { "contain" }
                                 style = { this.stylesImage.unityImage }
                                 accessibilityLabel = "imageOfferUnity"
                    />
                    : null }
                </View>
                { !!this.props.product.salesDescription || !!this.props.product.desc ?
                <View style = { this.stylesView.content }accessibilityLabel = "viewContent">
                    <View style = { this.stylesView.separator } accessibilityLabel = "viewSeparator"/>
                    <View style = { this.stylesView.sectionHeader } accessibilityLabel = "viewSectionHeaderOfferDescription">
                        <Text style = { this.stylesText.sectionHeader } accessibilityLabel = "textSectionHeader">
                            { DISCOUNTS_CLUB_CONTAINER_STRINGS.offerDetailsComponent.offerDescription }
                        </Text>
                    </View>
                    <Text style = { this.stylesText.offerDescription } accessibilityLabel = "textOfferDescription">
                        { !!this.props.product.salesDescription ? this.props.product.salesDescription : this.props.product.desc }
                    </Text>
                </View>
                : null }
                { !!this.props.unity.address ?
                <View style = { this.stylesView.content }accessibilityLabel = "viewContent">
                    <View style = { this.stylesView.separator } accessibilityLabel = "viewSeparator"/>
                    <View style = { this.stylesView.sectionHeader } accessibilityLabel = "viewSectionHeaderUnityAddress">
                        <Text style = { this.stylesText.sectionHeader } accessibilityLabel = "textSectionHeader">
                            { DISCOUNTS_CLUB_CONTAINER_STRINGS.offerDetailsComponent.address }
                        </Text>
                    </View>
                    <View style = { this.stylesView.unityAddress } accessibilityLabel = "viewUnityAddress">
                        <Image style = { this.stylesImage.pinAddress } source = { Images.icons.pinLocation } accessibilityLabel = "imagePinAddress"/>
                        <Text style = { this.stylesText.unityAddress } accessibilityLabel = "textUnityAddress">
                            { this.props.unity.address }
                        </Text>
                    </View>
                </View>
                : null }
                { !!this.props.unity.unityOperatingHourGroups ?
                <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                    <View style = { this.stylesView.separator } accessibilityLabel = "viewSeparator"/>
                    <WorkingHoursComponent workingHours = { this.props.unity.unityOperatingHourGroups }/>
                </View>
                : null }
            </View>
        )
    }
}