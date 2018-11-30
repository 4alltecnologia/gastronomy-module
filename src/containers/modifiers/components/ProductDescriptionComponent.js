import React, { PureComponent } from "react"
import { StyleSheet, View, Text, TouchableOpacity, LayoutAnimation, UIManager, Platform } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { screenWidthPercentage, FirebaseActions } from "../../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../theme/Theme"
import { PRODUCT_DESCRIPTION_COMPONENT_STRINGS as ProductDecriptionStrings } from "../../../languages/index"
import { ExternalMethods } from "../../../native/Functions"

export default class ProductDescriptionComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            paddingVertical: 20,
            paddingHorizontal: 20
        },
        productDetails: {
            flex: 1,
            flexDirection: "row"
        },
        productNameAndDescription: {
            flex: 1,
            alignItems: "flex-start"
        },
        productDescriptionExpanded: {
            flex: 1,
            marginTop: 4
        },
        buttonSeeMore: {
            width: 64,
            alignSelf: "stretch",
            alignItems: "flex-end",
            justifyContent: "flex-end"
        },
        buttonSeeMoreExpanded: {
            height: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            alignSelf: "stretch"
        }
    })

    stylesText = StyleSheet.create({
        productName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: FontColor.secondary
        },
        productDescription: {
            marginTop: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 14,
            color: FontColor.secondary,
            opacity: 0.8
        },
        buttonSeeMore: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 12,
            color: BackgroundColor.primary
        }
    })

    stylesButton = StyleSheet.create({
        seeMore: {
            height: 30,
            width: 64,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end"
        }
    })

    stylesImage = StyleSheet.create({
        productImage: {
            borderRadius: 8,
            marginRight: 8
        }
    })

    constructor(props) {
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state =  {
            isExpanded: false
        }
    }

    _onPress() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        this.setState({
            isExpanded: !this.state.isExpanded
        }, () => {
            ExternalMethods.registerFirebaseEvent(FirebaseActions.MODIFIERS.actions.SEE_MORE, { product: this.props.product.name })
        })
    }

    render() {
        if (!!this.props.product.image || !!this.props.product.desc) {
            return (
                <View style = { this.stylesView.general } accessibilitLabel = "viewGeneralProductDescription">
                    <View style = { this.stylesView.productDetails } accessibilitLabel = "viewProductDetails">
                        { !!this.props.product.image ?
                            <CachedImage style = { [this.stylesImage.productImage, { height: this.state.isExpanded ? 50 : 60, width: this.state.isExpanded ? 50 : 60} ] }
                                         source = {{ uri: this.props.product.image }}
                                         resizeMode = { "cover" }
                            />
                            : null }
                        <View style = { [ this.stylesView.productNameAndDescription, { justifyContent: !this.props.product.desc || this.state.isExpanded ? "center" : "flex-start" } ] } accessibilitLabel = "viewProductNameAndDescription">
                            <Text style = { this.stylesText.productName } accessibilitLabel = { "textProductName" + this.props.product.name }>
                                { this.props.product.name }
                            </Text>
                            { !!this.props.product.desc && !this.state.isExpanded ?
                                <Text style = { this.stylesText.productDescription } numberOfLines = { 2 } accessibilitLabel = "textProductDescription">
                                    { this.props.product.desc }
                                </Text>
                                : null }
                        </View>
                        { !!this.props.product.desc && !this.state.isExpanded ?
                            <View style = { this.stylesView.buttonSeeMore } accessibilitLabel = "viewButtonSeeMore">
                                <TouchableOpacity style = { this.stylesButton.seeMore } onPress = { () => this._onPress() } accessibilitLabel = "buttonSeeMore">
                                    <Text style = { this.stylesText.buttonSeeMore } accessibilitLabel = "textButtonSeeMore">
                                        { ProductDecriptionStrings.seeMore }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            : null }
                    </View>
                    { this.state.isExpanded ?
                        <View style = { this.stylesView.productDescriptionExpanded } accessibilitLabel = "viewProductDescriptionSeeMore">
                            <Text style = { this.stylesText.productDescription } numberOfLines = { 0 } accessibilitLabel = "textProductDescription">
                                { this.props.product.desc }
                            </Text>
                            <View style = { this.stylesView.buttonSeeMoreExpanded } accessibilitLabel = "viewButtonSeeMoreExpanded">
                                <TouchableOpacity style = { this.stylesButton.seeMore } onPress = { () => this._onPress() } accessibilitLabel = "buttonSeeMore">
                                    <Text style = { this.stylesText.buttonSeeMore } accessibilitLabel = "textButtonSeeMore">
                                        { ProductDecriptionStrings.seeLess }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null }
                </View>
            )
        } else {
            <View/>
        }
    }
}