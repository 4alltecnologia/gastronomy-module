import React, { PureComponent } from "react"
import { ScrollView, StyleSheet, StatusBar } from "react-native"
import { getOrder } from "../../database/specialization/StorageOrder"
import { getStatusBarStyle, getUnityMedia, MediaTypes, formatPrice } from "../../utils"
import { SUCCESS_BOTTOM_COMPONENT_STRINGS as SuccessStrings } from "../../languages/index"
import CheckSuccessComponent from "./CheckSuccessComponent"
import { connect } from "react-redux"

class CheckSuccessController extends PureComponent {

    stylesView = StyleSheet.create({
        scrollView: {
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            checkNumber: props.checkNumber, //redux
            checkName: props.checkName, //redux
            orderId: props.orderId, //redux
            tableNumber: props.tableNumber, //redux
            unityId: props.unityId, //redux
            unityDetails: props.unityDetails,
            totalPrice: props.totalPrice,
        }
    }

    render(){
        return (
            <ScrollView style = { this.stylesView.scrollView } accessibilityLabel = "scrollView">
                <StatusBar barStyle = { getStatusBarStyle() } accessibilityLabel = "statusBar"/>
                <CheckSuccessComponent unityName = { this.state.unityDetails.name }
                                       unityLogo = { getUnityMedia(MediaTypes.LOGO, this.state.unityDetails.media) }
                                       checkName = { this.state.checkName }
                                       checkNumber = { this.state.checkNumber }
                                       totalPrice = { formatPrice(this.state.totalPrice, true) }
                                       onFinishTapped = { this.props.onFinishTapped }
                />
            </ScrollView>
        )
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
) ( CheckSuccessController )