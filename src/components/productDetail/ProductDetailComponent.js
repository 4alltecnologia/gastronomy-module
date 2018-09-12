import React, { PureComponent } from "react"
import { StatusBar, findNodeHandle, View, StyleSheet, Text, SectionList, TouchableOpacity, Image, ScrollView, TextInput, Animated, Platform } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { FontFamily, BackgroundColor, FontColor, FontWeight } from "../../theme/Theme"
import { GENERAL_STRINGS, PRODUCT_DETAIL_STRINGS } from "../../languages/index"
import { screenWidthPercentage, screenHeightPercentage, formatPrice, getNavigationHeaderHeight } from "../../utils"
import Images from "../../assets"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { CachedImage } from "react-native-cached-image"

const HEADER_BASE_HEIGHT = 176
const HEADER_MAX_HEIGHT = HEADER_BASE_HEIGHT * 2 + getNavigationHeaderHeight(true);
const HEADER_MIN_HEIGHT = getNavigationHeaderHeight(true)
const HEADER_HEIGHT = HEADER_BASE_HEIGHT + getNavigationHeaderHeight(true)

export default class ProductDetailComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        },
        scrollView: {
            flex: 1
        },
        gradient: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            height: getNavigationHeaderHeight(true),
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center",
            borderColor: BackgroundColor.primary,
            zIndex: 10
        },
        productImage: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0
        },
        productDescriptionModifiers: {
            flex: 1
        },
        observationTitle: {
            height: 32,
            width: screenWidthPercentage(100),
            marginTop: 16,
            paddingHorizontal: 20,
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "rgb(242,242,242)"
        },
        observationInput: {
            height: 72,
            marginTop: 16,
            marginHorizontal: 20,
            justifyContent: "flex-start",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "rgb(209,209,209)",
        },
        productPriceQuantity: {
            height: 28,
            width: screenWidthPercentage(100),
            marginTop: 16,
            marginBottom: 64,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        productPrice: {
            height: 28,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        productQuantity: {
            height: 28,
            width: 88,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        footer: {
            height: 64,
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgb(242,242,242)"
        }
    })

    stylesText = StyleSheet.create({
        productDescription: {
            marginTop: 8,
            marginHorizontal: 20,
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color: "rgb(128,128,128)",
            textAlign: "left"
        },
        observationTitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)",
            textAlign: "left"
        },
        productModifiers: {
            marginTop: 8,
            marginHorizontal: 20,
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color: "rgb(128,128,128)",
            textAlign: "left"
        },
        productPriceTitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color: "rgb(128,128,128)",
            textAlign: "left"
        },
        productPrice: {
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)",
            textAlign: "left"
        },
        productQuantity: {
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)",
            textAlign: "center"
        },
        totalPrice: {
            fontFamily: FontFamily.font,
            fontSize: 24,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)",
            textAlign: "left"
        },
        addInCart: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.medium,
            color: FontColor.primary,
            textAlign: "left"
        }
    })

    stylesButton = StyleSheet.create({
        addInCart: {
            height: 40,
            width: 152,
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: BackgroundColor.primary,
            borderRadius: 8
        }
    })

    stylesImage = StyleSheet.create({
        productImage: {
            flex: 1
        },
        minus: {
            width: 28,
            height: 28,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        plus: {
            width: 28,
            height: 28,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        cart:{
            width: 28,
            height: 28,
            resizeMode: "contain",
            tintColor: FontColor.primary
        }
    })

    stylesTextInput = StyleSheet.create({
        description: {
            flex: 1,
            margin: 2
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    addToCart = () => {
        if (this.props.canAdd){
            this.props.onAddInCartPressed()
        }
    }

    _scrollToInput = (reactNode: any) => {
        setTimeout(() => {
            this.scroll.props.scrollToFocusedInput(reactNode, 180)
        }, 100)
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [HEADER_BASE_HEIGHT - HEADER_MAX_HEIGHT, 0, HEADER_BASE_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        })

        return (
            <View style = { [this.stylesView.general, { marginTop: (Platform.OS === "ios" && !!this.props.image) ? getNavigationHeaderHeight(true) * -1 : 0 } ] }>
                <KeyboardAwareScrollView innerRef = { ref => { this.scroll = ref }}
                                         style = { this.stylesView.scrollView }
                                         contentContainerStyle = {{ paddingTop: !!this.props.image ? HEADER_HEIGHT : 0 }}
                                         enableOnAndroid = { true }
                                         scrollEnabled = { true }
                                         viewIsInsideTabBar = { true }
                                         showsVerticalScrollIndicator = { false }
                                         scrollEventThrottle = { 16 }
                                         onScroll = { Animated.event(
                                             [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                                         )}
                                         keyboardOpeningTime = { 300 }
                                         accessibilityLabel = "scrollViewScroll">
                    { this.props.description ?
                        <Text style = { this.stylesText.productDescription} accessibilityLabel = "textProductDescription">
                            { this.props.description }
                        </Text>
                        : null }
                    { this.props.modifiersText ?
                        <Text style = { this.stylesText.productModifiers } accessibilityLabel = "textProductModifiers">
                            { this.props.modifiersText }
                        </Text>
                        : null }
                    <View style = { this.stylesView.observationTitle } accessibilityLabel = "viewObservationTitle">
                        <Text style = { this.stylesText.observationTitle } accessibilityLabel = "textObservationTitle">
                            { PRODUCT_DETAIL_STRINGS.observation }
                        </Text>
                    </View>
                    <View style = { this.stylesView.observationInput } >
                        <TextInput style = { this.stylesTextInput.description }
                                   placeholder = { PRODUCT_DETAIL_STRINGS.placeholderObs }
                                   blurOnSubmit = { true }
                                   returnKeyType = "done"
                                   multiline = { true }
                                   maxLength = { 90 }
                                   underlineColorAndroid = "#ffffff"
                                   onFocus = { (event: Event) => { this._scrollToInput(findNodeHandle(event.target)) } }
                                   onChangeText = { (text) => this.props.onObservationChange(text) }
                                   accessibilityLabel = "textInputDescription"
                        />
                    </View>
                    <View style = { this.stylesView.productPriceQuantity } accessibilityLabel = "viewProductPriceQuantity">
                        <View style = { this.stylesView.productPrice } accessibilityLabel = "viewProductPriceQuantity">
                            <Text style = { this.stylesText.productPriceTitle } accessibilityLabel = "textProductPriceTitle">
                                { PRODUCT_DETAIL_STRINGS.unitaryPrice }
                            </Text>
                            <Text style = { this.stylesText.productPrice } accessibilityLabel = "textProductPrice">
                                { formatPrice(this.props.price, true)}
                            </Text>
                        </View>
                        <View style = { this.stylesView.productQuantity } accessibilityLabel = "viewProductPriceQuantity">
                            <TouchableOpacity onPress = { () => { this.props.onMinusPressed() } } accessibilityLabel = "buttonMinus">
                                <Image style = { this.stylesImage.minus } source = { Images.icons.minus } accessibilityLabel = "imageMinus"/>
                            </TouchableOpacity>
                            <Text style = { this.stylesText.productQuantity } accessibilityLabel="textQuantityNumber">
                                { this.props.quantity }
                            </Text>
                            <TouchableOpacity onPress = { () => { this.props.onPlusPressed() } } accessibilityLabel = "buttonPlus">
                                <Image style = { this.stylesImage.plus } source = { Images.icons.plus }  accessibilityLabel = "imagePlus"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                { !!this.props.image ?
                    <Animated.View style = { [this.stylesView.productImage, { height: headerHeight }] }>
                        <LinearGradient colors = {[ "rgba(15,15,15,0.6)", "transparent",  ]} style = { this.stylesView.gradient } accessibilityLabel = "linearGradientCarouselItem"/>
                        <CachedImage style = { this.stylesImage.productImage } resizeMode = { "cover" } source = {{ uri: this.props.image }} accessibilityLabel = "imageProduct"/>
                    </Animated.View>
                    : null }
                <View style = { this.stylesView.footer } accessibilityLabel = "viewFooter">
                    <Text style = { this.stylesText.totalPrice } accessibilityLabel = "textTotalPrice">
                        { formatPrice(this.props.total, true) }
                    </Text>
                    <TouchableOpacity onPress = { () => { this.addToCart() } } accessibilityLabel = "buttonAddInCart">
                        <View style = { this.stylesButton.addInCart } accessibilityLabel = "viewAddInCart">
                            <Text style = { this.stylesText.addInCart } accessibilityLabel = "textAddInCart">
                                { PRODUCT_DETAIL_STRINGS.add }
                            </Text>
                            <Image style = { this.stylesImage.cart } source = { Images.icons.cart } accessibilityLabel = "imageCart"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}