import React, { PureComponent } from "react"
import { View, Alert } from "react-native"
import { connect } from "react-redux"
import { GENERAL_STRINGS } from "../../../languages"
import * as Errors from "../../../errors"
import { HOME_CONTENT_TYPE } from "../DiscountClubUtils"
import NoInternetWarning from "../../messages/NoInternetWarning"
import NoOffersWarning from "../../messages/NoOffersWarning"
import DiscountsClubService from "../../../api/services/DiscountsClubService"
import DiscountsClubOffersListComponent from "./offersList/DiscountsClubOffersListComponent"
import DiscountsClubSubcategoryListComponent from "./subCategoryList/DiscountsClubSubcategoryListComponent"
import { setCurrentAddress } from "../../../redux/actions"

class DiscountsClubOffersGroupController extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            isRefreshing: true,
            error: null,
            data: [],
            contentType: HOME_CONTENT_TYPE.CATEGORY.idOfferType
        }

        this.refreshList = this._refreshList.bind(this)
        this.onSelectItem = this._onSelectItem.bind(this)

        this._getOffersGroup()
    }

    componentWillReceiveProps(nextProps){
        if (!(!!nextProps.currentAddress && !!this.props.currentAddress && nextProps.currentAddress.id === this.props.currentAddress.id)){
            this.setState({
                isRefreshing: true,
                error: null
            }, () => {
                this._refreshList()
            })
        }
    }

    _getOffersGroup() {
        DiscountsClubService.getOffersGroup(this.props.offersGroup.idOffersGroup, this.props.currentAddress).then(data => {
            this.setState({
                isRefreshing: false,
                error: null,
                data: data.items,
                contentType: data.idOfferType
            })
        }).catch(error => {
            this.setState({
                isRefreshing: false,
                error: error,
                data: []
            })
        })
    }

    _onSelectItem(item, isTradesman = false) {
        switch(item.idOfferType) {
            case HOME_CONTENT_TYPE.CATEGORY.idOfferType:
                this.props.navigation.navigate(isTradesman ? "DiscountsClubTradesmanListContainer" : "DiscountsClubOffersGroupContainer", { offersGroup: item, previousOffersGroup: this.props.offersGroup })
                return
            case HOME_CONTENT_TYPE.OFFER.idOfferType:
                if (item.availableNow){
                    this.props.navigation.navigate("DiscountsClubOfferDetailsContainer", { offer: item })
                } else {
                    Alert.alert(
                        GENERAL_STRINGS.warning,
                        GENERAL_STRINGS.unityClosed,
                        [{
                            text: GENERAL_STRINGS.ok,
                            style: "cancel"
                        }],
                        { cancelable: false }
                    )
                }
                return
            case HOME_CONTENT_TYPE.DISCOUNT_VOUCHER.idOfferType:
                this.props.navigation.navigate("DiscountsClubOfferDetailsContainer", { offer: item })
                return
        }
    }

    _refreshList() {
        this.setState({
            isRefreshing: true
        }, () => this._getOffersGroup())
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
        } else if (this.state.contentType === HOME_CONTENT_TYPE.CATEGORY.idOfferType) {
            return (
                <DiscountsClubSubcategoryListComponent offersGroup = { this.props.offersGroup }
                                                       data = { this.state.data }
                                                       isRefreshing = { this.state.isRefreshing }
                                                       refreshList = { this.refreshList }
                                                       onSelectItem = { this.onSelectItem }
                />
            )
        } else {
            return (
                <DiscountsClubOffersListComponent offersGroup = { this.props.offersGroup }
                                                  data = { this.state.data }
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
) ( DiscountsClubOffersGroupController )