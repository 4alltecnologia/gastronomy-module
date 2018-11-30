import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback, FlatList, LayoutAnimation, UIManager, Platform } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { getOrderStatusMessage, screenWidthPercentage, formatTime, formatPrice, OrderStatus, IdOrderType, AnimationTypes } from "../../utils"
import Images from "../../assets/index"
import { LANGUAGE } from "../../configs"
import { ORDER_HISTORY_CELL_COMPONENT_STRINGS as OrderStrings, GENERAL_STRINGS } from "../../languages/index"
import * as Animatable from "react-native-animatable"

export default class OrderHistoryCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center"
        },
        unityDetails: {
            flex: 1,
            height: 76,
            marginVertical: 8,
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        orderDetails: {
            flex: 1,
            height: 60,
            marginRight: 8,
            alignItems: "flex-start",
            justifyContent: "space-around"
        },
        orderNumberAndStatus: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        arrow: {
            width: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        separator: {
            height: 1,
            marginHorizontal: 0,
            alignSelf: "stretch",
            backgroundColor: "#d1d1d1"
        },
        separatorItem: {
            height: 1,
            backgroundColor: "#d1d1d1",
            alignSelf: "stretch"
        },
        expansive: {
            flexGrow: 1,
            flex: 1,
            alignSelf: "stretch"
        },
        orderStatusList: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            marginBottom: 16,
        },
        orderStatus: {
            height: 44,
            width: screenWidthPercentage(100),
            paddingRight: 20,
            paddingLeft: 16,
            flexDirection: "row",
            alignItems: "flex-end"
        },
        orderStatusMessageAndTime: {
            flex: 1,
            marginLeft: 8,
            marginBottom: 4,
            flexDirection: "row",
            alignSelf: "stretch",
            alignItems: "flex-end",
            justifyContent: "space-between"
        },
        statusMajorReceived: {
            height: 28,
            width: 28,
            marginRight: 4,
            marginLeft: 4,
            alignItems: "center",
            justifyContent: "center"
        },
        statusMajorReceivedWithDash: {
            height: 44,
            width: 36,
            alignItems: "center",
            justifyContent: "center"
        },
        statusMajorPending: {
            height: 28,
            width: 28,
            alignItems: "center",
            justifyContent: "center"
        },
        address: {
            flexGrow: 1,
            marginVertical: 8,
            marginHorizontal: 20,
        },
        delivery: {
            height: 44,
            marginVertical: 8,
            marginHorizontal: 20,
            alignSelf: "stretch"
        },
        deliverySub: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        itemCell: {
            marginVertical: 8,
            justifyContent: "flex-start",
            alignItems: "center"
        },
        itemInfo: {
            flexDirection: "row",
            alignSelf: "stretch"
        },
        listProductsComponent: {
            flexGrow: 1,
            marginHorizontal: 20
        }
    })

    stylesText = StyleSheet.create({
        unityName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: "rgb(61, 61, 61)"
        },
        orderStatus: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 10,
            color: BackgroundColor.primary
        },
        orderDeliveryTime: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 12,
            color: "rgb(128, 128, 128)"
        },
        statusReceived: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: "rgb(61, 61, 61)"
        },
        addressTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: "rgb(61, 61, 61)",
            marginBottom: 4
        },
        address: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: "rgb(61, 61, 61)"
        },
        deliveryCost: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: "rgb(61, 61, 61)"
        },
        deliveryTotal: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: "rgb(61, 61, 61)"
        },
        deliveryTotalPrice: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "rgb(61, 61, 61)"
        },
        itemTitle: {
            flex: 1,
            marginRight: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: "rgb(61, 61, 61)",
            alignSelf: "stretch"
        },
        itemQuantity: {
            marginRight: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: BackgroundColor.primary
        },
        itemPrice: {
            marginRight: 0,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: "rgb(61, 61, 61)"
        },
        subItems: {
            marginTop: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: "rgb(128, 128, 128)",
            alignSelf: "stretch"
        }
    })

    stylesImage = StyleSheet.create({
        unityLogo: {
            height: 60,
            width: 60,
            marginRight: 8,
            borderRadius: 4
        },
        arrow: {
            height: 8,
            width: 8,
            tintColor: BackgroundColor.primary,
            resizeMode: "contain"
        },
        statusMajorReceived: {
            height: 28,
            width: 28,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMajorReceivedWithDash: {
            height: 44,
            width: 36,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMajorPending: {
            height: 28,
            width: 28,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMinorReceived: {
            height: 14,
            width: 14,
            resizeMode: "contain",
            tintColor: FontColor.primary
        },
        statusMinorPending: {
            height: 16,
            width: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMinorReceivedWithDash: {
            height: 14,
            width: 14,
            marginTop: 16,
            resizeMode: "contain",
            tintColor: FontColor.primary
        },
        statusMinorPendingWithDash: {
            height: 16,
            width: 16,
            marginTop: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            listStatus: props.listStatus,
            usedListStatus: props.usedListStatus,
            isOrderCanceled: props.isOrderCanceled
        }
    }

    componentWillReceiveProps(nextProps) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        this.setState({
            listStatus: nextProps.listStatus,
            usedListStatus: nextProps.usedListStatus,
            isOrderCanceled: nextProps.isOrderCanceled
        })
    }

    _renderItem = ({item, index}) => {
        return (
            <View style = { this.stylesView.itemCell }>
                <View style = { this.stylesView.itemInfo }>
                    <Text style = { this.stylesText.itemQuantity }>
                        { item.quantity }x
                    </Text>
                    <Text style = { this.stylesText.itemTitle }>
                        { item.title }
                    </Text>
                    <Text style = { this.stylesText.itemPrice }>
                        { formatPrice(item.total) }
                    </Text>
                </View>
                { !!item.observation ?
                    <Text style = { this.stylesText.subItems }>
                        { item.observation }
                    </Text>
                    : null }
                { item.subItems.length > 0 ?
                    <Text style = { this.stylesText.subItems }>
                        { item.subItems.map((subItem, index) => {
                            if (index < item.subItems.length - 1) {
                                return subItem.title + "\n"
                            } else {
                                return subItem.title
                            }
                        })}
                    </Text>
                    : null }
            </View>
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separatorItem }/>
        )
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={ () => { this.props.onTapCell(this.props.index) } }>
                <View style = { [this.stylesView.general, this.props.orderStatus == OrderStatus.DELIVERED || this.props.orderStatus == OrderStatus.CANCELLED ? {backgroundColor: "#F0F0F0"} : null] } accessibilityLabel = "viewGeneral">
                    <Animatable.View animation = { AnimationTypes.FADE_IN } style = { this.stylesView.unityDetails } accessibilityLabel = "viewUnityDetails">
                        <CachedImage source = { !!this.props.unityLogo ? { uri: this.props.unityLogo } : Images.icons.placeholderStore } resizeMode = { "contain" } style = { this.stylesImage.unityLogo }/>
                        <View style = { this.stylesView.orderDetails } accessibilityLabel = "viewOrderDetails">
                            <View style = { this.stylesView.orderNumberAndStatus } accessibilityLabel = "viewOrderNumberAndStatus">
                                <Text style = { this.stylesText.orderStatus } accessibilityLabel = { "textOrderNumber" + this.props.orderId }>
                                    #{ this.props.orderId }{ "    " }|{ "    " }
                                </Text>
                                <Text style = { this.stylesText.orderStatus } accessibilityLabel = "textOrderStatus">
                                    { getOrderStatusMessage(this.props.orderStatus).toUpperCase() }
                                </Text>
                            </View>
                            <Text style = { this.stylesText.unityName } accessibilityLabel = "textUnityName">
                                { this.props.unityName }
                            </Text>
                            <Text style = { this.stylesText.orderDeliveryTime } accessibilityLabel = "textOrderDeliveryTime">
                                { this.props.orderStatus == OrderStatus.CANCELLED ? OrderStrings.canceledIn :
                                    this.props.orderStatus == OrderStatus.DELIVERED ? OrderStrings.deliveredAt :
                                        this.props.deliveryMethod == IdOrderType.DELIVERY.id ? OrderStrings.deliveryIn :
                                            this.props.deliveryMethod == IdOrderType.TAKEAWAY.id ? OrderStrings.takeawayIn :
                                                null }
                                { formatTime(this.props.deliveryTime, "DD/MM/YY - HH:mm") }
                            </Text>
                        </View>
                        <View style = { this.stylesView.arrow } accessibilityLabel = "viewArrow">
                            <Image source = { this.props.isOpen ? Images.icons.arrowUp : Images.icons.arrowDown } style = { this.stylesImage.arrow } accessibilityLabel = "imageArrow"/>
                        </View>
                    </Animatable.View>
                    { this.props.isOpen ?
                        <View style = { this.stylesView.expansive }>
                            { !!this.props.orderAddress ?
                                <View style = { this.stylesView.address } accessibilityLabel = "viewAddress">
                                    <Text style = { this.stylesText.addressTitle } accessibilityLabel = "textAddressTitle">
                                        { OrderStrings.addressTitle }
                                    </Text>
                                    <Text style = { this.stylesText.address } accessibilityLabel = "textAddress">
                                        { this.props.orderAddress }
                                    </Text>
                                </View>
                                : null
                            }
                            <View style = { this.stylesView.orderStatusList } accessibilityLabel = "viewOrderStatusList">
                                { this.state.usedListStatus.map((status, index) => {
                                    if (!this.props.isOrderCanceled && status == OrderStatus.CANCELLED) {
                                        return null
                                    } else {
                                        let listStatusFiltered = this.state.listStatus.filter(statusFromArray =>  statusFromArray.idOrderStatus == status)
                                        let statusFiltered = listStatusFiltered.length == 1 ? listStatusFiltered[0] : null

                                        let hasPostStatus = null
                                        if (!statusFiltered) {
                                            hasPostStatus = this.state.listStatus.filter(statusFromArray => statusFromArray.idOrderStatus != OrderStatus.CANCELLED && statusFromArray.idOrderStatus > status)
                                        }

                                        return (
                                            <View key = { index } style = { this.stylesView.orderStatus } accessibilityLabel = "viewOrderStatus">
                                                <ImageBackground style = { index > 0 ? this.stylesView.statusMajorReceivedWithDash : this.stylesView.statusMajorReceived }
                                                                 imageStyle = { index > 0 ? this.stylesImage.statusMajorReceivedWithDash : this.stylesImage.statusMajorReceived }
                                                                 source = { index > 0 ? status <= this.props.orderStatus ? Images.icons.circleDashFilled : Images.icons.circleDash : Images.icons.circleFilled }>
                                                    { status <= this.props.orderStatus ?
                                                        <Image style = { index > 0 ? this.stylesImage.statusMinorReceivedWithDash : this.stylesImage.statusMinorReceived }
                                                               source = { (!!hasPostStatus && hasPostStatus.length) || !!statusFiltered ? Images.icons.check : Images.icons.cancelOrder }
                                                        />
                                                        : null }
                                                </ImageBackground>
                                                <View style = { this.stylesView.orderStatusMessageAndTime } accessibilityLabel = "viewOrderStatusMessageAndTime">
                                                    <Text style = { this.stylesText.statusReceived } accessibilityLabel = "textStatusReceived">
                                                        { getOrderStatusMessage(status) }
                                                    </Text>
                                                    <Text style = { this.stylesText.statusReceived } accessibilityLabel = "textStatusReceivedTime">
                                                        { !!statusFiltered && status <= this.props.orderStatus ? formatTime(statusFiltered.timestampCreation, "HH:mm") : null}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                }) }
                            </View>
                            <View style = { this.stylesView.listProductsComponent }>
                                <FlatList renderItem = { this._renderItem }
                                          ItemSeparatorComponent = { this._renderSeparator }
                                          data = { this.props.orderItems }
                                          keyExtractor = { (item) => item.id + "" }
                                          extraData = { this.state }
                                          scrollEnabled = { false }
                                          disableVirtualization = { false }
                                          removeClippedSubviews = { false }
                                          onEndReachedThreshold = { 160 }
                                          scrollEventThrottle = { 160 }
                                />
                            </View>
                            <View style = { this.stylesView.delivery }>
                                <View style = { this.stylesView.deliverySub }>
                                    <Text style = { this.stylesText.deliveryCost }>
                                        { OrderStrings.deliveryCost }
                                    </Text>
                                    <Text>
                                        { this.props.orderDeliveryFee }
                                    </Text>
                                </View>
                                <View style = { this.stylesView.deliverySub }>
                                    <Text style = { this.stylesText.deliveryTotal }>
                                        { OrderStrings.deliveryTotal }
                                    </Text>
                                    <Text style = { this.stylesText.deliveryTotalPrice }>
                                        { this.props.orderDeliveryTotal }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        : null
                    }
                    <View style = { this.stylesView.separator }/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}