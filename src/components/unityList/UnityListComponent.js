import React, { Component } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableOpacity, SectionList, RefreshControl, TouchableWithoutFeedback, Animated } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor  } from "../../theme/Theme"
import { UNITY_LIST_COMPONENT_STRINGS as UnityListStrings, GENERAL_STRINGS } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import UnityListCellComponent from "./UnityListCellComponent"
import UnityListHeaderComponent from "./UnityListHeaderComponent"

const ADDRESS_BAR_HEIGHT = 40
const ADDRESS_BAR_TEXT_OPACITY = 1

export default class UnityListComponent extends Component {

    styleView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        },
        topBarBackground : {
            backgroundColor: "#3d3d3d",
            width: screenWidthPercentage(100),
            height: 40,
            justifyContent: "center"
        },
        separator: {
            height: 1,
            backgroundColor: "#d1d1d1",
            marginHorizontal: 20,
            alignSelf: "stretch"
        }
    })

    stylesText = StyleSheet.create({
        address: {
            marginLeft: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            color: "white",
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            address: props.address,
            loading: props.loading,
            openUnities: props.openUnities,
            closedUnities: props.closedUnities,
            addressBarHeight: new Animated.Value(0),
            addressTextOpacity: new Animated.Value(0)
        }

        if (!!props.address) {
            setTimeout(()=> {
                Animated.parallel([
                    Animated.spring(this.state.addressBarHeight, {toValue: ADDRESS_BAR_HEIGHT}),
                    Animated.spring(this.state.addressTextOpacity, {toValue: ADDRESS_BAR_TEXT_OPACITY})
                ]).start()
            }, 1000)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            address: nextProps.address,
            loading: nextProps.loading,
            openUnities: nextProps.openUnities,
            closedUnities: nextProps.closedUnities
        })

        if (!!nextProps.address) {
            setTimeout(()=> {
                Animated.parallel([
                    Animated.spring(this.state.addressBarHeight, {toValue: ADDRESS_BAR_HEIGHT}),
                    Animated.spring(this.state.addressTextOpacity, {toValue: ADDRESS_BAR_TEXT_OPACITY})
                ]).start()
            }, 1000)
        }
    }

    _renderItem = ({ section, item }) => {
        return (
            <UnityListCellComponent onSelectUnity = { this.props.onSelectUnity } unity = { item }/>
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.styleView.separator }/>
        )
    }

    _renderSectionHeader = ({section}) => {
        return section.data.length > 0 && !!section.title ? (<UnityListHeaderComponent title = { section.title }/>) : null
    }

    _keyExtractor = (item, index) => item.id

    render() {
        return (
            <View style = { this.styleView.general } accessibilityLabel = "viewContent">
                <Animated.View style = { [this.styleView.topBarBackground, { height: this.state.addressBarHeight }] } accessibilityLabel = "viewTopBarBackground">
                    <Animated.Text style = { [this.stylesText.address, { opacity: this.state.addressTextOpacity }] } numberOfLines = { 1 } accessibilityLabel = "textAddress">
                        { this.props.address }
                    </Animated.Text>
                </Animated.View>
                <View style = { this.styleView.general } accessibilityLabel = "viewSectionList">
                    <SectionList
                        renderItem = { this._renderItem }
                        renderSectionHeader = { this._renderSectionHeader }
                        sections = { [{ data: this.state.openUnities }, { data: this.state.closedUnities, title: UnityListStrings.closedUnities }] }
                        ItemSeparatorComponent = { this._renderSeparator }
                        keyExtractor = { this._keyExtractor }
                        stickySectionHeadersEnabled = { true }
                        extraData = { this.state }
                        refreshControl = {
                            <RefreshControl
                                refreshing = { this.props.isRefreshing }
                                onRefresh = { () => this.props.onRefresh() }
                                title = { GENERAL_STRINGS.loading }
                                tintColor = { BackgroundColor.primary }
                                titleColor = { BackgroundColor.primary }
                            />
                        }
                        initialNumToRender = { 12 }
                        maxToRenderPerBatch = { 12 }
                        disableVirtualization = { false }
                        onEndReachedThreshold = { 1200 }
                        removeClippedSubviews = { false }
                    />
                </View>
            </View>
        )
    }
}
