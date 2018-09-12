import React, { Component } from "react"
import { Alert, View, ScrollView, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { isDeviceConnected } from "../../utils"
import { getOrderHistory } from "../../api/ApiRequests"
import { ExternalMethods } from "../../native/Functions"
import NoOrdersWarning from "../../components/messages/NoOrdersWarning"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import NoSessionWarning from "../../components/messages/NoSessionWarning"
import OrderHistoryListComponent from "./OrderHistoryListComponent"

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
            isDeviceConnected: true,
            isUserLoggedIn: true,
            orderList: [],
            isRefreshing: true,
            isFirstTime: true
        }

        this.callLogin = this._callLogin.bind(this)
    }

    componentWillMount() {
        this._getOrderHistory()
    }

    _getOrderHistory() {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                ExternalMethods.hasUserLogged((isLogged) => {
                    if (isLogged) {
                        getOrderHistory().then(orderList => {
                            this.setState({
                                orderList: orderList,
                                isDeviceConnected: true,
                                isRefreshing: false,
                                isFirstTime: false
                            })
                        }).catch(error => {
                            this.setState({
                                orderList: [],
                                isDeviceConnected: true,
                                isRefreshing: false,
                                isFirstTime: false
                            })
                        })
                    } else {
                        this.setState({
                            isDeviceConnected: true,
                            isUserLoggedIn: false,
                            isRefreshing: false,
                            isFirstTime: false
                        })
                    }
                })
            } else {
                this.setState({
                    isDeviceConnected: false,
                    isRefreshing: false,
                    isFirstTime: false
                })
            }
        })
    }

    _refreshList(isPullToRefresh) {
        this.setState({
            orderList: [],
            isRefreshing: isPullToRefresh
        }, () => this._getOrderHistory() )
    }

    _callLogin() {
        ExternalMethods.startLogin((resultLogin) => {
            this.setState({
                isUserLoggedIn: resultLogin,
                isRefreshing: true
            }, () => this._getOrderHistory() )
        })
    }

    _renderNoInternet() {
        return (
            <NoInternetWarning tryInternet = { () => this._refreshList(false) }/>
        )
    }

    _renderNotLoggedIn() {
        return (
            <NoSessionWarning methodLogin = { this.callLogin } />
        )
    }

    _renderNoOrders() {
        return (
            <NoOrdersWarning isOffersMode = { this.props.isOffersMode } hideButtonNoOrders = { this.props.hideButtonNoOrders } updateNoOrders = { () => this.props.updateNoOrders() }/>
        )
    }

    render() {
        if (!this.state.isDeviceConnected) {
            return this._renderNoInternet()
        } else if (!this.state.isUserLoggedIn) {
            return this._renderNotLoggedIn()
        } else if (!this.state.isRefreshing && this.state.orderList.length < 1) {
            return this._renderNoOrders()
        } else {
            return (
                <View style = { this.stylesView.general }>
                    <OrderHistoryListComponent orderList = { this.state.orderList }
                                               isRefreshing = { this.state.isRefreshing }
                                               refreshList = { () => this._refreshList(true) }
                    />
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        isOffersMode: state.general.isOffersMode
    }),
    { }
)(OrderHistoryListController)