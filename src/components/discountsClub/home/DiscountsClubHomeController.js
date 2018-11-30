import React, { PureComponent } from "react"
import { AppState, View, LayoutAnimation, UIManager, Platform } from "react-native"
import { connect } from "react-redux"
import { ExternalMethods } from "../../../native/Functions"
import { HOME_CONTENT_TYPE } from "../DiscountClubUtils"
import * as Errors from "../../../errors"
import Spinner from "../../../libs/customSpinner"
import NoInternetWarning from "../../messages/NoInternetWarning"
import NoLocationWarning from "../../messages/NoLocationWarning"
import NoLocationFoundWarning from "../../messages/NoLocationFoundWarning"
import DiscountsClubService from "../../../api/services/DiscountsClubService"
import DiscountsClubHomeComponent from "./DiscountsClubHomeComponent"
import { setCurrentAddress } from "../../../redux/actions"
import { FirebaseActions } from "../../../utils"

class DiscountsClubHomeController extends PureComponent {

    constructor(props) {
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            isLoading: true,
            isRefreshing: true,
            isUserLoggedIn: false,
            error: null,
            showModalAddress: false,
            data: [],
            headerData: [],
            userName: "",
            userSavings: 0
        }

        this.refreshHome = this._refreshHome.bind(this)
        this.onSelectItem = this._onSelectItem.bind(this)
        this.onLoginUser = this._onLoginUser.bind(this)
        this.onGoToMyCoupons = this._onGoToMyCoupons.bind(this)
        this.changeAddress = this._changeAddress.bind(this)
        this.closeModalAddress = this._closeModalAddress.bind(this)

        this._getHome()
        this._getUser()
    }

    componentWillReceiveProps(nextProps){
        if (!(!!nextProps.currentAddress && !!this.props.currentAddress && nextProps.currentAddress.id === this.props.currentAddress.id)){
            this.setState({
                isLoading: true,
                error: null
            }, () => {
                this._refreshHome()
            })
        }
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.DISCOUNTS_CLUB_HOME.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.DISCOUNTS_CLUB_HOME.screen)
            this._getUser()
        })
    }

    _getHome() {
        DiscountsClubService.getHome(this.props.currentAddress).then(data => {
            this.setState({
                isLoading: false,
                isRefreshing: false,
                error: null,
                headerData: data.fixedSection
            }, () => this._getUser())
        }).catch(error => {
            this.setState({
                isLoading: false,
                isRefreshing: false,
                error: error,
                headerData: []
            }, () => this._getUser())
        })
    }

    _getUser() {
        ExternalMethods.getUserLogged((error, resultUserLogged) => {
            if (!!resultUserLogged) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

                this.setState({
                    isUserLoggedIn: true,
                    userName: resultUserLogged.fullName
                }, () =>
                    DiscountsClubService.getUserSavings(resultUserLogged.sessionToken).then(data => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

                        this.setState({
                            error: null,
                            userSavings: data.savings
                        })
                    }).catch(error => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

                        this.setState({
                            error: error,
                            userSavings: 0
                        })
                    })
                )
            } else {
                this.setState({
                    error: null,
                    isUserLoggedIn: false,
                    userName: "",
                    userSavings: 0
                })
            }
        })
    }

    _onSelectItem(item, action) {
        switch(item.idOfferType) {
            case HOME_CONTENT_TYPE.CATEGORY.idOfferType:
                ExternalMethods.registerFirebaseEvent(action, { name: item.name, offerType: HOME_CONTENT_TYPE.CATEGORY.type })
                this.props.navigation.navigate("DiscountsClubOffersGroupContainer", { offersGroup: item })
                return
            case HOME_CONTENT_TYPE.OFFER.idOfferType:
                ExternalMethods.registerFirebaseEvent(action, { name: item.name, offerType: HOME_CONTENT_TYPE.OFFER.type })
                this.props.navigation.navigate("DiscountsClubOfferDetailsContainer", { offer: item })
                return
            case HOME_CONTENT_TYPE.COUPON.idOfferType:
                return
            case HOME_CONTENT_TYPE.DISCOUNT_VOUCHER.idOfferType:
                return
        }
    }

    _onLoginUser() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.DISCOUNTS_CLUB_HOME.actions.LOGIN, {})
        ExternalMethods.startLogin((resultLogin) => {
            if (resultLogin) {
                this._getUser()
            }
        })
    }

    //FIXME: USING CARD ID ONLY FOR TESTING
    _onGoToMyCoupons() {
        ExternalMethods.getCardID((result) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            this.setState({
                isUserLoggedIn: false,
            })
        })
    }

    _changeAddress() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.DISCOUNTS_CLUB_HOME.actions.CHANGE_ADDRESS, {})

        this.setState({
            showModalAddress: true
        })
    }

    _closeModalAddress() {
        this.setState({
            showModalAddress: false
        })
    }

    //TODO: HANDLE APP STATE CHANGE
    // _handleAppStateChange = (nextAppState) => {
    //     if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
    //         this._refreshOffers()
    //     }
    //
    //     this.setState({
    //         appState: nextAppState
    //     })
    // }

    _refreshHome() {
        this.setState({
            isRefreshing: true
        }, () => this._getHome())
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.refreshHome }/>
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
        } else if (!!this.state.isLoading) {
            return (
                <Spinner visible = { this.state.isLoading }/>
            )
        } else {
            return (
                <DiscountsClubHomeComponent navigation = { this.props.navigation }
                                            headerData = { this.state.headerData }
                                            data = { this.state.data }
                                            userName = { this.state.userName }
                                            userSavings = { this.state.userSavings }
                                            isRefreshing = { this.state.isRefreshing }
                                            isUserLoggedIn = { this.state.isUserLoggedIn }
                                            refreshHome = { this.refreshHome }
                                            onSelectItem = { this.onSelectItem }
                                            onLoginUser = { this.onLoginUser }
                                            onGoToMyCoupons = { this.onGoToMyCoupons }
                                            changeAddress = { this.changeAddress }
                                            closeModalAddress = { this.closeModalAddress }
                                            showModalAddress = { this.state.showModalAddress }
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
) ( DiscountsClubHomeController )