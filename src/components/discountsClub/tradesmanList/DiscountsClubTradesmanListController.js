import React, { PureComponent } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { ExternalMethods } from "../../../native/Functions"
import { FirebaseActions } from "../../../utils"
import * as Errors from "../../../errors"
import { HOME_CONTENT_TYPE } from "../DiscountClubUtils"
import Spinner from "../../../libs/customSpinner"
import NoInternetWarning from "../../messages/NoInternetWarning"
import NoOffersWarning from "../../messages/NoOffersWarning"
import NoLocationWarning from "../../messages/NoLocationWarning"
import NoLocationFoundWarning from "../../messages/NoLocationFoundWarning"
import DiscountsClubService from "../../../api/services/DiscountsClubService"
import DiscountsClubTradesmanListComponent from "./DiscountsClubTradesmanListComponent"
import { setCurrentAddress } from "../../../redux/actions"

class DiscountsClubTradesmanListController extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            isRefreshing: true,
            error: null,
            data: []
        }

        this.refreshList = this._refreshList.bind(this)
        this.onSelectItem = this._onSelectItem.bind(this)

        this._getOffersList()
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.DISCOUNTS_CLUB_TRADESMAN_LIST.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.DISCOUNTS_CLUB_TRADESMAN_LIST.screen)
        })
    }

    _getOffersList() {
        DiscountsClubService.getOffersGroup(this.props.offersGroup.idOffersGroup, this.props.currentAddress).then(data => {
            this.setState({
                isRefreshing: false,
                error: null,
                data: data
            })
        }).catch(error => {
            this.setState({
                isRefreshing: false,
                error: error,
                data: []
            })
        })
    }

    _onSelectItem(item) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.DISCOUNTS_CLUB_TRADESMAN_LIST.actions.TRADESMAN_TAPPED, { item })

        this.props.navigation.navigate("DiscountsClubTradesmanDetailsContainer", { tradesman: item, offersGroup: this.props.offersGroup, previousOffersGroup: this.props.previousOffersGroup })
    }

    _refreshList() {
        this.setState({
            isRefreshing: true
        }, () => this._getOffersList())
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.refreshList }/>
            )
        } else if (this.state.error instanceof Errors.NoOffersException) {
            return (
                <NoOffersWarning refreshOffers = { this.refreshList }/>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    render() {
        if (!!this.state.error) {
            return (
                this._renderError()
            )
        } else {
            return (
                <DiscountsClubTradesmanListComponent data = { this.state.data }
                                                     offersGroup = { this.props.offersGroup }
                                                     previousOffersGroup = { this.props.previousOffersGroup }
                                                     isRefreshing = { this.state.isRefreshing }
                                                     refreshList = { this.refreshList }
                                                     onSelectItem = { this.onSelectItem }
                />
            )
        }
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setCurrentAddress }
) ( DiscountsClubTradesmanListController )