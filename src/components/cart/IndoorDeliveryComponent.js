import React, { PureComponent } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { FontFamily, FontWeight, BackgroundColor } from "../../theme/Theme"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS } from "../../languages/index"
import { LANGUAGE } from "../../configs"
import { getOrderTypeMessageForBottom, IdOrderType, formatDeliveryTime } from "../../utils"
import { getOrderType } from "../../database/specialization/StorageGeneral"
import Images from "../../assets"
import IndoorDeliveryCellComponent from "./IndoorDeliveryCellComponent"
import IndoorDeliverySingleCellComponent from "./IndoorDeliverySingleCellComponent"

export default class IndoorDeliveryComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            marginHorizontal: 0,
            alignSelf: "stretch"
        },
        selectionList: {
            marginHorizontal: 15,
            marginVertical: 8,
            alignSelf: "stretch"
        },
        message: {
            marginHorizontal: 20,
            marginBottom: 8,
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center"
        },
        separator: {
            width: 8,
            backgroundColor: "transparent"
        },
        headerTitle: {
            height: 54,
            marginVertical: 8,
            marginHorizontal: 0,
            flexDirection: "row",
            backgroundColor: "rgb(242,242,242)",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch"
        },
    })

    stylesText = StyleSheet.create({
        headerTitle: {
            fontSize: 18,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)",
            marginLeft: 15
        },
        messageGeneral: {
            marginVertical: 8,
            textAlign: "center"
        },
        message: {
            fontSize: 12,
            fontWeight: FontWeight.medium,
            fontFamily: FontFamily.font,
            color:"rgb(128,128,128)"
        },
        messageBold: {
            fontSize: 12,
            fontWeight: FontWeight.bold,
            fontFamily: FontFamily.font,
            color:"rgb(61,61,61)"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderTypeList: [],
            selectedIndex: 99
        }

        this._setOrderTypeList(props.unityIndoorDeliveryMethods)
    }

    componentWillReceiveProps(nextProps) {
        this._setOrderTypeList(nextProps.unityIndoorDeliveryMethods)
    }

    _setOrderTypeList(unityIndoorDeliveryMethods) {
        if (unityIndoorDeliveryMethods.length == 1) {
            this.setState({
                orderTypeList: unityIndoorDeliveryMethods,
                selectedIndex: 0
            }, this._onSelectIndoorDeliveryMethod(unityIndoorDeliveryMethods[0]))
        } else {
            this.setState({
                orderTypeList: unityIndoorDeliveryMethods,
                selectedIndex: 99
            })
        }
    }

    _onSelectIndoorDeliveryMethod(indoorDeliveryMethod) {
        this.props.onSelectIndoorDeliveryMethod(indoorDeliveryMethod)
    }

    _onTapCell(index) {
        if (this.state.selectedIndex == index) {
            return
        } else {
            this.setState({
                selectedIndex: this.state.selectedIndex == index ? 99 : index
            }, () => this._onSelectIndoorDeliveryMethod(this.state.orderTypeList[index]))
        }
    }

    _renderItem = ({item, index}) => {
        if (this.state.orderTypeList.length > 1) {
            return (
                <IndoorDeliveryCellComponent orderType = { item }
                                             isSelected = { this.state.selectedIndex == index ? true : false }
                                             index = { index }
                                             numberOfCells = { this.state.orderTypeList.length }
                                             onTapCell = { this._onTapCell.bind(this) }
                />
            )
        } else {
            return (
                <IndoorDeliverySingleCellComponent orderType = { item }
                                                   isSelected = { this.state.selectedIndex == index ? true : false }
                                                   takeawayTimeText = { formatDeliveryTime(this.props.takeAwayEstimatedTime, this.props.takeAwayEstimatedIdUnitTime) }
                />
            )
        }
    }

    _keyExtractor = (item, index) => index

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _renderMessage() {
        if (this.state.selectedIndex != 99 && this.state.orderTypeList.length > 1) {
            let currentOrderType = this.state.orderTypeList[this.state.selectedIndex]
            let message = getOrderTypeMessageForBottom(currentOrderType)

            return (
                <Text style = {{textAlign: "center"}} accessibilityInfo = "textMessageTop">
                    <Text style = { this.stylesText.message }>
                        { message.firstMessage }
                    </Text>
                    <Text style = { this.stylesText.messageBold }>
                        { message.secondMessage }
                    </Text>
                    <Text style = { this.stylesText.message }>
                        { message.thirdMessage }
                    </Text>
                    { currentOrderType != IdOrderType.VOUCHER.id ?
                        <Text style = { this.stylesText.messageBold } >
                            { formatDeliveryTime(this.props.takeAwayEstimatedTime, this.props.takeAwayEstimatedIdUnitTime) }
                        </Text>
                        : null
                    }
                </Text>
            )
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityInfo = "viewGeneral">
                <View style={this.stylesView.headerTitle} accessibilityLabel="viewHeaderReviewItems">
                    <Text style={this.stylesText.headerTitle} accessibilityLabel="textReviewItems">
                        { CART_CONTAINER_STRINGS.indoorDeliveryComponent.headerTitleOutdoorDelivery }
                    </Text>
                </View>
                <View style = { this.stylesView.selectionList } accessibilityInfo = "viewSelectionList">
                    <FlatList
                        renderItem = { this._renderItem }
                        data = { this.state.orderTypeList }
                        keyExtractor = { this._keyExtractor }
                        extraData = { this.state }
                        horizontal = { true }
                        ItemSeparatorComponent = { this._renderSeparator }
                        disableVirtualization = { false }
                        onEndReachedThreshold = { 1200 }
                        removeClippedSubviews = { false }
                        scrollEventThrottle = { 1 }
                        scrollEnabled = { false }
                        accessibilityInfo = "listSelection"
                    />
                </View>
                <View style = { this.stylesView.message } accessibilityInfo = "viewMessage">
                    { this._renderMessage() }
                </View>
            </View>
        )
    }
}