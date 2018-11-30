import React, { PureComponent } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { connect } from "react-redux"
import { setCurrentAddress } from "../../redux/actions"
import { saveOrderType } from "../../database/specialization/StorageGeneral"
import { IdOrderType, getOrderTypeIcon, getCurrentLocation, FirebaseActions } from "../../utils"
import OrderTypeSelectionComponent from "./OrderTypeSelectionComponent"
import OrderTypeSelection from "../../models/orderType/OrderTypeSelection"
import { ExternalMethods } from "../../native/Functions"

class OrderTypeSelectionController extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            address: "",
            orderTypeSelectionList: [new OrderTypeSelection(IdOrderType.DELIVERY.name, getOrderTypeIcon(IdOrderType.DELIVERY.id), IdOrderType.DELIVERY),
                                     new OrderTypeSelection(IdOrderType.TAKEAWAY.name, getOrderTypeIcon(IdOrderType.TAKEAWAY.id), IdOrderType.TAKEAWAY)]
        }

        this.onPressOrderType = this._onPressOrderType.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.ORDER_TYPE.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.ORDER_TYPE.screen)
        })
    }

    _onPressOrderType(orderType) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.ORDER_TYPE.actions.SELECT_TYPE, { orderType: orderType.key })
        saveOrderType([orderType.id], (error, orderTypeStorage) => {
            this.props.navigation.navigate("UnityListContainer")
        })
    }

    render() {
        return (
            <OrderTypeSelectionComponent orderTypeSelectionList = { this.state.orderTypeSelectionList }
                                         address = { this.props.currentAddress }
                                         onPressOrderType = { this.onPressOrderType }
            />
        )
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setCurrentAddress }
) ( OrderTypeSelectionController )