import React, { PureComponent } from "react"
import { View } from "react-native"
import * as Errors from "../../../errors"
import { GENERAL_STRINGS } from "../../../languages"
import { HOME_CONTENT_TYPE } from "../DiscountClubUtils"
import { saveProduct } from "../../../database/specialization/StorageProduct"
import { getModifiersSelected, updateModifiersSelected, resetModifiersSelected } from "../../../database/specialization/StorageModifiers"
import { saveOrderType } from "../../../database/specialization/StorageGeneral"
import Spinner from "../../../libs/customSpinner"
import NoInternetWarning from "../../messages/NoInternetWarning"
import DiscountsClubService from "../../../api/services/DiscountsClubService"
import DiscountsClubOfferDetailsComponent from "./DiscountsClubOfferDetailsComponent"
import { ExternalMethods } from "../../../native/Functions"
import { FirebaseActions } from "../../../utils"

export default class DiscountsClubOfferDetailsController extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            error: null,
            offer: this.props.offer,
            product: {},
            unity: this.props.offer.unity
        }

        this.onBuyTapped = this._onBuyTapped.bind(this)

        this._getOfferDetails()
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.OFFER_DETAILS.screen)
    }

    _getOfferDetails() {
        DiscountsClubService.getOfferDetails(this.props.offer).then(data => {
            this.setState({
                isLoading: false,
                error: null,
                product: data
            }, () => this.props.navigation.setParams({ title: data.name }))
        }).catch(error => {
            this.setState({
                isLoading: false,
                error: error,
                product: {}
            })
        })
    }

    _onBuyTapped() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.OFFER_DETAILS.actions.BUY, { id: this.state.product.idProduct, product: this.state.product.name })
        switch(this.state.offer.idOfferType) {
            case HOME_CONTENT_TYPE.OFFER.idOfferType:
                saveOrderType([this.state.product.orderType.id], (error, orderTypeStorage) => {
                    saveProduct(this.state.product, (error, storageProduct) => {
                        if (!error) {
                            this._navigateToDetail(storageProduct)
                        } else {
                            Alert.alert(GENERAL_STRINGS.alertErrorTitle, GENERAL_STRINGS.alertErrorMessage)
                        }
                    })
                })
        }
    }

    _navigateToDetail(product) {
        if (product.productVariations.length > 0) {
            resetModifiersSelected((error) => {
                if (!error) {
                    this._updateModifersAndGoToChooseModifier(product)
                }
            })
        } else {
            this.props.navigation.navigate("ProductDetailContainer", { product: product, unity: this.state.unity })
        }
    }

    _updateModifersAndGoToChooseModifier(product) {
        getModifiersSelected((errorGet, modifiers) => {
            var newModifiers = modifiers ? modifiers : {}
            newModifiers.product = product
            newModifiers.unity = this.state.unity
            newModifiers.steps = []

            updateModifiersSelected(newModifiers, (errorUpdate, data) => {
                if (!errorUpdate){
                    this.props.navigation.navigate("ModifierContainerEven", { product: product, unity: this.state.unity, nextScreen: "Odd" })
                }
            })
        })
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.refreshList }/>
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
        } else if (this.state.isLoading) {
            return (
                <Spinner visible = { this.state.isLoading } size = { 115 }/>
            )
        } else {
            return (
                <DiscountsClubOfferDetailsComponent offer = { this.state.offer }
                                                    product = { this.state.product }
                                                    unity = { this.state.unity }
                                                    navigation = { this.props.navigation }
                                                    onBuyTapped = { this.onBuyTapped }
                />
            )
        }
    }
}