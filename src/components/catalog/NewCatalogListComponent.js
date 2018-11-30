import React, { Component } from "react"
import { View, StyleSheet, RefreshControl, FlatList, SectionList } from "react-native"
import { LANGUAGE } from "../../configs"
import Images from "../../assets/index"
import { ORDER_STATUS_COMPONENT_STRINGS as OrderStrings, GENERAL_STRINGS } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import NewCatalogCellComponent from "./NewCatalogCellComponent"
import NewCatalogSectionHeaderComponent from "./NewCatalogSectionHeaderComponent"

export default class NewCatalogListComponent extends Component {

    stylesView = StyleSheet.create({
        flatList: {
            width: screenWidthPercentage(100),
            backgroundColor: "white"
        },
        separator: {
            height: 1,
            marginHorizontal: 20,
            alignSelf: "stretch",
            backgroundColor: "#d1d1d1"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            sectionList: !!props.sectionList ? props.sectionList : []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sectionList: !!nextProps.sectionList ? nextProps.sectionList : []
        })
    }

    _renderSectionHeader = ({section}) => {
        if (!!section.name) {
            return (
                <NewCatalogSectionHeaderComponent title = { section.name }/>
            )
        } else {
            return null
        }
    }

    _renderItem = ({item, index}) => {
        return (
            <NewCatalogCellComponent item = { item }
                                     onSelectProduct = { this.props.onSelectProduct }
                                     cameFromCheck = { this.props.cameFromCheck }
                                     addProduct = { this.props.addProduct }
                                     removeProduct = { this.props.removeProduct }
            />
        )
    }

    _renderSeparator = (item) => {
        return (
            <View style = { this.stylesView.separator } accessibilityLabel = "viewSeparator"/>
        )
    }

    _keyExtractor = (item, index) => {
        if (!!item.idOnCart) {
            return item.id + "" + item.idOnCart
        } else {
            return item.id + ""
        }
    }

    render() {
        return (
            <SectionList ref = { ref => ( this.flatListRef = ref )}
                         style = { this.stylesView.flatList }
                         sections = { this.state.sectionList }
                         renderItem = { this._renderItem }
                         renderSectionHeader = { this._renderSectionHeader }
                         ItemSeparatorComponent = { this._renderSeparator }
                         keyExtractor = { this._keyExtractor }
                         extraData = { this.state }
                         initialNumToRender = { 12 }
                         maxToRenderPerBatch = { 12 }
                         disableVirtualization = { false }
                         onEndReachedThreshold = { 1200 }
                         removeClippedSubviews = { false }
                         scrollEnabled = { false }
                         accessibilityLabel = "sectionList"
            />
        )
    }
}