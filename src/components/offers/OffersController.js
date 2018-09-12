import React, { Component } from "react"
import { StyleSheet, View, Image, Text, ScrollView, Alert, RefreshControl, AppState } from "react-native"
import * as Errors from "../../errors"
import { saveProduct } from "../../database/specialization/StorageProduct"
import { resetModifiersSelected, getModifiersSelected, updateModifiersSelected } from "../../database/specialization/StorageModifiers"
import { getOrder, saverOrder } from "../../database/specialization/StorageOrder"
import { saveOrderType } from "../../database/specialization/StorageGeneral"
import { GENERAL_STRINGS, ORDER_STATUS_CONTROLLER_STRINGS as OrderStrings} from "../../languages/index"
import { getCurrentLocation, callNativeLocationSettings, IdOrderType, getOrderTypeIcon, screenWidthPercentage, screenHeightPercentage } from "../../utils"
import { BackgroundColor } from "../../theme/Theme"
import Images from "../../assets/index"
import Spinner from "../../libs/customSpinner"
import NoInternetWarning from "../messages/NoInternetWarning"
import NoOffersWarning from "../messages/NoOffersWarning"
import NoLocationWarning from "../messages/NoLocationWarning"
import NoLocationFoundWarning from "../messages/NoLocationFoundWarning"
import CarouselController from "../carousel/CarouselController"
import CarouselItem from "../carousel/model/CarouselItem"
import OrderTypeSelectionItem from "../orderTypeSelection/model/OrderTypeSelectionItem"
import OffersService from "./OffersService"
import OffersOrderTypeSelectionComponent from "./OffersOrderTypeSelectionComponent"
import OffersListComponent from "./OffersListComponent"

export default class OffersController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        },
        content: {
            flexGrow: 1,
            marginTop: -1,
            backgroundColor: BackgroundColor.primary
        },
        contentContainer: {
            backgroundColor: "white"
        }
    })

    stylesImage = StyleSheet.create({
        background: {
            height: screenHeightPercentage(39),
            width: screenWidthPercentage(100),
            position: "absolute",
            top: 0,
            zIndex: -20,
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            isFirstTime: true,
            isRefreshing: false,
            isDeviceConnected: true,
            hasNoOffers: false,
            hasNoLocation: false,
            isGpsOff: false,
            latitude: props.latitude,
            longitude: props.longitude,
            appState: AppState.currentState,
            orderTypeSelectionList: [],
            selectedOrderTypeSelectionList: [],
            bannerList: [],
            deliveryOffersList: [],
            takeawayOffersList: [],
            displayedOffersList: []
        }

        this.onPressCarousel = this._onPressCarousel.bind(this)
        this.onPressOrderType = this._onPressOrderType.bind(this)
        this.onOfferTapped = this._onOfferTapped.bind(this)
        this.refreshConnection = this._refreshConnection.bind(this)
        this.refreshOffers = this._refreshOffers.bind(this)

        this._getOffersNearby()
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this._refreshOffers()
        }

        this.setState({
            appState: nextAppState
        })
    }

    _getOffersNearby() {
        OffersService.getOffersNearby().then(data => {
            let orderTypeSelectionList = []
            let selectedOrderTypeSelectionList = []
            let displayedOffersList = []

            if (data.deliveryOffersList.length > 0) {
                orderTypeSelectionList.push(new OrderTypeSelectionItem(IdOrderType.DELIVERY.name, getOrderTypeIcon(IdOrderType.DELIVERY.id), IdOrderType.DELIVERY))
                displayedOffersList = data.deliveryOffersList
            }

            if (data.takeawayOffersList.length > 0) {
                orderTypeSelectionList.push(new OrderTypeSelectionItem(IdOrderType.TAKEAWAY.name, getOrderTypeIcon(IdOrderType.TAKEAWAY.id), IdOrderType.TAKEAWAY))

                if (displayedOffersList.length <= 0) {
                    displayedOffersList = data.takeawayOffersList
                }
            }

            if (orderTypeSelectionList.length > 0) {
                selectedOrderTypeSelectionList.push(orderTypeSelectionList[0])
            }

            this.setState({
                isFirstTime: false,
                isRefreshing: false,
                isDeviceConnected: true,
                hasNoOffers: false,
                hasNoLocation: false,
                isGpsOff: false,
                orderTypeSelectionList: orderTypeSelectionList,
                selectedOrderTypeSelectionList: selectedOrderTypeSelectionList,
                bannerList: data.bannerList,
                deliveryOffersList: data.deliveryOffersList,
                takeawayOffersList: data.takeawayOffersList,
                displayedOffersList: displayedOffersList
            }, () => AppState.removeEventListener("change", this._handleAppStateChange))
        }).catch(error => {
            if (error instanceof Errors.ConnectionException) {
                this.setState({
                    isFirstTime: false,
                    isRefreshing: false,
                    isDeviceConnected: false,
                    hasNoOffers: false,
                    hasNoLocation: false,
                    isGpsOff: false
                })
            } else if (error instanceof Errors.NoOffersException) {
                this.setState({
                    isFirstTime: false,
                    isRefreshing: false,
                    isDeviceConnected: true,
                    hasNoOffers: true,
                    hasNoLocation: false,
                    isGpsOff: false
                })
            } else if (error instanceof Errors.LocationException) {
                this.setState({
                    isFirstTime: false,
                    isRefreshing: false,
                    isDeviceConnected: true,
                    hasNoOffers: true,
                    hasNoLocation: true,
                    isGpsOff: false
                })
            } else if (error instanceof Errors.LocationSettingsException) {
                this.setState({
                    isFirstTime: false,
                    isRefreshing: false,
                    isDeviceConnected: true,
                    hasNoOffers: false,
                    hasNoLocation: false,
                    isGpsOff: true
                }, () => {
                    setTimeout(() => {
                        Alert.alert(
                            error.title,
                            error.message,
                            [{ text: GENERAL_STRINGS.no, style: "cancel" },
                                { text: GENERAL_STRINGS.yes, onPress: () => {
                                    callNativeLocationSettings()
                                    AppState.addEventListener("change", this._handleAppStateChange)
                                }
                            }],
                            { cancelable: false }
                        )
                    }, 50)
                })
            } else {
                Alert.alert(
                    error.title,
                    error.message,
                    [{text: GENERAL_STRINGS.ok, style: "cancel", onPress: () => {
                            this.setState({
                                isFirstTime: false,
                                isRefreshing: false,
                                isDeviceConnected: true
                            })
                        }}],
                    { cancelable: false }
                )
            }
        })
    }

    _onPressCarousel(carouselItem) {
        this._onOfferTapped(carouselItem.offerItem)
    }

    _onPressOrderType(orderType) {
        let selectedOrderTypeSelectionList = this.state.selectedOrderTypeSelectionList

        if (selectedOrderTypeSelectionList.includes(orderType)) {
            if (selectedOrderTypeSelectionList.length == 1) {
                return
            } else {
                let newSelectedOrderTypeSelectionList = selectedOrderTypeSelectionList.filter(filteredOrderType => (filteredOrderType.idOrderType.id != orderType.idOrderType.id))

                this.setState({
                    selectedOrderTypeSelectionList: newSelectedOrderTypeSelectionList,
                    displayedOffersList: orderType.idOrderType.id == IdOrderType.DELIVERY.id ? this.state.takeawayOffersList : this.state.deliveryOffersList
                })
            }
        } else {
            selectedOrderTypeSelectionList.push(orderType)

            this.setState({
                selectedOrderTypeSelectionList: selectedOrderTypeSelectionList,
                displayedOffersList: this.state.deliveryOffersList.concat(this.state.takeawayOffersList).sort((offerA, offerB) => { return offerB.open - offerA.open })
            })
        }
    }

    _onOfferTapped(offerItem) {
        if (offerItem.open) {
            saveOrderType([offerItem.product.orderType.id], (error, orderTypeStorage) => {
                saveProduct(offerItem.product, (error, storageProduct) => {
                    if (!error) {
                        this._navigateToDetail(offerItem.unity, offerItem.product)
                    } else {
                        Alert.alert(GENERAL_STRINGS.alertErrorTitle, GENERAL_STRINGS.alertErrorMessage, { cancelable: false })
                    }
                })
            })
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
    }

    _navigateToDetail(unity, product) {
        if (product.productVariations.length > 0) {
            resetModifiersSelected((error) => {
                if (!error) {
                    this._updateModifersAndGoToChooseModifier(unity, product)
                }
            })
        } else {
            this.props.navigation.navigate("ProductDetailContainer", { unity: unity, product: product, navigation: this.props.navigation, catalogNavigationKey: null })
        }
    }

    _updateModifersAndGoToChooseModifier(unity, product) {
        getModifiersSelected((errorGet, modifiers) => {
            var newModifiers = modifiers ? modifiers : {}
            newModifiers.product = product
            newModifiers.unity = unity
            newModifiers.steps = []

            updateModifiersSelected(newModifiers, (errorUpdate, data) => {
                if (!errorUpdate) {
                    this.props.navigation.navigate("ModifierContainerEven", { unity: unity, product: product, catalogNavigationKey: null, nextScreen: "Odd" })
                }
            })
        })
    }

    _refreshConnection() {
        this.setState({
            isFirstTime: true,
            isRefreshing: false,
            isDeviceConnected: true,
            hasNoOffers: false,
            hasNoLocation: false,
            isGpsOff: false
        }, () => this._getOffersNearby())
    }

    _refreshOffers() {
        this.setState({
            isFirstTime: false,
            isRefreshing: true,
            isDeviceConnected: true,
            hasNoOffers: false,
            hasNoLocation: false,
            isGpsOff: false
        }, () => this._getOffersNearby())
    }

    render() {
        if (this.state.isFirstTime) {
            return (
                <Spinner visible = { this.state.isFirstTime }/>
            )
        } else if (!this.state.isDeviceConnected) {
            return (
                <NoInternetWarning tryInternet = { this.refreshConnection }/>
            )
        } else if (this.state.hasNoOffers) {
            return (
                <NoOffersWarning refreshOffers = { this.refreshOffers }/>
            )
        } else if (this.state.noLocation) {
            return (
                <NoLocationFoundWarning tryLocation = { this.refreshOffers }/>
            )
        } else if (this.state.isGpsOff) {
            return (
                <NoLocationWarning tryLocation = { this.refreshOffers }/>
            )
        } else {
            return (
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneralOffersController">
                    <ScrollView style = { this.stylesView.content }
                                contentContainerStyle = { this.stylesView.contentContainer }
                                refreshControl = {
                                    <RefreshControl
                                        refreshing = { this.state.isRefreshing }
                                        onRefresh = { this.refreshOffers }
                                        title = { GENERAL_STRINGS.loading }
                                        tintColor = { BackgroundColor.secondary }
                                        titleColor = { BackgroundColor.secondary }
                                    />
                                }
                                accessibilityLabel = "scrollViewGeneralOffersController">
                        { this.state.bannerList.length > 0 ?
                            <View style = { this.stylesView.general }>
                                <CarouselController carouselItemList = { this.state.bannerList }
                                                    onPressCarousel = { this.onPressCarousel }
                                />
                                <Image style = { this.stylesImage.background } source = { Images.backgrounds.offersBackground } accessibilityLabel = "imageBackgroundOffersController"/>
                            </View>
                            : null }
                        { this.state.deliveryOffersList.length > 0 || this.state.takeawayOffersList.length > 0 ?
                            <View style = { this.stylesView.general }>
                                <OffersOrderTypeSelectionComponent orderTypeSelectionList = { this.state.orderTypeSelectionList }
                                                                   selectedOrderTypeSelectionList = { this.state.selectedOrderTypeSelectionList }
                                                                   onPressOrderType = { this.onPressOrderType }
                                />
                                <OffersListComponent offersList = { this.state.displayedOffersList }
                                                     onOfferTapped = { this.onOfferTapped }
                                />
                            </View>
                        : null }
                    </ScrollView>
                </View>
            )
        }
    }
}