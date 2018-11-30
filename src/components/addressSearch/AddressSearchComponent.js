import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TextInput, FlatList, TouchableOpacity, RefreshControl, Image } from "react-native"
import { ADDRESS_SEARCH_CONTAINER_STRINGS, NO_ADDRESS_FOUND_WARNING_STRINGS } from "../../languages"
import NoAddressFoundWarning from "../messages/NoAddressFoundWarning"
import Images from "../../assets"
import { FontFamily, BackgroundColor, FontWeight, FontColor } from "../../theme/Theme"
import { formatZipCode, UserAddressType } from "../../utils"
import AddressSearchCellComponent from "./AddressSearchCellComponent"

export default class AddressSearchComponent extends PureComponent {

    stylesView = StyleSheet.create({
        scroll: {
            flex: 1
        },
        viewTitle: {
            flexDirection: "row",
            marginVertical: 20,
            marginHorizontal: 10
        },
        viewInput: {
            flex: 1
        },
        viewList: {
            flex: 1,
            marginTop: 10
        },
        addressContainer: {
            flex: 1,
            flexDirection:"row"
        },
        addressViewInfo: {
            flex: 0.9
        },
        addressItem: {
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
        },
        viewActivityIndicator: {
            justifyContent: "center",
            flex: 1
        },
        activityIndicator: {
            marginLeft: 10,
            flex: 0.0
        },
        sectionSeparator: {
            height: 0.75,
            marginHorizontal: 24,
            backgroundColor: "#d1d1d1"
        },
        addressViewIcon: {
            width: 44,
            height: 44,
            paddingVertical: 1,
            alignItems: "center",
            justifyContent: "flex-start"
        },
        viewWarning: {
            marginTop: 20
        }
    })

    stylesText = StyleSheet.create({
        addressStreet: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.bold,
            fontStyle: "normal",
            textAlign: "left",
            color: FontColor.secondary
        },
        addressInfo: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            fontStyle: "normal",
            textAlign: "left",
            color: FontColor.secondary
        },
        inputSearch: {
            fontSize: 14,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 8
        },
        title: {
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.semibold,
            textAlign: "left",
            color: FontColor.secondary
        }
    })

    stylesImage = StyleSheet.create({
        pin: {
            height: 32,
            width: 32,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        }
    })

    _renderItem = ({item, index}) => {
        return (
            <AddressSearchCellComponent address = { item }
                                        selectAddress = { this.props.selectAddress }/>
        )

    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.sectionSeparator } accessibilityLabel = "viewSeparator"/>
        )
    }

    _keyExtractor = (item, index) => {
        return index + ""
    }

    render() {
        return (
            <ScrollView style = { this.stylesView.scroll } accessibilityLabel = "scroll">
                <View style = { this.stylesView.viewTitle }>
                    <View style = { this.stylesView.addressViewIcon } accessibilityLabel = "viewAddressIcon">
                        <Image style = { this.stylesImage.pin } source = { this.props.userAddressType === UserAddressType.HOME ? Images.icons.pinHome : this.props.userAddressType === UserAddressType.WORK ? Images.icons.pinWork : Images.icons.pinLocation } accessibilityLabel = "imageAddressPin"/>
                    </View>
                    <Text style = { this.stylesText.title } accessibilityLabel = "viewAddressTitle">
                        { this.props.userAddressType === UserAddressType.HOME ? ADDRESS_SEARCH_CONTAINER_STRINGS.titleHome : this.props.userAddressType === UserAddressType.WORK ? ADDRESS_SEARCH_CONTAINER_STRINGS.titleWork : ADDRESS_SEARCH_CONTAINER_STRINGS.titleAddress }
                    </Text>
                </View>

                <View style = { this.stylesView.viewInput } accessibilityLabel = "viewInput">
                    <TextInput
                        style = { this.stylesText.inputSearch }
                        onChangeText = { (text) => this.props.changeText(text) }
                        placeholder = { ADDRESS_SEARCH_CONTAINER_STRINGS.placeholder }
                        underlineColorAndroid = "#ffffff"
                        maxLength = { this.props.isAddress ? 100 : 9 }
                        value = { this.props.isAddress ? this.props.text : formatZipCode(this.props.text) }
                        onFocus = { () => this.props.changeText("") }
                        accessibilityLabel = "textInputStreetNameZipCode"
                    />
                    <View style = { this.stylesView.sectionSeparator } accessibilityLabel = "viewSeparator"/>
                </View>

                <View style = { this.stylesView.viewList } accessibilityLabel = "viewListResults">
                    { (!this.props.refreshingList && this.props.text.length >= 3) &&
                        <FlatList
                            data = { this.props.results }
                            extraData = { this.props }
                            keyExtractor = { this._keyExtractor }
                            ItemSeparatorComponent = { this._renderSeparator }
                            refreshControl = {
                                <RefreshControl
                                    refreshing = { this.props.refreshingList }
                                />
                            }
                            renderItem = { this._renderItem }
                            accessibilityLabel = "flatListSearchResults"/>
                    }
                    { (!this.props.refreshingList && this.props.text.length >= 3 && this.props.results.length === 0) &&
                        <View style = { this.stylesView.viewWarning } accessibilityLabel = "viewWarning">
                            <NoAddressFoundWarning image = { Images.icons.noData } firstMessage = { NO_ADDRESS_FOUND_WARNING_STRINGS.firstMessageNoResults } secondMessage = { NO_ADDRESS_FOUND_WARNING_STRINGS.secondMessageNoResults }/>
                        </View>
                    }
                </View>
            </ScrollView>
        )
    }
}