import React, { Component } from "react"
import { Alert, View, ScrollView, StyleSheet, StatusBar } from "react-native"
import { isDeviceConnected } from "../../utils"
import { getOrderDetails } from "../../api/ApiRequests"
import { ExternalMethods } from "../../native/Functions"
import { FontColor } from "../../theme/Theme"
import { GENERAL_STRINGS, STORAGE_CHECK_STRINGS } from "../../languages/index"
import Spinner from "../../libs/customSpinner"
import NoProductsWarning from "../../components/messages/NoProductsWarning"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import LoginUserComponent from "../cart/LoginUserComponent"
import CheckProductListComponent from "./CheckProductListComponent"
import { connect } from "react-redux"
import { setCheckName, setCheckNumber, setCheckOrderId, setTableNumber, setCheckUnity } from "../../redux/actions"

class CheckProductListController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            isFirstTime: true,
            isLoading: true,
            isDeviceConnected: true,
            isUserLoggedIn: true,
            unityId: props.unityId, //redux
            orderId: props.orderId, //redux
            checkName: props.checkName, //redux
            checkNumber: props.checkNumber, //redux
            tableNumber: props.tableNumber, //redux
            productList: [],
            productTotal: 0,
            tips: 0,
            totalPrice: 0,
            unityDetails: {}
        }

        this.callLogin = this._callLogin.bind(this)
        this.onRefresh = this._onRefresh.bind(this)
        this.onGoToCheckPayment = this._onGoToCheckPayment.bind(this)
    }

    componentDidMount() {
        this.props.setCheckName(!!this.state.checkName ? this.state.checkName : STORAGE_CHECK_STRINGS.myCheck)

        this._getProductList()
    }

    _getProductList() {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                ExternalMethods.hasUserLogged((isLogged) => {
                    getOrderDetails(this.state.orderId, false).then(orderDetails => {
                        this.setState({
                            productList: orderDetails.orderItems,
                            productTotal: orderDetails.productTotal,
                            tips: orderDetails.tips,
                            totalPrice: orderDetails.total,
                            unityDetails: orderDetails.unity,
                            isUserLoggedIn: isLogged,
                            isLoading: false,
                            isRefreshing: false,
                            isFirstTime: false,
                            isDeviceConnected: true
                        })
                    }).catch(error => {
                        this.setState({
                            productList: [],
                            productTotal: 0,
                            tips: 0,
                            totalPrice: 0,
                            unityDetails: {},
                            isUserLoggedIn: isLogged,
                            isLoading: false,
                            isRefreshing: false,
                            isFirstTime: false,
                            isDeviceConnected: true
                        })
                    })
                })
            } else {
                this.setState({
                    isDeviceConnected: false,
                    isLoading: false,
                    isRefreshing: false,
                    isFirstTime: false
                })
            }
        })
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true,
            isLoading: true
        }, () => this._getProductList())
    }

    _callLogin() {
        ExternalMethods.startLogin((resultLogin) => {
            this.setState({
                isUserLoggedIn: resultLogin,
                isLoading: true
            }, () => this._getProductList())
        })
    }

    _onGoToCheckPayment() {
        this.props.onGoToCheckPayment(this.state.totalPrice, this.state.unityDetails)
    }

    _renderFirstLoad() {
        return (
            <View>
                <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
            </View>
        )
    }

    _renderNoInternet() {
        return (
            <View style = { this.stylesView.general }>
                <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
                <NoInternetWarning tryInternet = { this.onRefresh }/>
            </View>
        )
    }

    _renderNoProducts() {
        return (
            <View style = { this.stylesView.general }>
                <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
                <NoProductsWarning onGoToCatalog = { this.props.onGoToCatalog }/>
            </View>
        )
    }

    render() {
        if (this.state.isFirstTime) {
            return this._renderFirstLoad()
        } else if (!this.state.isDeviceConnected) {
            return this._renderNoInternet()
        } else if (this.state.productList.length <= 0) {
            return this._renderNoProducts()
        } else {
            return (
                <View style = { this.stylesView.general }>
                    <Spinner visible = { this.state.isLoading } size = { 115 } textContent = { GENERAL_STRINGS.loading }/>
                    <CheckProductListComponent productList = { this.state.productList }
                                               productTotal = { this.state.productTotal }
                                               tips = { this.state.tips }
                                               totalPrice = { this.state.totalPrice }
                                               isUserLoggedIn = { this.state.isUserLoggedIn }
                                               isRefreshing = { this.state.isRefreshing }
                                               callLogin = { this.callLogin }
                                               onRefresh = { this.onRefresh }
                                               onGoToCatalog = { this.props.onGoToCatalog }
                                               onGoToCheckPayment = { this.onGoToCheckPayment }
                    />
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        checkNumber: state.check.checkNumber,
        checkName: state.check.checkName,
        orderId: state.check.orderId,
        tableNumber: state.check.tableNumber,
        unityId: state.general.unityId
    }),
    { }
)(CheckProductListController)