import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native"
import { CachedImage } from "react-native-cached-image"
import PropTypes from "prop-types"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, formatPrice, formatDistance, getUnityMedia, MediaTypes } from "../../utils"
import Images from "../../assets/index"
import { CATALOG_CELL_COMPONENT_STRINGS as CatalogStrings } from "../../languages/index"
import OfferItem from "./model/OfferItem"

export default class OfferCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center"
        },
        content: {
            flex: 1,
            marginHorizontal: 20,
            marginVertical: 16,
            flexDirection: "row",
            alignSelf: "stretch",
            backgroundColor: "white"
        },
        unityPhoto: {
            width: 60,
            alignSelf: "stretch"
        },
        productDetails: {
            flex: 1,
            marginHorizontal: 8,
            alignSelf: "stretch",
            alignItems: "flex-start",
            justifyContent: "space-between"
        },
        unityNameAndOrderType: {
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        productPriceAndUnityDistance: {
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        productPrice: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        unityDistance: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
        },
        arrow: {
            width: 8,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        productName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        unityName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: BackgroundColor.secondary
        },
        productOrderType: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: BackgroundColor.secondary
        },
        productDescription: {
            marginTop: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: "rgb(130,130,130)"
        },
        productPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: BackgroundColor.primary
        },
        productOriginalPrice: {
            marginLeft: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: "rgb(130,130,130)",
            textDecorationLine: "line-through"
        },
        unityDistance: {
            marginLeft: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 12,
            color: "rgb(130,130,130)"
        }
    })

    stylesImage = StyleSheet.create({
        unityPhoto: {
            height: 60,
            width: 60,
            borderRadius: 8
        },
        arrow: {
            height: 8,
            width: 8,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        },
        unityDistancePin: {
            height: 12,
            width: 12,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableWithoutFeedback style = { this.stylesView.general } onPress = { () => this.props.onOfferTapped(this.props.offerItem) } accessibilityLabel = "viewGeneral">
                    <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                        <View style = { this.stylesView.unityPhoto } accessibilityLabel = "viewUnityPhoto">
                            <CachedImage source = {{ uri: getUnityMedia(MediaTypes.LOGO, this.props.offerItem.unity.media) }} style = { [ this.stylesImage.unityPhoto, !this.props.offerItem.open ? { opacity: 0.5 } : null ]} resizeMode = { "cover" } accessibilityLabel = "imageUnityPhoto"/>
                        </View>
                        <View style = { this.stylesView.productDetails } accessibilityLabel = "viewProductDetails">
                            <Text style = { [this.stylesText.productName, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } numberOfLines = { 1 } accessibilityLabel = "textProductName">
                                { this.props.offerItem.product.name }
                            </Text>
                            <View style = { this.stylesView.unityNameAndOrderType } accessibilityLabel = "viewUnityNameAndOrderType">
                                <Text style = { [this.stylesText.unityName, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } numberOfLines = { 1 } accessibilityLabel = "textUnityName">
                                    { this.props.offerItem.unity.name }
                                </Text>
                                <Text style = { [this.stylesText.productOrderType, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } accessibilityLabel = "textProductOrderType">
                                    { this.props.offerItem.product.orderType.name }
                                </Text>
                            </View>
                            <Text style = { [this.stylesText.productDescription, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } accessibilityLabel = "textProductDescription">
                                { this.props.offerItem.product.desc }
                            </Text>
                            <View style = { this.stylesView.productPriceAndUnityDistance } accessibilityLabel = "viewProductPriceAndUnityDistance">
                                <View style = { this.stylesView.productPrice } accessibilityLabel = "viewProductPrice">
                                    <Text style = { [this.stylesText.productPrice, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } accessibilityLabel = "textProductPrice">
                                        { formatPrice(this.props.offerItem.product.price, true) }
                                    </Text>
                                    <Text style = { [this.stylesText.productOriginalPrice, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } accessibilityLabel = "textProductOriginalPrice">
                                        { formatPrice(this.props.offerItem.product.originalPrice, true) }
                                    </Text>
                                </View>
                                <View style = { this.stylesView.unityDistance } accessibilityLabel = "viewUnityDistance">
                                    <Image style = { [this.stylesImage.unityDistancePin, !this.props.offerItem.open ? { tintColor: "rgba(139,139,139, 0.5)" } : null] } source = { Images.icons.pinLocation } accessibilityLabel = "imageUnityDistancePin"/>
                                    <Text style = { [this.stylesText.unityDistance, !this.props.offerItem.open ? { color: "rgba(139,139,139, 0.5)" } : null] } accessibilityLabel = "textUnityDistance">
                                        { formatDistance(this.props.offerItem.unity.distance) }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style = { this.stylesView.arrow } accessibilityLabel = "viewArrow">
                            <Image style = { [this.stylesImage.arrow, !this.props.offerItem.open ? { tintColor: "rgba(139,139,139, 0.5)" } : null] } source = { Images.icons.arrowRight } accessibilityLabel = "imageArrow"/>
                        </View>
                    </View>
            </TouchableWithoutFeedback>
        )
    }

}

OfferCellComponent.propTypes = {
    offerItem: PropTypes.instanceOf(OfferItem).isRequired
}
