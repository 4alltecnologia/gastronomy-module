import React, { Component } from "react"
import PaymentController from "../components/payment/PaymentController"

export default class PaymentContainer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PaymentController cart = { this.props.navigation.state.params.cart }
                               idOrderType = { this.props.navigation.state.params.idOrderType }
                               navigation = { this.props.navigation }
            />
        )
    }
}