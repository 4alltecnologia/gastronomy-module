import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Animated } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor } from "../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../languages"
import DiscountsClubTradesmanListCellComponent from "./DiscountsClubTradesmanListCellComponent"
import DiscountsClubTradesmanListHeaderComponent from "./DiscountsClubTradesmanListHeaderComponent"

export default class DiscountsClubTradesmanListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "rgb(234,234,234)"
        },
        contentContainer: {
            backgroundColor: BackgroundColor.primary
        },
        separator: {
            height: 8,
            backgroundColor: "rgb(234,234,234)",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)
    }

    _renderItem = ({ item, index }) => {
        return (
            <DiscountsClubTradesmanListCellComponent tradesman = { item }
                                                     onSelectItem = { this.props.onSelectItem }
            />
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = ( item, index ) => {
        return index + ""
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <DiscountsClubTradesmanListHeaderComponent offersGroupName = { this.props.offersGroup.name }
                                                           previousOffersGroupName = { this.props.previousOffersGroup.name }
                />
                <FlatList style = { this.stylesView.general }
                          contentContainerStyle = { this.stylesView.contentContainer }
                          data = { this.props.data.items }
                          extraData = { this.props }
                          keyExtractor = { this._keyExtractor }
                          renderItem = { this._renderItem }
                          ItemSeparatorComponent = { this._renderSeparator }
                          refreshControl = {
                              <RefreshControl refreshing = { this.props.isRefreshing }
                                              onRefresh = { () => this.props.refreshList() }
                                              title = { GENERAL_STRINGS.loading }
                                              tintColor = { BackgroundColor.secondary }
                                              titleColor = { BackgroundColor.secondary }
                              />
                          }
                          initialNumToRender = { 8 }
                          maxToRenderPerBatch = { 8 }
                          disableVirtualization = { false }
                          onEndReachedThreshold = { 100 }
                          removeClippedSubviews = { false }
                          accessibilityLabel = "flatlistTradesman"
                />
            </View>
        )
    }
}

DiscountsClubTradesmanListComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}