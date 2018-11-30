import React, { PureComponent } from "react"
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, RefreshControl, Animated } from "react-native"
import { screenHeightPercentage, screenWidthPercentage, UserAddressType } from "../../utils"
import { FontFamily, BackgroundColor, FontWeight, FontColor } from "../../theme/Theme"
import LinearGradient from "react-native-linear-gradient"
import { ADDRESS_LIST_CONTAINER_STRINGS } from "../../languages"
import AddressListCellComponent from "./AddressListCellComponent"
import AddressListHeaderComponent from "./AddressListHeaderComponent"

export default class AddressListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        container: {
            flex: 1
        },
        flatList: {
            height: screenHeightPercentage(35),
            marginBottom: 16
        },
        list: {
            flex: 1
        },
        mainSeparator: {
            height: 0.75,
            backgroundColor: "#d1d1d1"
        },
        listSeparator: {
            height: 0.75,
            marginHorizontal: 20,
            backgroundColor: "#d1d1d1"
        },
        title: {
            flexDirection: "column",
            marginVertical: 20,
            marginLeft: 30,
        }
    })

    stylesText = StyleSheet.create({
        addressTitle: {
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.semibold,
            textAlign: "left",
            color: FontColor.secondary
        },
        addressSubtitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.bold,
            textAlign: "left",
            color: FontColor.secondary
        }
    })

    stylesButton = StyleSheet.create({
        buttonNewAddressGradient: {
            borderRadius: 8,
            height: 44,
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 8
        },
        labelButtonNewAddress: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
            textAlign: "center",
            backgroundColor: "transparent",
            width: screenWidthPercentage(90)
        }
    })

    constructor(props){
        super(props)
    }

    _renderAddress = ({item, index}) => {
        return (
            <AddressListCellComponent address = { item }
                                      error = { null }
                                      addressType = { UserAddressType.CUSTOM }
                                      addAddress = { this.props.addAddress }
                                      deleteAddress = { this.props.deleteAddress }
                                      selectAddress = { this.props.selectAddress }/>
        )

    }

    _renderHeader = () => {
        return (
            <AddressListHeaderComponent addressGps = { this.props.addressGps }
                                        error = { this.props.error }
                                        addressHome = { this.props.addressList.home }
                                        addressWork = { this.props.addressList.work }
                                        activateGps = { this.props.activateGps }
                                        addAddress = { this.props.addAddress }
                                        deleteAddress = { this.props.deleteAddress }
                                        selectAddress = { this.props.selectAddress }/>
        )
    }

    _renderSeparator = () => {
        return (
            <View accessibilityLabel = "viewSeparator" style = { this.stylesView.listSeparator }/>
        )
    }

    _keyExtractor = (item, index) => {
        return index + ""
    }

    render() {
        return (
            <View style = { this.stylesView.container } accessibilityLabel = "viewContainer">
                <View style = { this.stylesView.list } accessibilityLabel = "viewList">
                    <View style = { this.stylesView.title } accessibilityLabel = "viewListTitle">
                        <Text style = { this.stylesText.addressTitle } accessibilityLabel = "textListTitle">
                            { !!this.props.userLogged ? ADDRESS_LIST_CONTAINER_STRINGS.listTitle + this.props.userLogged.fullName.split(" ")[0] : ADDRESS_LIST_CONTAINER_STRINGS.listTitleVisitor }
                        </Text>
                        <Text style = { this.stylesText.addressSubtitle } accessibilityLabel = "textListSubtitle">
                            { ADDRESS_LIST_CONTAINER_STRINGS.listSubtitle }
                        </Text>
                    </View>
                    <View accessibilityLabel = "viewSeparator" style = { this.stylesView.mainSeparator }/>
                    <FlatList data = { this.props.addressList.others }
                              style = { this.stylesView.flatList }
                              extraData = { this.props }
                              keyExtractor = { this._keyExtractor }
                              ItemSeparatorComponent = { this._renderSeparator }
                              renderItem = { this._renderAddress }
                              ListHeaderComponent = { this._renderHeader }
                              refreshControl = {
                                  <RefreshControl
                                      refreshing = { this.props.refreshingList }
                                      onRefresh = { this.props.onRefresh }
                                  />
                              }
                              initialNumToRender = { 8 }
                              maxToRenderPerBatch = { 8 }
                              scrollEventThrottle = { 16 }
                              disableVirtualization = { false }
                              onEndReachedThreshold = { 100 }
                              removeClippedSubviews = { false }
                              showsVerticalScrollIndicator = { false }
                              accessibilityLabel = "flatListAddresses"/>
                </View>
                <TouchableWithoutFeedback onPress = { () => this.props.addAddress(UserAddressType.CUSTOM) } accessibilityLabel = "touchableButtonNewAddress">
                    <LinearGradient colors = {[BackgroundColor.primary, BackgroundColor.gradient]} style = { this.stylesButton.buttonNewAddressGradient }>
                        <Text style = { this.stylesButton.labelButtonNewAddress } accessibilityLabel = "textButtonNewAddress">
                            { !!this.props.userLogged ? ADDRESS_LIST_CONTAINER_STRINGS.newAddress : ADDRESS_LIST_CONTAINER_STRINGS.changeAddress }
                        </Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}