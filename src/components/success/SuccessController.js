import React, { PureComponent } from "react"
import { ScrollView, StyleSheet, StatusBar } from "react-native"
import { getOrder } from "../../database/specialization/StorageOrder"
import { getUnityMedia, MediaTypes, formatTime } from "../../utils"
import SuccessBottomComponent from "./SuccessBottomComponent"
import SuccessHeaderComponent from "./SuccessHeaderComponent"
import { FontColor } from "../../theme/Theme"
import { SUCCESS_BOTTOM_COMPONENT_STRINGS as SuccessStrings } from "../../languages/index"

export default class SuccessController extends PureComponent {

    stylesView = StyleSheet.create({
        scrollView: {
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            purchaseDate: props.purchaseDate,
            subtotalValue: props.subtotalValue,
            totalValue: props.totalValue,
            voucherValue: props.voucherValue,
            voucherCode: props.voucherCode,
            paymentMode: props.paymentMode,
            deliveryMode: props.deliveryMode,
            unityName: props.unityName,
            unityLogoURL: props.unityLogoURL,
            deliveryTime: props.deliveryTime,
            deliveryEstimatedIdUnitTime: props.deliveryEstimatedIdUnitTime,
            takeAwayEstimatedTime: props.takeAwayEstimatedTime,
            takeAwayEstimatedIdUnitTime: props.takeAwayEstimatedIdUnitTime
        }
    }

    render(){
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"
        return (
            <ScrollView style = { this.stylesView.scrollView } accessibilityLabel = "scrollView">
                <StatusBar barStyle = { barStyle } accessibilityLabel="statusBar"/>
                <SuccessHeaderComponent deliveryTime = { this.state.deliveryTime }
                                        deliveryEstimatedIdUnitTime = { this.state.deliveryEstimatedIdUnitTime }
                                        takeAwayEstimatedTime = { this.state.takeAwayEstimatedTime }
                                        takeAwayEstimatedIdUnitTime = { this.state.takeAwayEstimatedIdUnitTime }
                                        paymentMode = { this.state.paymentMode }
                                        deliveryMode = { this.state.deliveryMode }
                />
                <SuccessBottomComponent onFinishTapped = { this.props.onFinishTapped }
                                        unityName = { this.state.unityName }
                                        unityLogoURL = { this.state.unityLogoURL }
                                        purchaseDate = { formatTime(Date.now(), SuccessStrings.todayFormat) }
                                        subtotalValue = { this.state.subtotalValue }
                                        totalValue = { this.state.totalValue }
                                        voucherValue = { this.state.voucherValue }
                                        voucherCode = { this.state.voucherCode }
                />
            </ScrollView>
        )
    }
}