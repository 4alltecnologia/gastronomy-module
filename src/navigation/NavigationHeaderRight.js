import React, { PureComponent } from "react"
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, ImageBackground, AppState } from "react-native"
import { NavigationActions } from "react-navigation"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../theme/Theme"
import { GENERAL_STRINGS } from "../languages/index"
import Images from "../assets/index"
import { getCart } from "../database/specialization/StorageCart"
import { getOrder, saverOrder } from "../database/specialization/StorageOrder"
import { getOrderDetails, getOrderHistory } from "../api/ApiRequests"
import { OrderStatus } from "../utils"
import { connect } from "react-redux"
import { totalCart } from "../redux/actions"

var timer = null
var alertOpened = false
class NavigationHeaderRight extends PureComponent {

    stylesView = StyleSheet.create({
        container: {
            height: 44,
            width: 88,
            marginRight: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",

        },
        icon: {
            height: 32,
            width: 32,
            marginRight: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        iconQuantity: {
            height: 18,
            width: 18,
            borderRadius: 9,
            position: "absolute",
            right: -6,
            top: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: FontColor.primary
        }
    })

    stylesText = StyleSheet.create({
        quantity: {
            textAlign: "center",
            fontSize: 10,
            fontWeight: FontWeight.medium,
            color: BackgroundColor.primary,
            backgroundColor: "transparent"
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            width: 32,
            height: 32,
            resizeMode: "contain",
            tintColor: FontColor.primary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderList: [],
            isCheckMode: props.isCheckMode,
            appState: AppState.currentState
        }

        this.getCartQuantity()
    }

    componentDidMount(){
        AppState.addEventListener("change", this._handleAppStateChange)
        if (!this.props.isCheckMode) {
            this.updateOrderHistory()
            this.callTimer()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getCartQuantity()
    }

    componentWillUnmount() {
        clearInterval(timer)
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active" && !!this.state.order) {
            this.updateOrderHistory()
        }

        this.state.appState = nextAppState
    }

    callTimer() {
        clearInterval(timer)
        timer = setInterval(() => {
            this.updateOrderHistory()
        }, 10000)
    }

    updateOrderHistory() {
        getOrderHistory().then(orderList => {
            let openOrders = orderList.filter(order => order.status < OrderStatus.DELIVERED)

            this.setState({
                orderList: openOrders
            })
        }).catch(error => {
            this.setState({
                orderList: []
            })
        })
    }

    getCartQuantity() {
        getCart((error, cart) => {
            if (error) {
                this.props.totalCart(0)
            } else {
                if (cart) {
                    let quantity = 0

                    for (product of cart.products) {
                        quantity = quantity + product.quantity
                    }

                    this.props.totalCart(quantity)
                } else {
                    this.props.totalCart(0)
                }
            }
        })
    }

    openOrderHistory() {
        this.props.navigation.navigate("OrderHistoryListContainer", {
            navigation: this.props.navigation
        })
    }

    openCart() {
        getCart((error, cart) => {
            if (cart != null && cart.products.length > 0) {
                this.props.navigation.navigate("CartContainer")
            } else {
                this.openAlert(GENERAL_STRINGS.emptyCart)
            }
        })
    }

    openCheckList() {
        const navigationAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "CheckProductListContainer"
                })
            ]
        })

        this.props.navigation.dispatch(navigationAction)
    }

    openAlert(message) {
        if (!alertOpened) {
            alertOpened = true
            Alert.alert(
                GENERAL_STRINGS.warning,
                message,
                [{
                    text: GENERAL_STRINGS.ok,
                    style: "cancel",
                    onPress: () => {
                        alertOpened = false
                    }
                }],
                { cancelable: false }
            )
        }
    }

    render() {
        if (this.state.isCheckMode) {
            return (
                <View style = { this.stylesView.container }>
                    <TouchableOpacity onPress = { () => this.openCheckList() } accessibilityLabel="touchableOpenOrderStatus">
                        <ImageBackground style = { this.stylesView.icon } imageStyle = { this.stylesImage.icon } source = { Images.icons.checkIcon } accessibilityLabel = "imageBackgroundOrderStatus"/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style = { this.stylesView.container }>
                    <TouchableOpacity onPress = { () => this.openOrderHistory() } accessibilityLabel="touchableOpenOrderStatus">
                        <ImageBackground style = { this.stylesView.icon } imageStyle = { this.stylesImage.icon } source = { Images.icons.orderHistory } accessibilityLabel = "imageBackgroundOrderStatus">
                            { (this.state.orderList.length > 0) ?
                                <View style={ this.stylesView.iconQuantity } accessibilityLabel = "viewIcon">
                                    <Text style = { this.stylesText.quantity } accessibilityLabel = "textQuantity">
                                        { this.state.orderList.length }
                                    </Text>
                                </View> : null }
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { () => this.openCart() } accessibilityLabel="touchableOpenCart">
                        <ImageBackground style = { this.stylesView.icon } imageStyle = { this.stylesImage.icon } source = { Images.icons.cart } accessibilityLabel = "imageBackgroundCart">
                            { (this.props.quantity > 0) ?
                                <View style={ this.stylesView.iconQuantity } accessibilityLabel = "viewIcon">
                                    <Text style = { this.stylesText.quantity } accessibilityLabel = "textQuantity">
                                        { this.props.quantity > 99 ? "99+" : this.props.quantity }
                                    </Text>
                                </View> : null }
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        isCheckMode: state.general.isCheckMode,
        quantity: state.cart.quantity
    }),
    { totalCart }
)( NavigationHeaderRight )