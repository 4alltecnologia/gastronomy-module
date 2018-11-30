import React, { PureComponent } from "react"
import { StyleSheet, View, Text, SectionList, RefreshControl } from "react-native"
import { FontFamily, FontWeight, BackgroundColor } from "../../theme/Theme"
import { UNITY_LIST_COMPONENT_STRINGS as UnityListStrings, GENERAL_STRINGS } from "../../languages/index"
import UnityListCellComponent from "./UnityListCellComponent"
import UnityListHeaderComponent from "./UnityListHeaderComponent"
import NoUnitiesWarning from "../messages/NoUnitiesWarning"

export default class UnityListComponent extends PureComponent {
    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "rgb(234,234,234)"
        },
        content: {
            backgroundColor: BackgroundColor.primary
        },
        separator: {
            height: 1,
            backgroundColor: "#d1d1d1",
            marginHorizontal: 20,
            alignSelf: "stretch"
        },
        separatorView: {
            backgroundColor: "white"
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
            closedUnities: props.closedUnities
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            address: nextProps.address,
            loading: nextProps.loading,
            openUnities: nextProps.openUnities,
            closedUnities: nextProps.closedUnities
        })
    }

    _renderItem = ({ section, item }) => {
        return (
            <UnityListCellComponent onSelectUnity = { this.props.onSelectUnity } unity = { item }/>
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separatorView }>
                <View style = { this.stylesView.separator }/>
            </View>
        )
    }

    _renderSectionHeader = ({section}) => {
        return section.data.length > 0 && !!section.title ? (<UnityListHeaderComponent title = { section.title }/>) : null
    }

    _keyExtractor = (item, index) => item.id

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                { this.props.openUnities.length > 0 || this.props.closedUnities.length > 0 || this.props.isRefreshing ?
                    <SectionList
                        contentContainerStyle = { this.stylesView.content }
                        renderItem = { this._renderItem }
                        renderSectionHeader = { this._renderSectionHeader }
                        sections = { [{data: this.state.openUnities}, {
                            data: this.state.closedUnities,
                            title: UnityListStrings.closedUnities
                        }] }
                        ItemSeparatorComponent = { this._renderSeparator }
                        keyExtractor = { this._keyExtractor }
                        stickySectionHeadersEnabled = { true }
                        extraData = { this.state }
                        refreshControl = {
                            <RefreshControl
                                refreshing = { this.props.isRefreshing }
                                onRefresh={() => this.props.onRefresh() }
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
                    :
                    <NoUnitiesWarning tryAgain = { this.props.onRefresh }/>
                }
            </View>
        )
    }
}