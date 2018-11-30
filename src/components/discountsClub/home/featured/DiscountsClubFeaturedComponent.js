import React, { PureComponent } from "react"
import { StyleSheet, Platform, AppState, View, Text, FlatList } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../../../../theme/Theme"
import { screenHeightPercentage, screenWidthPercentage } from "../../../../utils"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS } from "../../../../languages"
import DiscountsClubFeaturedCellComponent from "./DiscountsClubFeaturedCellComponent"

export default class DiscountsClubFeaturedComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            paddingVertical: 8,
            backgroundColor: "rgb(238, 238, 238)"
        },
        flatList: {
            flex: 1,
            width: screenWidthPercentage(100),
            backgroundColor: "white"
        },
        flatListContainer: {
            paddingHorizontal: 10
        },
        title: {
            width: screenWidthPercentage(100),
            paddingVertical: 16,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: FontColor.secondary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            currentItem: 0
        }

        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50,
            minimumViewTime: 100
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <DiscountsClubFeaturedCellComponent featuredItem = { item }
                                                onSelectItem = { this.props.onSelectItem }
            />
        )
    }

    _keyExtractor = (item, index) => {
        return item.position + ""
    }

    _onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (Platform.OS === "android" && viewableItems.length > 0 && this.state.currentItem !== viewableItems[0].index) {
            this.state.currentItem = viewableItems[0].index
            this.flatListRef.scrollToIndex({ animated: true, index: this.state.currentItem, viewPosition: 0.5 })
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <View style = { this.stylesView.title } accessibilityLabel = "viewTitleFeatured">
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitleFeatured">
                        { DISCOUNTS_CLUB_CONTAINER_STRINGS.featuredComponent.title }
                    </Text>
                </View>

                <FlatList ref = { ref => this.flatListRef = ref }
                          style = { this.stylesView.flatList }
                          contentContainerStyle = { this.stylesView.flatListContainer }
                          data = { this.props.featuredList }
                          extraData = { this.props }
                          renderItem = { this._renderItem }
                          keyExtractor = { this._keyExtractor }
                          initialNumToRender = { 3 }
                          maxToRenderPerBatch = { 3 }
                          horizontal = { true }
                          snapToAlignment = { "center" }
                          snapToInterval = { screenWidthPercentage(100) - 80 + 20 }
                          decelerationRate = { 0 }
                          disableVirtualization = { false }
                          removeClippedSubviews = { false }
                          onEndReachedThreshold = { 160 }
                          scrollEventThrottle = { 160 }
                          showsHorizontalScrollIndicator = { false }
                          onViewableItemsChanged = { this._onViewableItemsChanged }
                          viewabilityConfig = { this.viewabilityConfig }
                />
            </View>
        )
    }
}

DiscountsClubFeaturedComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}