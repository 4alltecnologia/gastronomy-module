import React, { Component } from "react"
import { StyleSheet, View, Text, FlatList, Animated } from "react-native"
import PropTypes from "prop-types"
import Images from "../../assets/index"
import { ORDER_TYPE_SELECTION_COMPONENT_STRINGS as OrderTypeStrings, OFFERS_CONTAINER_STRINGS as OffersStrings } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import OrderTypeSelection from "../../models/orderType/OrderTypeSelection"
import OfferOrderTypeSelectionCellComponent from "./OfferOrderTypeSelectionCellComponent"

export default class OffersOrderTypeSelectionComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            marginTop: 8,
            paddingHorizontal: 20
        },
        flatList: {
            marginTop: 16
        },
        separator: {
            width: 16,
            backgroundColor: "white"
        },
        offerSelectionHeader: {
            height: 96,
            width: screenWidthPercentage(100)
        }
    })

    stylesText = StyleSheet.create({
        headerTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 24,
            color: FontColor.secondary
        }
    })

    constructor(props) {
        super(props)
    }

    _renderItem = ({item, index}) => {
        let isSelected = this.props.selectedOrderTypeSelectionList.filter(orderType => (item.idOrderType.id == orderType.idOrderType.id)).length > 0

        return (
            <OfferOrderTypeSelectionCellComponent orderTypeSelectionItem = { item }
                                                  isSelected = { isSelected }
                                                  onPressOrderType = { this.props.onPressOrderType }
                                                  orderTypeSelectionListLength = { this.props.orderTypeSelectionList.length }
            />
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = (item, index) => {
        return item.idOrderType.id + ""
    }

    render() {
        return (
            <View style = { this.stylesView.general }  accessibilityLabel = "viewGeneralOffersComponent">
                <Text style = { this.stylesText.headerTitle } accessibilityLabel = "text">
                    { OffersStrings.offersNearby }
                </Text>
                <FlatList style = { this.stylesView.flatList }
                          horizontal = { true }
                          data = { this.props.orderTypeSelectionList }
                          extraData = { this.props }
                          keyExtractor = { this._keyExtractor }
                          renderItem = { this._renderItem }
                          ItemSeparatorComponent = { this._renderSeparator }
                          initialNumToRender = { 4 }
                          maxToRenderPerBatch = { 4 }
                          scrollEnabled = { false }
                          disableVirtualization = { false }
                          onEndReachedThreshold = { 1200 }
                          removeClippedSubviews = { false }
                          accessibilityLabel = "flatListOfferOrderTypeSelection"
                />
            </View>
        )
    }
}

OffersOrderTypeSelectionComponent.propTypes = {
    orderTypeSelectionList: PropTypes.arrayOf(PropTypes.instanceOf(OrderTypeSelection)).isRequired,
    selectedOrderTypeSelectionList: PropTypes.arrayOf(PropTypes.instanceOf(OrderTypeSelection)).isRequired,
    onPressOrderType: PropTypes.func.isRequired,
}