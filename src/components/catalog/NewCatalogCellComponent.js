import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, formatPrice } from "../../utils"
import Images from "../../assets/index"
import { LANGUAGE } from "../../configs"
import { CATALOG_CELL_COMPONENT_STRINGS as CatalogStrings } from "../../languages/index"
import { connect } from "react-redux"
import { updateItemCurrentCartCheck } from "../../redux/actions"

class NewCatalogCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            height: 128,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
        },
        content: {
            flex: 1,
            marginHorizontal: 20,
            marginVertical: 16,
            flexDirection: "row",
            alignSelf: "stretch",
            backgroundColor: "white"
        },
        productPhoto: {
            width: 60,
            marginRight: 8,
            alignSelf: "stretch"
        },
        productDetails: {
            flex: 1,
            alignSelf: "stretch",
            alignItems: "flex-start",
            justifyContent: "space-between"
        },
        addRemoveProduct: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
        },
        productPrice: {
            flexDirection: "row",
            alignItems: "center"
        }
    })

    stylesText = StyleSheet.create({
        productName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "rgb(61, 61, 61)"
        },
        productDescription: {
            height: 44,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 14,
            color: "rgb(153,153,153)"
        },
        productQuantity: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            marginLeft: 4,
            marginRight: 4,
            color: "rgb(153,153,153)"
        },
        productPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: BackgroundColor.primary
        },
        productOriginalPrice: {
            marginLeft: 8,
            marginBottom: 1,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: "rgb(153,153,153)",
            textDecorationLine: "line-through"
        },
        productFromPrice: {
            marginRight: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 12,
            color: "rgb(128,128,128)"
        }
    })

    stylesImage = StyleSheet.create({
        productPhoto: {
            height: 60,
            width: 60,
            borderRadius: 8
        },
        addProduct: {
            height: 24,
            width: 24,
            tintColor: BackgroundColor.primary,
            resizeMode: "contain"
        },
        removeProduct: {
            height: 24,
            width: 24,
            tintColor: BackgroundColor.primary,
            resizeMode: "contain"
        },
        arrowRight: {
            height: 15,
            width: 15,
            tintColor: BackgroundColor.primary
        }
    })

    stylesButton = StyleSheet.create({
        addRemoveProduct: {
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    constructor(props) {
        super(props)

        this.props.item.price = this.props.item.totalValue ? this.props.item.totalValue : this.props.item.price
        this.props.item.hasVariations = this.props.item.productVariations && this.props.item.productVariations.length > 0
    }

    componentWillUpdate(nextProps) {
        if (nextProps.currentCart.length == 0) {
            var item = nextProps.currentCart.filter(product => (product.id == nextProps.item.id && product.idOnCart == nextProps.item.idOnCart))[0]
            if (item) {
                item.quantity = 0
                this.props.updateItemCurrentCartCheck(item, true)
            } else {
                this.props.item.quantity = 0
            }
        }
    }

    _renderPrice(item) {
        if (!!item.fromPrice) {
            return (
                <View style = { this.stylesView.productPrice } accessibilityLabel = "viewProductPrice">
                    <Text style = { this.stylesText.productFromPrice } accessibilityLabel = "textFromPrice">
                        { CatalogStrings.fromPrice }
                    </Text>
                    <Text style = { this.stylesText.productPrice } numberOfLines = { 1 } accessibilityLabel = "textProductValue">
                        { formatPrice(item.fromPrice, true) }
                    </Text>
                </View>
            )
        } else if (item.price < item.originalPrice) {
            return (
                <View style = { this.stylesView.productPrice } accessibilityLabel = "viewProductPrice">
                    <Text style = { this.stylesText.productPrice } numberOfLines = { 1 } accessibilityLabel = "textProductValue">
                        { formatPrice(item.price, true) }
                    </Text>
                    <Text style = { this.stylesText.productOriginalPrice } numberOfLines = { 1 } accessibilityLabel = "textProductValue">
                        { formatPrice(item.originalPrice, true) }
                    </Text>
                </View>
            )
        } else if (this.props.cameFromCheck || (item.price >= item.originalPrice && item.price > 0)) {
            return (
                <Text style = { this.stylesText.productPrice } numberOfLines = { 1 } accessibilityLabel = "textProductValue">
                    { formatPrice(item.price, true) }
                </Text>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style = { this.stylesView.general } onPress = { () => this.props.cameFromCheck ? null : this.props.onSelectProduct(this.props.item) } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                        { !!this.props.item.image ?
                        <View style = { this.stylesView.productPhoto } accessibilityLabel = "viewProductPhoto">
                            <CachedImage source = {{ uri: this.props.item.image }} style = { this.stylesImage.productPhoto } resizeMode = { "cover" } accessibilityLabel = "imageProduct"/>
                        </View>
                        : null }
                        <View style = { this.stylesView.productDetails } accessibilityLabel = "viewProductDetails">
                            <Text style = { this.stylesText.productName } numberOfLines = { 1 } accessibilityLabel = "textProductName">
                                { this.props.item.name }
                            </Text>
                            <Text style = { this.stylesText.productDescription } numberOfLines = { 2 } accessibilityLabel = "textProductDescription">
                                { this.props.cameFromCheck ? (!!this.props.item.subItemsText ? this.props.item.subItemsText : this.props.item.desc) : this.props.item.desc }
                            </Text>
                            { this._renderPrice(this.props.item) }
                        </View>
                        { this.props.isCheckMode ?
                            <View style = {[ this.stylesView.addRemoveProduct, { width: this.props.quantityItem > 0 ? 100 : 40 } ]} accessibilityLabel = "viewAddProduct">
                                { this.props.quantityItem && this.props.quantityItem > 0 && !this.props.item.hasVariations ?
                                    <View style={{ flexDirection: "row", alignItems: "center",justifyContent: "center" }}>
                                        <TouchableWithoutFeedback onPress = {() => {this.props.removeProduct(this.props.item)}} accessibilityLabel = "buttonAddProduct">
                                            <View style = { this.stylesButton.addRemoveProduct } accessibilityLabel = "viewButtonAddRemove1">
                                                <Image source = {Images.icons.minusFilled} style = {this.stylesImage.removeProduct} accessibilityLabel = "imageAddProduct"/>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text style={this.stylesText.productQuantity} accessibilityLabel="textProductQuantity">
                                            {this.props.quantityItem}
                                        </Text>
                                    </View>
                                    : null
                                }
                                { this.props.item.hasVariations ?
                                    <Image source = { Images.icons.arrowRight } style = { this.stylesImage.arrowRight } accessibilityLabel = "imageAddProduct"/>
                                    :
                                    <TouchableWithoutFeedback onPress = { () => { this.props.addProduct(this.props.item) } } accessibilityLabel="buttonAddProduct">
                                        <View style = { this.stylesButton.addRemoveProduct } accessibilityLabel = "viewButtonAddRemove2">
                                            <Image source = { Images.icons.plusFilled } style = { this.stylesImage.addProduct } accessibilityLabel="imageAddProduct"/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                            : null
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default connect(
    (state, props) => ({
        isCheckMode: !!state.check.checkNumber && state.check.checkNumber != 0,
        currentCart: state.check.currentCart,
        quantityItem: state.check.currentCart.filter(product => (product.id == props.item.id && product.idOnCart == props.item.idOnCart)).length > 0
            ? state.check.currentCart.filter(product => (product.id == props.item.id && product.idOnCart == props.item.idOnCart))[0].quantity : 0
    }),
    { updateItemCurrentCartCheck }
)(NewCatalogCellComponent)