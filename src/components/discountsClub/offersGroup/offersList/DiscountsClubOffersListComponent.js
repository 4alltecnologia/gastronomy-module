import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Animated } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor } from "../../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../../languages/index"
import DiscountsClubOffersListHeaderComponent from "./DiscountsClubOffersListHeaderComponent"
import DiscountsClubOffersListCellComponent from "./DiscountsClubOffersListCellComponent"

export default class DiscountsClubOffersListComponent extends PureComponent {
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

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    _renderHeader = () => {
        return (
            <DiscountsClubOffersListHeaderComponent title = { this.props.offersGroup.name }
                                                    scrollY = { this.state.scrollY }
            />
        )
    }

    _renderItem = ({ item, index }) => {
        return (
            <DiscountsClubOffersListCellComponent offer = { item }
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
                      data = { this.props.data }
                      extraData = { this.props }
                      keyExtractor = { this._keyExtractor }
                      renderItem = { this._renderItem }
                      ListHeaderComponent = { this._renderHeader }
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
                      stickyHeaderIndices = { [0] }
                      scrollEventThrottle = { 16 }
                      onScroll = { Animated.event(
                          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                      )}
                      disableVirtualization = { false }
                      onEndReachedThreshold = { 100 }
                      removeClippedSubviews = { false }
                      accessibilityLabel = "flatListOffers"
            />
        )
    }
}

DiscountsClubOffersListComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}