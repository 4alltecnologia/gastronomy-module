import React, { PureComponent } from "react"
import { StyleSheet, View, AppState, FlatList } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor } from "../../../../theme/Theme"
import { screenHeightPercentage, screenWidthPercentage } from "../../../../utils"
import DiscountsClubCategoryCellComponent from "./DiscountsClubCategoryCellComponent"

export default class DiscountsClubCategoryComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            backgroundColor: "white"
        },
        flatListContainer: {
            paddingLeft: 10
        },
    })

    constructor(props) {
        super(props)
    }

    _renderItem = ({ item, index }) => {
        return (
            <DiscountsClubCategoryCellComponent categoryItem = { item }
                                                onSelectItem = { this.props.onSelectItem }
            />
        )
    }

    _keyExtractor = (item, index) => {
        return item.position + ""
    }

    render() {
        return (
            <FlatList style = { this.stylesView.general }
                      contentContainerStyle = { this.stylesView.flatListContainer }
                      data = { this.props.categoryList }
                      extraData = { this.props }
                      renderItem = { this._renderItem }
                      keyExtractor = { this._keyExtractor }
                      initialNumToRender = { 5 }
                      maxToRenderPerBatch = { 5 }
                      horizontal = { true }
                      disableVirtualization = { false }
                      removeClippedSubviews = { false }
                      onEndReachedThreshold = { 160 }
                      scrollEventThrottle = { 160 }
                      showsHorizontalScrollIndicator = { false }
            />
        )
    }
}

DiscountsClubCategoryComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}