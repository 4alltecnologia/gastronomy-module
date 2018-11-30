import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Animated } from "react-native"
import PropTypes from "prop-types"
import { getUnityMedia, MediaTypes } from "../../utils"
import { BackgroundColor } from "../../theme/Theme"
import { GENERAL_STRINGS } from "../../languages"
import DiscountsClubTradesmanDetailsName from "../discountsClub/tradesmanDetails/cells/DiscountsClubTradesmanDetailsName"
import DiscountsClubTradesmanDetailsAbout from "../discountsClub/tradesmanDetails/cells/DiscountsClubTradesmanDetailsAbout"
import DiscountsClubTradesmanDetailsAddress from "../discountsClub/tradesmanDetails/cells/DiscountsClubTradesmanDetailsAddress"
import ContactController from "./ContactController"
import WorkingHoursController from "./WorkingHoursController"
import PaymentMethodsListController from "./PaymentMethodsListController"

export default class UnityInfoComponent extends PureComponent {

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
    }

    _renderItem = ({ item, index }) => {
        switch (index) {
            case 0:
                return (
                    <DiscountsClubTradesmanDetailsAbout tradesmanDescription = { this.props.unity.desc }/>
                )
                break
            case 1:
                return (
                    <DiscountsClubTradesmanDetailsAddress tradesmanAddress = { this.props.unity.address }
                                                          tradesmanLatitude = { this.props.unity.latitude }
                                                          tradesmanLongitude = { this.props.unity.longitude }
                    />
                )
                break
            case 2:
                return (
                    <WorkingHoursController workingHours = { this.props.unity.unityOperatingHourGroups }/>
                )
                break
            case 3:
                return (
                    <ContactController email = { this.props.unity.email }
                                       website = { this.props.unity.siteUrl }
                                       phoneNumber = { this.props.unity.phoneNumber }
                                       mobilePhoneNumber = { this.props.unity.mobileNumber }
                                       facebook = { this.props.unity.facebookUrl }
                                       instagram = { this.props.unity.instagramUrl }
                                       twitter = { this.props.unity.twitterUrl }
                    />
                )
                break
            case 4:
                return (
                    <PaymentMethodsListController onlinePaymentType = { this.props.unity.onlinePaymentType }
                                                  offlinePaymentType = { this.props.unity.offlinePaymentType }
                    />
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
            <FlatList style = { this.stylesView.general }
                      contentContainerStyle = { this.stylesView.contentContainer }
                      data = { this.props.unity.categories }
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
        )
    }
}