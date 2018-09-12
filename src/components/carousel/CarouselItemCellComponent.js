import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import LinearGradient from "react-native-linear-gradient"
import PropTypes from "prop-types"
import Images from "../../assets/index"
import { screenWidthPercentage, formatPrice, formatDistance } from "../../utils"
import { BackgroundColor, FontColor, FontWeight, FontFamily } from "../../theme/Theme"
import CarouselItem from "./model/CarouselItem"

export default class CarouselItemCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            paddingBottom: 16,
            backgroundColor: "transparent"
        },
        content: {
            flex: 1,
            zIndex: -10,
        },
        offerDetails: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            paddingTop: 8,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12
        },
        gradient: {
            flex: 1,
            paddingTop: 16,
            paddingHorizontal: 20,
            borderRadius: 12
        },
        unityNameAndProductPrice: {
            flex: 1,
            marginTop: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        unityDistanceAndProductOriginalPrice: {
            flex: 1,
            marginTop: 4,
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        unityDistance: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        orderType: {
            height: 20,
            marginRight: 10,
            paddingHorizontal: 8,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BackgroundColor.secondary,
        }
    })

    stylesText = StyleSheet.create({
        productName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: FontColor.primary
        },
        unityName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: BackgroundColor.secondary
        },
        productOrderType: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: BackgroundColor.secondary
        },
        productPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: FontColor.primary
        },
        productOriginalPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: FontColor.primary,
            textDecorationLine: "line-through"
        },
        unityDistance: {
            marginLeft: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: FontColor.primary
        },
        productOrderType: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: FontColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            flex: 1,
            borderRadius: 12,
            backgroundColor: "transparent",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 7,
            shadowOpacity: 0.4,
        },
        unityDistancePin: {
            height: 12,
            width: 12,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary,
            shadowColor: "rgba(15,15,15,0.8)",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 4,
            shadowOpacity: 0.5,
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            carouselItem: props.carouselItem
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            carouselItem: nextProps.carouselItem
        })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress = { () => this.props.onPressCarousel(this.state.carouselItem) } accessibilityLabel = "buttonGeneralCarouselItem">
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneralCarouselItem">
                    <View style = { this.stylesView.content } accessibilityLabel = "viewContentCarouselItem">
                        <CachedImage style = { this.stylesImage.image } resizeMode = { "cover" } source = {{ uri: this.state.carouselItem.offerItem.product.image }} accessibilityLabel = "imageProductCarouselItem"/>
                        <View style = { this.stylesView.offerDetails } accessibilityLabel = "viewOfferDetails">
                            <LinearGradient colors = {[ "transparent", "rgba(15,15,15,0.6)" ]} style = { this.stylesView.gradient } accessibilityLabel = "linearGradientCarouselItem">
                                <Text style = { this.stylesText.productName } numberOfLines = { 2 } accessibilityLabel = { "textProductName" + this.state.carouselItem.offerItem.product.name }>
                                    { this.state.carouselItem.offerItem.product.name }
                                </Text>
                                <View style = { this.stylesView.unityNameAndProductPrice } accessibilityLabel = "viewUnityNameAndProductPrice">
                                    <Text style = { this.stylesText.unityName } accessibilityLabel = "textUnityName">
                                        { this.state.carouselItem.offerItem.unity.name }
                                    </Text>
                                    <Text style = { this.stylesText.productPrice } accessibilityLabel = "textProductPrice">
                                        { formatPrice(this.state.carouselItem.offerItem.product.price, true) }
                                    </Text>
                                </View>
                                <View style = { this.stylesView.unityDistanceAndProductOriginalPrice } accessibilityLabel = "viewUnityDistanceAndProductOriginalPrice">
                                    <View style = { this.stylesView.unityDistance } accessibilityLabel = "viewUnityDistance">
                                        <View style = { this.stylesView.orderType }>
                                            <Text style = { this.stylesText.productOrderType } accessibilityLabel = "textProductOrderType">
                                                { this.props.carouselItem.offerItem.product.orderType.name }
                                            </Text>
                                        </View>
                                        <Image style = { this.stylesImage.unityDistancePin } source = { Images.icons.pin }  accessibilityLabel = "imageUnityDistancePin"/>
                                        <Text style = { this.stylesText.unityDistance }  accessibilityLabel = "textUnityDistance">
                                            { formatDistance(this.state.carouselItem.offerItem.unity.distance) }
                                        </Text>
                                    </View>
                                    <Text style = { this.stylesText.productOriginalPrice }  accessibilityLabel = "textProductOriginalPrice">
                                        { formatPrice(this.state.carouselItem.offerItem.product.originalPrice, true) }
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

CarouselItemCellComponent.propTypes = {
    carouselItem: PropTypes.instanceOf(CarouselItem).isRequired,
    onPressCarousel: PropTypes.func.isRequired,
}