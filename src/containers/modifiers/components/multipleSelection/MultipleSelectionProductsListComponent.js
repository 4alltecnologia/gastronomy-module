import React, { PureComponent } from "react"
import { View, StyleSheet, FlatList, SectionList } from "react-native"
import MultipleSelectionProductsListCellComponent from "./MultipleSelectionProductsListCellComponent"
import MultipleSelectionSubHeaderComponent from "./MultipleSelectionSubHeaderComponent"
import ModifierHeaderComponent from "../ModifierHeaderComponent"
import ProductDescriptionComponent from "../ProductDescriptionComponent"

export default class MultipleSelectionProductsListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        sectionList: {
            flex: 1
        },
        separator: {
            height: 0.5,
            backgroundColor: "#d1d1d1",
            marginHorizontal: 0,
            alignSelf: "stretch"
        },
        sectionHeader: {
            flex: 1
        }
    })

    constructor(props){
        super(props)

        this.state = {
            listSelectedOptions: props.listSelectedOptions,
            listOptions: props.listOptions.sort((prodLeft, prodRight) => { return prodLeft.sortOrder < prodRight.sortOrder ? -1 : 1 })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listSelectedOptions: nextProps.listSelectedOptions
        })
    }

    _renderHeader = () => {
        return (
            <ProductDescriptionComponent product = { this.props.product }/>
        )
    }

    _renderSection = () => {
        return (
            <View style = { this.stylesView.sectionHeader }>
                <ModifierHeaderComponent quantitySteps = { this.props.quantitySteps }
                                         currentStep = { this.props.currentStep }
                />
                <MultipleSelectionSubHeaderComponent min = { this.props.min }
                                                     max = { this.props.max }
                                                     quantitySelected = { this.props.quantitySelected }
                />
            </View>

        )
    }

    _renderItem = ({ item, index }) => {
        let itemQuantity = this.state.listSelectedOptions.filter((option) => { return option.id == item.id }).length

        return (
            <MultipleSelectionProductsListCellComponent item = { item }
                                                        itemQuantity = { itemQuantity }
                                                        priceType = { this.props.modifier.priceType }
                                                        onPlus = { this.props.onPlus }
                                                        onMinus = { this.props.onMinus }
            />
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = (item, index) => {
        return item.id + ""
    }

    render() {
        return (
            <SectionList style = { this.stylesView.sectionList }
                         renderItem = { this._renderItem }
                         renderSectionHeader = { this._renderSection }
                         sections = { [{ data: this.state.listOptions }] }
                         ListHeaderComponent = { this._renderHeader }
                         ItemSeparatorComponent = { this._renderSeparator }
                         keyExtractor = { this._keyExtractor }
                         stickySectionHeadersEnabled = { true }
                         extraData = { this.state }
                         initialNumToRender = { 12 }
                         maxToRenderPerBatch = { 12 }
                         disableVirtualization = { false }
                         onEndReachedThreshold = { 200 }
                         removeClippedSubviews = { false }
                         accessibilityLabel = "sectionListMultipleSelectionModifiers"
            />
        )
    }
}
