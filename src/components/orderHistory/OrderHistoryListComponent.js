import React, { Component } from "react"
import { View, StyleSheet, RefreshControl, FlatList, Platform } from "react-native"
import { LANGUAGE } from "../../configs"
import Images from "../../assets/index"
import { ORDER_STATUS_COMPONENT_STRINGS as OrderStrings, GENERAL_STRINGS } from "../../languages/index"
import { screenWidthPercentage, screenHeightPercentage, getOrderStatusMessage, OrderStatus, getUnityMedia, MediaTypes, isOrderStatusBeingUsed, UsedOutdoorDeliveryOrderStatus, UsedIndoorDeliveryOrderStatus, formatPrice, IdOrderType } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import OrderHistoryCellComponent from "./OrderHistoryCellComponent"

let CURRENT_SCROLL_OFFSET = 0
const SCREEN_HEIGHT = screenHeightPercentage(100)

export default class OrderHistoryListComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100)
        },
        flatList: {
            width: screenWidthPercentage(100)
        },
        separator: {
            height: 1,
            marginHorizontal: 20,
            alignSelf: "stretch",
            backgroundColor: "#d1d1d1"
        },
        orderStatusList: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            marginBottom: 20,
            paddingBottom: 16,
            backgroundColor: "white"
        },
    })

    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: 99,
            orderList: !!props.orderList ? props.orderList : [],
            isRefreshing: props.isRefreshing
        }

        this.onTapCell = this._onTapCell.bind(this)
        this.onRefresh = this._onRefresh.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orderList: !!nextProps.orderList ? nextProps.orderList : [],
            isRefreshing: nextProps.isRefreshing
        })
    }

    _onRefresh() {
        this.props.refreshList()
    }

    _onTapCell(index) {
        this.setState({
            selectedIndex: this.state.selectedIndex == index ? 99 : index
        }, () => this._scrollTo(index))
    }

    _scrollTo(index) {
        let cellOffset = 93 * index
        let scrollToOffset = 0
        let didChange = false

        if (this.CURRENT_SCROLL_OFFSET > cellOffset) {
            scrollToOffset = cellOffset
            didChange = true
        } else if ((cellOffset + 520) > (SCREEN_HEIGHT + CURRENT_SCROLL_OFFSET)) {
            scrollToOffset = ((93 * index) + 600) - SCREEN_HEIGHT
            didChange = true
        }

        if (didChange) {
            if (Platform.OS === "android") {
                setTimeout(() => {
                    this.flatListRef.scrollToOffset({ offset: scrollToOffset })
                }, 1)
            } else {
                this.flatListRef.scrollToOffset({ offset: scrollToOffset })
            }
        }
    }

    _renderItem = ({item, index}) => {
        let listStatus = []
        let usedListStatus = item.idOrderType == IdOrderType.DELIVERY.id ? UsedOutdoorDeliveryOrderStatus : UsedIndoorDeliveryOrderStatus
        let orderItems = []
        let isCanceled = false
        let isOpen = false
        let orderAddress = ""
        let orderDeliveryFee = ""
        let orderDeliveryTotal = ""

        if (this.state.selectedIndex == index) {
            listStatus = item.orderStatusLog.filter((status, index, self) => self.findIndex(statusToFilter => statusToFilter.idOrderStatus === status.idOrderStatus) === index).filter((status) => isOrderStatusBeingUsed(status.idOrderStatus, item.idOrderType == IdOrderType.DELIVERY.id ? true : false) == true)
            isOpen = true
            orderDeliveryFee = formatPrice(item.deliveryFee)
            orderDeliveryTotal = formatPrice(item.total)
            orderItems = item.orderItems

            if (!!item.orderAddress) {
                let complement = !!item.orderAddress.complement ? "/" + item.orderAddress.complement : ""
                let primaryAddress = item.orderAddress.street + ", " + item.orderAddress.number + complement
                let secondaryAddress = item.orderAddress.neighborhood + ", " + item.orderAddress.city + "/" + item.orderAddress.uf

                orderAddress = primaryAddress + " - " + secondaryAddress
            }
        }

        return (
            <OrderHistoryCellComponent orderStatus = { item.status }
                                       orderId = { item.id }
                                       unityName = { item.unity.name }
                                       unityLogo = { getUnityMedia(MediaTypes.LOGO, item.unity.media) }
                                       deliveryTime = { item.status == OrderStatus.CANCELLED || item.status == OrderStatus.DELIVERED ? item.lastChangeTimestamp : item.estimatedTimestamp }
                                       deliveryMethod = { item.idOrderType }
                                       orderAddress = { orderAddress }
                                       orderDeliveryFee = { orderDeliveryFee }
                                       orderDeliveryTotal = { orderDeliveryTotal }
                                       orderItems = { orderItems }
                                       listStatus = { listStatus }
                                       usedListStatus = { usedListStatus }
                                       isOrderCanceled = { item.status == OrderStatus.CANCELLED ?  true : false }
                                       isOpen = { isOpen }
                                       index = { index }
                                       onTapCell = { this.onTapCell }
            />
        )
    }

    _keyExtractor = (item, index) => {
        return item.id + ""
    }

    render() {
        return (
            <FlatList ref = { ref => (this.flatListRef = ref) }
                      data = { this.state.orderList }
                      extraData = { this.state }
                      renderItem = { this._renderItem }
                      keyExtractor = { this._keyExtractor }
                      refreshControl = {
                          <RefreshControl refreshing = { this.state.isRefreshing }
                                          onRefresh = { this.onRefresh }
                                          title = { GENERAL_STRINGS.loading }
                                          tintColor = { BackgroundColor.primary }
                                          titleColor = { BackgroundColor.primary }
                          />
                      }
                      initialNumToRender = { 10 }
                      maxToRenderPerBatch = { 10 }
                      disableVirtualization = { false }
                      removeClippedSubviews = { false }
                      onEndReachedThreshold = { 160 }
                      scrollEventThrottle = { 160 }
            />
        )
    }
}