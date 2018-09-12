import React, { Component } from "react"
import { ScrollView, StyleSheet, Alert } from "react-native"
import moment from  "moment"
import { getOrder, saverOrder } from "../../database/specialization/StorageOrder"
import { GENERAL_STRINGS, ORDER_STATUS_CONTROLLER_STRINGS as OrderStrings} from "../../languages/index"
import { OrderStatus, isOrderStatusBeingUsed } from "../../utils"
import { getOrderDetails } from "../../api/ApiRequests"
import Spinner from "../../libs/customSpinner"
import NoOrdersWarning from "../../components/messages/NoOrdersWarning"
import OrderStatusComponent from "./OrderStatusComponent"
import OrderStatusDeliveryComponent from "./OrderStatusDeliveryComponent"

var timer = null
export default class OrderStatusController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "rgb(234,232,241)"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            order: null,
            orderId: this.props.orderId ? this.props.orderId : null,
            hasOrders: true,
            orderStatus: 0,
            listStatus: [],
            isOrderCanceled: false
        }
    }

    componentWillMount() {
        this._getOrderId()
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    _getOrderFromServer() {
        timer = setInterval(() => this.callOrderStatus(), 7000)
    }

    _getOrderId() {
        if (this.state.orderId == null) {
            getOrder((error, order) => {
                if (error) {
                    Alert.alert(
                        GENERAL_STRINGS.warning,
                        GENERAL_STRINGS.alertErrorMessage,
                        [
                            {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                                    this.setState({
                                        loading: false,
                                        hasOrders: false
                                    })
                                }}
                        ]
                    )
                } else {
                    if (order == null){
                        this.setState({
                            hasOrders: false,
                            loading: false
                        })
                    } else {
                        this.setState({
                            orderId: order.id,
                            order: order
                        })

                        this._getOrderFromServer()
                    }
                }
            })
        } else {
            this._getOrderFromServer()
        }
    }

    callOrderStatus() {
        if (!!this.state.order && (this.state.order.status == OrderStatus.DELIVERED || this.state.order.status == OrderStatus.CANCELLED)) {
            clearInterval(timer)
        }
        getOrderDetails(this.state.orderId).then(orderDetails => {
            if (this.state.orderStatus == 0 || (this.state.orderStatus != orderDetails.status && isOrderStatusBeingUsed(orderDetails.status))) {
                if (!this.state.loading) {
                    this.setState({
                        loading: true
                    })
                }

                let listStatus = orderDetails.orderStatusLog.filter((status, index, self) => self.findIndex(statusToFilter => statusToFilter.idOrderStatus === status.idOrderStatus) === index).filter((status) => isOrderStatusBeingUsed(status.idOrderStatus) == true)
                let isCanceled = listStatus.filter((status) => status.idOrderStatus == OrderStatus.CANCELLED).length > 0 ? true : false

                saverOrder(orderDetails, (error, data) => {
                    setTimeout(() => {
                        if (error) {
                            Alert.alert(
                                GENERAL_STRINGS.warning,
                                GENERAL_STRINGS.genericError,
                                [
                                    {
                                        text: GENERAL_STRINGS.ok, style: "cancel", onPress: () => {
                                            this.setState({
                                                loading: false
                                            })
                                        }
                                    }
                                ]
                            )
                        } else {
                            this.setState({
                                order: orderDetails,
                                listStatus: listStatus,
                                loading: false,
                                orderStatus: listStatus[0].idOrderStatus,
                                isOrderCanceled: isCanceled
                            })
                        }
                    }, 1000)
                })
            }
        }).catch(error => {
            Alert.alert(
                GENERAL_STRINGS.warning,
                GENERAL_STRINGS.alertErrorMessage,
                [
                    {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                            this.setState({
                                loading: false,
                                hasOrders: false
                            })
                        }}
                ]
            )
        })
    }

    _renderNoOrders() {
        return (
            <NoOrdersWarning updateNoOrders = {this.props.updateNoOrders.bind(this)}/>
        )
    }

    _address(orderAddress) {
        let complement = !!orderAddress.complement ? "/" + orderAddress.complement : ""
        let primaryAddress = orderAddress.street + ", " + orderAddress.number + complement
        let secondaryAddress = orderAddress.city + ", " + orderAddress.uf
        let terciaryAddress = OrderStrings.zip + orderAddress.cep

        let address = primaryAddress + "\n" + secondaryAddress + "\n" + terciaryAddress

        return address
    }

    render() {
        if (!this.state.hasOrders) {
            return this._renderNoOrders()
        } else {
            return (
                <ScrollView style={this.stylesView.general}>
                    <Spinner visible={this.state.loading} size={115} textContent={GENERAL_STRINGS.loading}/>
                    <OrderStatusComponent orderId={this.state.orderId}
                                          currentOrderStatus={this.state.orderStatus}
                                          listStatus={!!this.state.listStatus ? this.state.listStatus : []}
                                          usedListStatus={ true } //UsedOrderStatus
                                          isOrderCanceled={this.state.isOrderCanceled}
                    />
                    <OrderStatusDeliveryComponent
                        deliveryTime={!!this.state.order && !!this.state.order.estimatedTimestamp ? moment(this.state.order.estimatedTimestamp).format("HH:mm") : null}
                        orderAddress={!!this.state.order ? this._address(this.state.order.orderAddress) : null}
                    />
                </ScrollView>
            )
        }
    }
}