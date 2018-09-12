import React, { Component } from "react"
import OrderStatusController from "../components/orderStatus/OrderStatusController"

export default class OrderStatusContainer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <OrderStatusController orderId = { this.props.orderId }
                                   updateNoOrders = { this.props.updateNoOrders ? this.props.updateNoOrders.bind(this) : null }
            />
        )
    }
}