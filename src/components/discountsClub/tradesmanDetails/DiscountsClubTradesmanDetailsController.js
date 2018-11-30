import React, { PureComponent } from "react"
import { View } from "react-native"
import * as Errors from "../../../errors"
import { HOME_CONTENT_TYPE, TRADESMAN_CONTACT } from "../DiscountClubUtils"
import { ExternalMethods } from "../../../native/Functions"
import { FirebaseActions, openExternalLink, ExternalLink } from "../../../utils"
import Spinner from "../../../libs/customSpinner"
import NoInternetWarning from "../../messages/NoInternetWarning"
import DiscountsClubService from "../../../api/services/DiscountsClubService"
import DiscountsClubTradesmanDetailsComponent from "./DiscountsClubTradesmanDetailsComponent"

export default class DiscountsClubTradesmanDetailsController extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            error: null,
            tradesman: {}
        }

        this._getTradesmanDetails()

        this.onPressContact = this._onPressContact.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.DISCOUNTS_CLUB_TRADESMAN_DETAILS.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.DISCOUNTS_CLUB_TRADESMAN_DETAILS.screen)
        })
    }

    _getTradesmanDetails() {
        DiscountsClubService.getTradesmanDetails(this.props.tradesman.idUnity).then(data => {
            //TODO: - We need a better way to add the categories
            data.categories = ["", "Sobre", "Entre em Contato", "Horários de Atendimento"]

            this.setState({
                isLoading: false,
                error: null,
                tradesman: data
            })
        }).catch(error => {
            this.setState({
                isLoading: false,
                error: error,
                tradesman: {}
            })
        })
    }

    _onPressContact(contactType, value, shouldTryURL) {
        openExternalLink(value, contactType, shouldTryURL)
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
        if (this.state.isLoading) {
            return (
                <Spinner visible = { this.state.isLoading }/>
            )
        } else if (!!this.state.error) {
            return (
                this._renderError()
            )
        } else {
            return (
                <DiscountsClubTradesmanDetailsComponent tradesman = { this.state.tradesman }
                                                        offersGroup = { this.props.offersGroup }
                                                        previousOffersGroup = { this.props.previousOffersGroup }
                                                        onPressContact = { this.onPressContact }
                />
            )
        }
    }
}