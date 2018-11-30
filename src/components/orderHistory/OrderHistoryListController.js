import React, { Component } from "react"
import { Alert, View, ScrollView, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { isDeviceConnected, FirebaseActions } from "../../utils"
import { getOrderHistory } from "../../api/APIRequests"
import { ExternalMethods } from "../../native/Functions"
import NoOrdersWarning from "../../components/messages/NoOrdersWarning"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import NoSessionWarning from "../../components/messages/NoSessionWarning"
import OrderHistoryListComponent from "./OrderHistoryListComponent"
import User from "../../models/User"
import * as Errors from "../../errors"
import OrderHistoryService from "../../api/services/OrderHistoryService"

class OrderHistoryListController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderList: [],
            isRefreshing: true,
            error: null
        }

        this.callLogin = this._callLogin.bind(this)
        this.refreshList = this._refreshList.bind(this)
    }

    componentWillMount() {
        this._getOrderHistory()
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.ORDER_HISTORY.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.ORDER_HISTORY.screen)

            this._getOrderHistory()
        })
    }

    _getOrderHistory() {
        OrderHistoryService.gerOrderHistory().then(result => {
            this.setState({
                orderList: result,
                isRefreshing: false,
                error: null
            })
        }).catch(error => {
            this.setState({
                orderList: [],
                isRefreshing: false,
                error: error
            })
        })
    }

    _refreshList(isPullToRefresh = false) {
        this.setState({
            orderList: [],
            isRefreshing: isPullToRefresh
        }, () => this._getOrderHistory() )
    }

    _callLogin() {
        ExternalMethods.startLogin((user) => {
            ExternalMethods.registerFirebaseUser(new User(user))

            this.setState({
                error: !!user ? null : new Errors.LoginException(),
                isRefreshing: true
            }, () => this._getOrderHistory() )
        })
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { this.refreshList }/>
            )
        } else if (this.state.error instanceof Errors.LoginException) {
            return (
                <NoSessionWarning methodLogin = { this.callLogin } />
            )
        } else if (this.state.error instanceof Errors.NoOrdersException) {
            return (
                <NoOrdersWarning isDiscountsClubMode = { this.props.isDiscountsClubMode }
                                 hideButtonNoOrders = { this.props.hideButtonNoOrders }
                                 updateNoOrders = { this.props.updateNoOrders }
                />
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
                <View style = { this.stylesView.general }>
                    <OrderHistoryListComponent orderList = { this.state.orderList }
                                               isRefreshing = { this.state.isRefreshing }
                                               refreshList = { this.refreshList }
                    />
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        isDiscountsClubMode: state.general.isDiscountsClubMode
    }),
    { }
)(OrderHistoryListController)