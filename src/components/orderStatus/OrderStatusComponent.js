import React, { Component } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import moment from  "moment"
import Images from "../../assets/index"
import { ORDER_STATUS_COMPONENT_STRINGS as OrderStrings } from "../../languages/index"
import { screenWidthPercentage, getOrderStatusMessage, OrderStatus } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"

export default class OrderStatusComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            width: screenWidthPercentage(100)
        },
        flatList: {
            width: screenWidthPercentage(100)
        },
        orderNumber: {
            height: 44,
            width: screenWidthPercentage(100),
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white"
        },
        statusTitle: {
            height: 36,
            width: screenWidthPercentage(100),
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center"
        },
        orderStatusList: {
            flexGrow: 1,
            width: screenWidthPercentage(100),
            marginBottom: 20,
            paddingBottom: 16,
            backgroundColor: "white"
        },
        orderStatus: {
            height: 44,
            width: screenWidthPercentage(100),
            paddingRight: 20,
            paddingLeft: 16,
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: "white"
        },
        orderStatusMessageAndTime: {
            flex: 1,
            marginLeft: 8,
            marginBottom: 4,
            flexDirection: "row",
            alignSelf: "stretch",
            alignItems: "flex-end",
            justifyContent: "space-between"
        },
        statusMajorReceived: {
            height: 28,
            width: 28,
            marginRight: 4,
            marginLeft: 4,
            alignItems: "center",
            justifyContent: "center"
        },
        statusMajorReceivedWithDash: {
            height: 44,
            width: 36,
            alignItems: "center",
            justifyContent: "center"
        },
        statusMajorPending: {
            height: 28,
            width: 28,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        order: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        orderNumber: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        statusTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 18,
            color: FontColor.secondary
        },
        statusReceived: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        statusPending: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        },
        statusDate: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary
        }
    })

    stylesImage = StyleSheet.create({
        statusMajorReceived: {
            height: 28,
            width: 28,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMajorReceivedWithDash: {
            height: 44,
            width: 36,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMajorPending: {
            height: 28,
            width: 28,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMinorReceived: {
            height: 16,
            width: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMinorPending: {
            height: 16,
            width: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMinorReceivedWithDash: {
            height: 16,
            width: 16,
            marginTop: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        statusMinorPendingWithDash: {
            height: 16,
            width: 16,
            marginTop: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            listStatus: props.listStatus,
            usedListStatus: props.usedListStatus
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listStatus: nextProps.listStatus,
            usedListStatus: nextProps.usedListStatus
        })
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <View style = { this.stylesView.orderNumber }>
                    <Text style = { this.stylesText.order }>
                        { OrderStrings.orderNumber }
                    </Text>
                    <Text style = { this.stylesText.orderNumber }>
                        #{ this.props.orderId }
                    </Text>
                </View>
                <View style = { this.stylesView.statusTitle }>
                    <Text style = { this.stylesText.statusTitle }>
                        { OrderStrings.statusTitle }
                    </Text>
                </View>
                <View style = { this.stylesView.orderStatusList }>
                    { this.state.usedListStatus.map((status, index) => {
                        if (!this.props.isOrderCanceled && status == OrderStatus.CANCELLED) {
                            return null
                        } else {
                            let listStatusFiltered = this.state.listStatus.filter(statusFromArray =>  statusFromArray.idOrderStatus == status)
                            let statusFiltered = listStatusFiltered.length == 1 ? listStatusFiltered[0] : null

                            let hasPostStatus = null
                            if (!statusFiltered) {
                                hasPostStatus = this.state.listStatus.filter(statusFromArray => statusFromArray.idOrderStatus != OrderStatus.CANCELLED && statusFromArray.idOrderStatus > status)
                            }

                            return (
                                <View key = { index } style = { this.stylesView.orderStatus }>
                                    <ImageBackground style = { index > 0 ? this.stylesView.statusMajorReceivedWithDash : this.stylesView.statusMajorReceived }
                                                     imageStyle = { index > 0 ? this.stylesImage.statusMajorReceivedWithDash : this.stylesImage.statusMajorReceived }
                                                     source = { index > 0 ? Images.icons.circleDash : Images.icons.circle }>
                                        { status <= this.props.currentOrderStatus ?
                                            <Image style = { index > 0 ? this.stylesImage.statusMinorReceivedWithDash : this.stylesImage.statusMinorReceived }
                                                   source = { (!!hasPostStatus && hasPostStatus.length) || !!statusFiltered ? Images.icons.check : Images.icons.cancel }
                                            />
                                            : null }
                                    </ImageBackground>
                                    <View style = { this.stylesView.orderStatusMessageAndTime }>
                                        <Text style = { this.stylesText.statusReceived }>
                                            { getOrderStatusMessage(status) }
                                        </Text>
                                        <Text style = { this.stylesText.statusReceived }>
                                            { !!statusFiltered && status <= this.props.currentOrderStatus ? moment(statusFiltered.timestampCreation).format("HH:mm") : null}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    }) }
                </View>
            </View>
        )
    }
}