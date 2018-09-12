import React, { PureComponent } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import AddressService from "../address/AddressService"
import { getOrder, saverOrder } from "../../database/specialization/StorageOrder"
import { saveOrderType } from "../../database/specialization/StorageGeneral"
import { GENERAL_STRINGS, ORDER_STATUS_CONTROLLER_STRINGS as OrderStrings} from "../../languages/index"
import { IdOrderType, getOrderTypeIcon, getCurrentLocation } from "../../utils"
import Images from "../../assets/index"
import Spinner from "../../libs/customSpinner"
import OrderTypeSelectionComponent from "./OrderTypeSelectionComponent"
import OrderTypeSelectionItem from "./model/OrderTypeSelectionItem"

export default class OrderTypeSelectionController extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            address: "",
            orderTypeSelectionList: [new OrderTypeSelectionItem(IdOrderType.DELIVERY.name, getOrderTypeIcon(IdOrderType.DELIVERY.id), IdOrderType.DELIVERY),
                                     new OrderTypeSelectionItem(IdOrderType.TAKEAWAY.name, getOrderTypeIcon(IdOrderType.TAKEAWAY.id), IdOrderType.TAKEAWAY)]
        }
        
        this.onPressOrderType = this._onPressOrderType.bind(this)
    }

    componentWillMount() {
        this._retrieveAddress()
    }

    _retrieveAddress() {
        getCurrentLocation().then(position => {
            AddressService.getUserAddress(position.coords.latitude, position.coords.longitude).then(address => {
                this.setState({
                    address: address
                })
            }).catch(error => { })
        }).catch(error => { })
    }

    _onPressOrderType(orderType) {
        saveOrderType([orderType.id], (error, orderTypeStorage) => {
            this.props.navigation.navigate("UnityListContainer")
        })
    }

    render() {
        return (
            <OrderTypeSelectionComponent orderTypeSelectionList = { this.state.orderTypeSelectionList }
                                         address = { this.state.address }
                                         onPressOrderType = { this.onPressOrderType }
            />
        )
    }
}