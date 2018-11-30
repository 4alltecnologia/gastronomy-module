import React, { PureComponent } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, SectionList } from "react-native"
import { screenWidthPercentage, screenHeightPercentage, PriceType, formatPrice } from "../../../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../../languages/index"
import { LANGUAGE } from "../../../../configs"
import ModifierHeaderComponent from "../ModifierHeaderComponent"
import SingleSelectionSubHeaderComponent from "./SingleSelectionSubHeaderComponent"
import ProductDescriptionComponent from "../ProductDescriptionComponent"

export default class SingleSelectionProductsListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        sectionList: {
            flex: 1
        },
        sectionHeader: {
            flex: 1
        },
        viewItem: {
            backgroundColor: "white"
        },
        viewRadioButton: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderColor: "gray",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        viewRadioButtonSelected: {
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: BackgroundColor.primary
        },
        separator: {
            backgroundColor: "#d1d1d1",
            height: 0.5
        },
        viewMain: {
            flexDirection: "row"
        },
        viewItemName: {
            flex: 0.7,
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 10
        },
        viewItemPriceInfo: {
            flex: 0.35,
            flexDirection: "row",
            justifyContent:"flex-end",
            alignItems: "center",
            marginRight: 15,
            marginTop: 10
        },
        viewMainRenderRadioButton: {
            width: 50,
            marginBottom: 5,
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center"
        },
        viewDesc: {
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 8,
            marginTop: 4
        }
    })

    stylesText = StyleSheet.create({
        textDesc: {
            fontSize: 12,
            fontWeight: FontWeight.medium,
            color:"rgb(128,128,128)",
            textAlign: "left"
        },
        textPriceInfo: {
            color:BackgroundColor.primary
        },
        textEmpty: {
            color:BackgroundColor.primary,
            fontSize: 25
        }
    })

    stylesImage = StyleSheet.create({
        minus:{
            width: 24,
            height: 24,
            tintColor:BackgroundColor.primary
        },
        plus:{
            width: 24,
            height: 24,
            tintColor:BackgroundColor.primary
        }
    })

    constructor(props){
        super(props)

        this.state = {
            listOptions: props.listOptions.sort((prodLeft, prodRight) => { return prodLeft.sortOrder < prodRight.sortOrder ? -1 : 1 })
        }
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
                <SingleSelectionSubHeaderComponent/>
            </View>
        )
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style = { this.stylesView.viewItem } onPress = { () => this.props.onSelectOption(item) } accessibilityLabel="touchableOpacityViewItem">
                <View style = { this.stylesView.separator } accessibilityLabel="viewDummy"/>
                <View style = { this.stylesView.viewMain } accessibilityLabel="viewMain">
                    <View style = { this.stylesView.viewMainRenderRadioButton } accessibilityLabel="viewMainRenderRadioButton">
                        { !!this.props.selectedOption && this.props.selectedOption.id === item.id ?
                            <View style = { this.stylesView.viewRadioButtonSelected } accessibilityLabel = "viewRadioButtonSelected"/> :
                            <View style = { this.stylesView.viewRadioButton } accessibilityLabel="viewRadioButton"/>
                        }
                    </View>
                    <View style = { this.stylesView.viewItemName } accessibilityLabel = "viewItemName">
                        <Text numberOfLines = { 2 } accessibilityLabel = "textName">
                            { item.name }
                        </Text>
                    </View>
                    <View style = { this.stylesView.viewItemPriceInfo } accessibilityLabel = "viewItemPriceInfo">
                        { this.props.priceType == PriceType.SUM_TOTAL && item.originalPrice > 0 ?
                            <Text style = { this.stylesText.textPriceInfo } accessibilityLabel="textPriceInfo">
                                { "+" + formatPrice(item.originalPrice, true) }
                            </Text>
                        : null }
                    </View>
                </View>
                <View style = { this.stylesView.viewDesc } accessibilityLabel = "viewDesc">
                    { !!item.desc ?
                    <Text style = { this.stylesText.textDesc } numberOfLines = { 3 } accessibilityLabel = "textDesc">
                        { item.desc }
                    </Text>
                    : null }
                </View>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => {
        return item.id + ""
    }

    render() {
        return(
            <SectionList style = { this.stylesView.sectionList }
                         renderItem = { this._renderItem }
                         renderSectionHeader = { this._renderSection }
                         sections = { [{ data: this.state.listOptions }] }
                         ListHeaderComponent = { this._renderHeader }
                         keyExtractor = { this._keyExtractor }
                         stickySectionHeadersEnabled = { true }
                         extraData = { this.state }
                         initialNumToRender = { 12 }
                         maxToRenderPerBatch = { 12 }
                         disableVirtualization = { false }
                         onEndReachedThreshold = { 200 }
                         removeClippedSubviews = { false }
                         accessibilityLabel = "sectionListSingleSelectionModifiers"
            />
        )
    }
}