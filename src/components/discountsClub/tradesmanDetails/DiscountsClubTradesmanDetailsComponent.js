import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Animated } from "react-native"
import PropTypes from "prop-types"
import { getUnityMedia, MediaTypes } from "../../../utils"
import { BackgroundColor } from "../../../theme/Theme"
import { GENERAL_STRINGS } from "../../../languages"
import DiscountsClubTradesmanListHeaderComponent from "../tradesmanList/DiscountsClubTradesmanListHeaderComponent"
import DiscountsClubTradesmanDetailsName from "./cells/DiscountsClubTradesmanDetailsName"
import DiscountsClubTradesmanDetailsAbout from "./cells/DiscountsClubTradesmanDetailsAbout"
import DiscountsClubTradesmanDetailsAddress from "./cells/DiscountsClubTradesmanDetailsAddress"
import ContactController from "../../unityInfo/ContactController"
import WorkingHoursController from "../../unityInfo/WorkingHoursController"

export default class DiscountsClubTradesmanDetailsComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "rgb(234,234,234)"
        },
        contentContainer: {
            backgroundColor: BackgroundColor.primary
        },
        separator: {
            height: 8,
            backgroundColor: "rgb(234,234,234)",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)

        this.onContactTradesman = this._onContactTradesman.bind(this)
    }

    _onContactTradesman() {
        this.flatList.scrollToIndex({ animated: true, index: 2 })
    }

    _renderItem = ({ item, index }) => {
        switch (index) {
            case 0:
                return (
                    <DiscountsClubTradesmanDetailsName tradesmanName = { this.props.tradesman.name }
                                                       tradesmanLogo = { getUnityMedia(MediaTypes.LOGO, this.props.tradesman.media) }
                                                       onContactTradesman = { this.onContactTradesman }
                    />
                )
                break
            case 1:
                return (
                    <DiscountsClubTradesmanDetailsAbout tradesmanDescription = { this.props.tradesman.desc }/>
                )
                break
            case 2:
                return (
                    <ContactController email = { this.props.tradesman.email }
                                       website = { this.props.tradesman.siteUrl }
                                       phoneNumber = { this.props.tradesman.phoneNumber }
                                       mobilePhoneNumber = { this.props.tradesman.mobileNumber }
                                       facebook = { this.props.tradesman.facebookUrl }
                                       instagram = { this.props.tradesman.instagramUrl }
                                       twitter = { this.props.tradesman.twitterUrl }
                    />
                )
                break
            case 3:
                return (
                    <WorkingHoursController workingHours = { this.props.tradesman.unityOperatingHourGroups }/>
                )
                break
        }
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = ( item, index ) => {
        return index + ""
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <DiscountsClubTradesmanListHeaderComponent offersGroupName = { this.props.offersGroup.name }
                                                           previousOffersGroupName = { this.props.previousOffersGroup.name }
                />
                <FlatList ref = { ref => ( this.flatList = ref )}
                          style = { this.stylesView.general }
                          contentContainerStyle = { this.stylesView.contentContainer }
                          data = { this.props.tradesman.categories }
                          keyExtractor = { this._keyExtractor }
                          renderItem = { this._renderItem }
                          ItemSeparatorComponent = { this._renderSeparator }
                          initialNumToRender = { 4 }
                          maxToRenderPerBatch = { 4 }
                          scrollEventThrottle = { 160 }
                          disableVirtualization = { false }
                          onEndReachedThreshold = { 100 }
                          removeClippedSubviews = { false }
                          accessibilityLabel = "flatlistTradesman"
                />
            </View>
        )
    }
}