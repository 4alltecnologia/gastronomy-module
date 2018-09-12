import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableWithoutFeedback, RefreshControl } from "react-native"
import { screenWidthPercentage, formatPrice } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { CHECK_PRODUCT_LIST_COMPONENT_STRINGS as CheckStrings, LOGIN_USER_COMPONENT_STRINGS as LoginStrings, GENERAL_STRINGS } from "../../languages/index"
import LoginUserComponent from "../cart/LoginUserComponent"
import CheckProductListCellComponent from "./CheckProductListCellComponent"

export default class CheckProductListComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100)
        },
        topMessage: {
            marginHorizontal: 20,
            marginVertical: 16,
            alignSelf: "stretch"
        },
        bottom: {
            width: screenWidthPercentage(100),
            position: "absolute",
            bottom: 0
        },
        price: {
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgb(250,250,250)",
            borderWidth: 1,
            borderColor: "rgb(224,224,224)",
        },
        subtotalPriceAndTips: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        totalPrice: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        buttonAddProducts: {
            height: 54,
            width: screenWidthPercentage(100),
            marginVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
        },
        buttonPayCheck: {
            height: 64,
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
        },
        flatList: {
            flex: 1,
            width: screenWidthPercentage(100)
        },
        separator: {
            height: 1,
            marginHorizontal: 20,
            alignSelf: "stretch",
            backgroundColor: "#d1d1d1"
        }
    })

    stylesText = StyleSheet.create({
        topMessage: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 16,
            color: "rgb(155,155,155)",
            textAlign: "center"
        },
        productTotalAndTips: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: "rgb(61,61,61)"
        },
        productTotalAndTipsPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 14,
            color: "rgb(153,153,153)"
        },
        totalPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "rgb(61,61,61)"
        },
        price: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: BackgroundColor.primary
        },
        buttonAddProducts: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: BackgroundColor.primary
        },
        buttonPayCheck: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "white"
        }
    })

    stylesButton = StyleSheet.create({
        buttonAddProducts: {
            height: 44,
            marginHorizontal: 20,
            marginVertical: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: BackgroundColor.primary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
        },
        buttonPayCheck: {
            height: 44,
            marginHorizontal: 20,
            marginVertical: 8,
            borderRadius: 4,
            backgroundColor: BackgroundColor.primary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            productList: !!props.productList ? props.productList : [],
            productTotal: !!props.productTotal ? props.productTotal : 0,
            tips: !!props.tips ? props.tips : 0,
            totalPrice: !!props.totalPrice ? props.totalPrice : 0,
            isRefreshing: !!props.isRefreshing ? props.isRefreshing : false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            productList: !!nextProps.productList ? nextProps.productList : [],
            productTotal: !!nextProps.productTotal ? nextProps.productTotal : 0,
            tips: !!nextProps.tips ? nextProps.tips : 0,
            totalPrice: !!nextProps.totalPrice ? nextProps.totalPrice : 0,
            isRefreshing: !!nextProps.isRefreshing ? nextProps.isRefreshing : false
        })
    }

    _renderItem = ({item, index}) => {
        return (
            <CheckProductListCellComponent productName = { item.title }
                                           productQuantity = { item.quantity }
                                           productPrice = { item.price }
            />
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = (item, index) => item.id

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <ScrollView style = {{ marginBottom: this.props.isUserLoggedIn ? 118 : 270 }}
                            refreshControl = { <RefreshControl refreshing = { this.state.isRefreshing }
                                                               onRefresh = { this.props.onRefresh }
                                                               title = { GENERAL_STRINGS.loading }
                                                               tintColor = { BackgroundColor.primary }
                                                               titleColor = { BackgroundColor.primary }
                                                />
                            }>
                    <View style = { this.stylesView.topMessage } accessibilityLabel = "viewTopMessage">
                        <Text style = { this.stylesText.topMessage } accessibilityLabel = "textTopMessage">
                            { CheckStrings.topMessage }
                        </Text>
                    </View>
                    <FlatList ref = { ref => ( this.flatListRef = ref )}
                              style = { this.stylesView.flatList }
                              renderItem = { this._renderItem }
                              data = { this.state.productList }
                              keyExtractor = { this._keyExtractor }
                              extraData = { this.state }
                              ItemSeparatorComponent = { this._renderSeparator }
                              initialNumToRender = { 12 }
                              maxToRenderPerBatch = { 12 }
                              disableVirtualization = { false }
                              onEndReachedThreshold = { 1200 }
                              scrollEnabled = { false }
                              removeClippedSubviews = { false }
                              scrollEventThrottle = { 1 }
                              accessibilityLabel = "flatList"
                    />
                    <View style = { this.stylesView.buttonAddProducts } accessibilityLabel = "viewButtonAddProducts">
                        <TouchableWithoutFeedback style = { this.stylesButton.buttonAddProducts } onPress = { () => this.props.onGoToCatalog() } accessibilityLabel = "buttonAddProducts">
                            <View style = { this.stylesButton.buttonAddProducts }>
                                <Text style = { this.stylesText.buttonAddProducts } accessibilityLabel = "textButtonAddProducts">
                                    { CheckStrings.addProducts }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
                <View style = { [this.stylesView.bottom, { height: this.props.isUserLoggedIn ? !!this.state.tips ? 160 : 118 : !!this.state.tips ? 312 : 270 } ] } accessibilityLabel = "viewBottom">
                    <View style = { [this.stylesView.price, { height: !!this.state.tips ? 96 : 54 }] } accessibilityLabel = "viewPrice">
                        { !!this.state.tips ?
                        <View style = { this.stylesView.subtotalPriceAndTips } accessibilityLabel = "viewSubtotal">
                            <Text style = { this.stylesText.productTotalAndTips } accessibilityLabel = "textTotalPrice">
                                { CheckStrings.subtotal }
                            </Text>
                            <Text style = { this.stylesText.productTotalAndTipsPrice } accessibilityLabel = "textPrice">
                                { formatPrice(this.state.productTotal, true) }
                            </Text>
                        </View>
                            : null }
                        { !!this.state.tips ?
                        <View style = { this.stylesView.subtotalPriceAndTips } accessibilityLabel = "viewTips">
                            <Text style = { this.stylesText.productTotalAndTips } accessibilityLabel = "textTotalPrice">
                                { CheckStrings.tips }
                            </Text>
                            <Text style = { this.stylesText.productTotalAndTipsPrice } accessibilityLabel = "textPrice">
                                { formatPrice(this.state.tips, true) }
                            </Text>
                        </View>
                        : null }
                        <View style = { this.stylesView.totalPrice } accessibilityLabel = "viewTotalPrice">
                            <Text style = { this.stylesText.totalPrice } accessibilityLabel = "textTotalPrice">
                                { CheckStrings.total }
                            </Text>
                            <Text style = { this.stylesText.price } accessibilityLabel = "textPrice">
                                { formatPrice(this.state.totalPrice, true) }
                            </Text>
                        </View>
                    </View>
                    { this.props.isUserLoggedIn ?
                    <View style = { this.stylesView.buttonPayCheck } accessibilityLabel = "viewButtonPayCheck">
                        <TouchableWithoutFeedback style = { this.stylesButton.buttonPayCheck } onPress = { () => this.props.onGoToCheckPayment() } accessibilityLabel = "buttonPayCheck">
                            <View style = { this.stylesButton.buttonPayCheck }>
                                <Text style = { this.stylesText.buttonPayCheck } accessibilityLabel = "textButtonPayCheck">
                                    { CheckStrings.payCheck }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    : <LoginUserComponent message = { LoginStrings.messageCheck }
                                          signIn = { () => this.props.callLogin() }/>
                    }
                </View>
            </View>
        )
    }
}