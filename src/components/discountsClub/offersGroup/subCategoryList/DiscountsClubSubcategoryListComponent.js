import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Animated } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor } from "../../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../../languages/index"
import DiscountsClubSubcategoryListCellComponent from "./DiscountsClubSubcategoryListCellComponent"
import DiscountsClubSubcategoryHeaderComponent from "./DiscountsClubSubcategoryHeaderComponent"

export default class DiscountsClubSubcategoryListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "rgb(234,234,234)"
        },
        contentContainer: {
            backgroundColor: "rgb(234,234,234)",
            paddingBottom: 12
        },
        separator: {
            height: 12,
            backgroundColor: "rgb(234,234,234)",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    _renderHeader = () => {
        return (
            <DiscountsClubSubcategoryHeaderComponent title = { this.props.offersGroup.name }
                                                     scrollY = { this.state.scrollY }
            />
        )
    }

    _renderItem = ({ item, index }) => {
        return (
            <DiscountsClubSubcategoryListCellComponent category = { item }
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
            <FlatList style = { this.stylesView.general }
                      contentContainerStyle = { this.stylesView.contentContainer }
                      numColumns = { 2 }
                      data = { this.props.data }
                      extraData = { this.props }
                      keyExtractor = { this._keyExtractor }
                      renderItem = { this._renderItem }
                      ListHeaderComponent = { this._renderHeader }
                      ItemSeparatorComponent = { this._renderSeparator }
                      refreshControl = {
                          <RefreshControl refreshing = { this.props.isRefreshing }
                                          onRefresh = { () => this.props.refreshList() }
                                          title = { GENERAL_STRINGS.loading }
                                          tintColor = { BackgroundColor.secondary }
                                          titleColor = { BackgroundColor.secondary }
                          />
                      }
                      initialNumToRender = { 10 }
                      maxToRenderPerBatch = { 8 }
                      stickyHeaderIndices = { [0] }
                      scrollEventThrottle = { 16 }
                      onScroll = { Animated.event(
                          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                      )}
                      disableVirtualization = { false }
                      onEndReachedThreshold = { 100 }
                      removeClippedSubviews = { false }
                      accessibilityLabel = "flatlistTradesman"
            />
        )
    }
}

DiscountsClubSubcategoryListComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}