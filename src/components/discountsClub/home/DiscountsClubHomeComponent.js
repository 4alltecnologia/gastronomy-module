import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Modal } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor } from "../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../languages"
import DiscountsClubHomeHeaderController from "./header/DiscountsClubHomeHeaderController"
import DiscountsClubHomeFooterController from "./footer/DiscountsClubHomeFooterController"
import AddressListModal from "../../addressList/AddressListModal"
import CurrentAddressController from "../../currentAddress/CurrentAddressController"

export default class DiscountsClubHomeComponent extends PureComponent {
    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: BackgroundColor.primary
        },
        contentContainer: {
            backgroundColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)
    }

    _renderHeader = () => {
        return (
            <DiscountsClubHomeHeaderController headerData = { this.props.headerData }
                                               userSavings = { this.props.userSavings }
                                               isUserLoggedIn = { this.props.isUserLoggedIn }
                                               onSelectItem = { this.props.onSelectItem }
            />
        )
    }

    _renderFooter = () => {
        return (
            <DiscountsClubHomeFooterController isUserLoggedIn = { this.props.isUserLoggedIn }
                                               userName = { this.props.userName }
                                               onLoginUser = { this.props.onLoginUser }
                                               onGoToMyCoupons = { this.props.onGoToMyCoupons }
            />
        )
    }

    _renderItem = ( item, index ) => {
        return (
            <View style = {{ height: 60, backgroundColor: "green" }}/>
        )
    }

    _keyExtractor = ( item, index ) => {
        return index + ""
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <CurrentAddressController navigation = { this.props.navigation }
                                          changeAddress = { this.props.changeAddress }/>
                <FlatList contentContainerStyle = { this.stylesView.contentContainer }
                          data = { this.props.data }
                          extraData = { this.props }
                          keyExtractor = { this._keyExtractor }
                          renderItem = { this._renderItem }
                          ListFooterComponent = { this._renderFooter }
                          ListHeaderComponent = { this._renderHeader }
                          refreshControl = {
                              <RefreshControl refreshing = { this.props.isRefreshing }
                                              onRefresh = { () => this.props.refreshHome() }
                                              title = { GENERAL_STRINGS.loading }
                                              tintColor = { BackgroundColor.secondary }
                                              titleColor = { BackgroundColor.secondary }
                              />
                          }
                          initialNumToRender = { 4 }
                          maxToRenderPerBatch = { 4 }
                          disableVirtualization = { false }
                          onEndReachedThreshold = { 100 }
                          removeClippedSubviews = { false }
                          accessibilityLabel = "flatListHome"
                />
               <AddressListModal navigation = { this.props.navigation }
                                 defaultAddressSelected = { this.props.closeModalAddress }
                                 showModalAddress = { this.props.showModalAddress }
                                 cameFromCart = { false }/>
            </View>
        )
    }
}

DiscountsClubHomeComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    onLoginUser: PropTypes.func.isRequired,
    onGoToMyCoupons: PropTypes.func.isRequired
}