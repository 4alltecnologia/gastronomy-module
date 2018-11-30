import React, { PureComponent } from "react"
import { View, Alert, StyleSheet } from "react-native"
import { NavigationActions } from "react-navigation"
import Spinner from "../../libs/customSpinner"
import { addCheck, getCheck, removeCheck } from "../../database/specialization/StorageCheck"
import { createCheckOrder, getOrderDetails } from "../../api/APIRequests"
import { isDeviceConnected, OrderStatus } from "../../utils"
import { ExternalMethods } from "../../native/Functions"
import { GENERAL_STRINGS } from "../../languages/index"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import { connect } from "react-redux"
import { setCheckName, setCheckNumber, setCheckOrderId, setTableNumber, setCheckUnity } from "../../redux/actions"

class CheckInitialController extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            isDeviceConnected: true,
            isLoading: true,
            checkNumber: props.checkNumber, //redux
            checkName: "",
            unityId: props.unityId //redux
        }

        this.tryInternet = this._getCheckData.bind(this)
    }

    componentDidMount() {
        this._getCheckData()
    }

    _getCheckData() {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                this.setState({
                    isDeviceConnected: true
                }, () => getCheck(this.state.checkNumber, (errorCheckStorage, checkStorage) => {
                    if (!!errorCheckStorage) {
                        this._showAlert(errorCheckStorage)
                    } else if (!checkStorage) {
                        createCheckOrder(this.state.unityId, this.state.checkNumber).then(order => {
                            addCheck(this.state.checkNumber, this.state.checkName, this.state.unityId, order.id, (error, newCheck) => {
                                this._setCheckOnRedux(newCheck.checkNumber, newCheck.checkName, newCheck.unityId, newCheck.orderId, newCheck.tableNumber)
                                this._navigate(order.orderItems)
                            })
                        }).catch(error => {
                            this._showAlert(!!error.data && !!error.data.message ? error.data.message : GENERAL_STRINGS.alertErrorMessage)
                        })
                    } else {
                        getOrderDetails(checkStorage.orderId).then(orderDetails => {
                            if (orderDetails.status == OrderStatus.DELIVERED || orderDetails.status == OrderStatus.CANCELLED) {
                                removeCheck(this.state.checkNumber, checkStorage.unityId, (error, data) => {
                                    this._showAlert(!!error ? error : GENERAL_STRINGS.alertErrorMessage)
                                })
                            } else {
                                this._setCheckOnRedux(checkStorage.checkNumber, checkStorage.checkName, checkStorage.unityId, checkStorage.orderId, checkStorage.tableNumber)
                                this._navigate(orderDetails.orderItems)
                            }
                        }).catch(error => {
                            this._showAlert(!!error.data && !!error.data.message ? error.data.message : GENERAL_STRINGS.alertErrorMessage)
                        })
                    }
                })
                )
            } else {
                this.setState({
                    isDeviceConnected: false,
                    isLoading: false
                })
            }
        })
    }

    _navigate(orderItems) {
        this.setState({
            isLoading: false
        }, () => {
            const navigationAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: orderItems.length > 0 ? "CheckProductListContainer" : "NewUnityDetailContainer"
                    })
                ]
            })

            this.props.navigation.dispatch(navigationAction)
        })
    }

    _setCheckOnRedux(checkNumber, checkName, unityId, orderId, tableNumber) {
        this.props.setCheckName(checkName)
        this.props.setCheckNumber(checkNumber)
        this.props.setCheckOrderId(orderId)
        this.props.setCheckUnity(unityId)
        tableNumber ? this.props.setTableNumber(tableNumber) : null
    }

    _showAlert(alertMessage) {
        Alert.alert(
            GENERAL_STRINGS.warning,
            alertMessage,
            [{ text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                this.setState({
                    isLoading: false
                }, () => ExternalMethods.closeModule())
            }}],
            { cancelable: false }
        )
    }

    render() {
        if (!this.state.isDeviceConnected) {
            return (
                <NoInternetWarning tryInternet = { this.tryInternet }/>
            )
        } else {
            return (
                <View style = { this.stylesView.general } accessibilityInfo = "viewGeneral">
                    <Spinner visible = { this.state.isLoading }/>
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        checkNumber: state.check.checkNumber,
        unityId: state.general.unityId
    }),
    { setCheckName, setCheckNumber, setCheckOrderId, setTableNumber, setCheckUnity }
)(CheckInitialController)