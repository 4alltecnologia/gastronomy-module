import React, { PureComponent } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { getAddresses, deleteAddress } from "../../api/ApiRequests"
import { ExternalMethods } from "../../native/Functions"
import AddressListView from "./AddressListView"
import { ADDRESS_LIST_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../languages/index"
import { isDeviceConnected } from "../../utils"
import NoInternetWarning from "../../components/messages/NoInternetWarning"

export default class AddressListController extends PureComponent {

    stylesView = StyleSheet.create({
        mainView: {
            flex: 1
        }
    })

    constructor(props){
        super(props)

        this.state = {
            detailsUnity: [],
            loadingList: true,
            addresses: [],
            sessionToken: "",
            refreshingList: false,
            isConnected: true
        }

        ExternalMethods.getUserLogged((errorUser, resultUser) => {
            this.setState({
                sessionToken: resultUser.sessionToken
            }, () => this.loadAddresses(resultUser.sessionToken))
        })
    }

    /**
     * Execute by pull refresh
     * @private
     */
    _onRefresh = () => {
        this.setState({refreshingList: true})
        this.loadAddresses(this.state.sessionToken)
    }

    loadAddresses = (sessionToken) => {
        isDeviceConnected(isConnected => {
            if (isConnected) {
                getAddresses(sessionToken).then(data => {
                    if (data.addresses) {
                        this.setState({
                            addresses: data.addresses,
                            loadingList: false,
                            refreshingList: false,
                            detailsUnity: this.props.detailsUnity,
                            sessionToken: sessionToken
                        })
                    } else {
                        this.setState({
                            addresses: [],
                            loadingList: false,
                            refreshingList: false,
                            sessionToken: sessionToken
                        })
                    }
                }).catch(error => {
                    this.setState({
                        addresses: [],
                        loadingList: false,
                        refreshingList: false,
                        sessionToken: sessionToken
                    })
                })
            } else {
                this.setState({
                    isConnected: false
                })
            }
        })
    }

    _deleteAddress = (index) => (event) => {
        let address = this.state.addresses[index]

        Alert.alert(
            ADDRESS_LIST_CONTAINER_STRINGS.attention,
            ADDRESS_LIST_CONTAINER_STRINGS.wantToDeleteAddress,
            [
                {text: GENERAL_STRINGS.no, style: "cancel"},
                {text: GENERAL_STRINGS.yes, onPress: () => this.confirmDeleteAddress(address)},
            ],
            { cancelable: false }
        )
    }

    confirmDeleteAddress = (address) => {
        this.setState({
            loadingList: true
        })

        isDeviceConnected(isConnected => {
            if (isConnected) {
                deleteAddress(this.state.sessionToken, address.id).then(data => {
                    this.props.navigation.state.params.onReceiveAddressRemove(address)
                    this._onRefresh()
                })
            } else {
                this.setState({
                    isConnected: false
                })
            }
        })
    }

    addNewAddress = () => {
        this.props.navigation.navigate("AddressSearch", {navigation:this.props.navigation, sessionToken: this.state.sessionToken, onRefresh: this._onRefresh.bind()})
    }

    refreshController() {
        this.setState({
            isConnected: true,
            loadingList: false
        })
    }

    render() {
        if (this.state.isConnected) {
            return (
                <AddressListView
                    navigation={this.props.navigation}
                    stateController={this.state}
                    _onRefresh={this._onRefresh.bind()}
                    _deleteAddress={this._deleteAddress.bind()}
                    addNewAddress={this.addNewAddress.bind()}
                />
            )
        } else {
            return (
                <View style={this.stylesView.mainView} accessibilityLabel="viewNoInternet">
                    <NoInternetWarning tryInternet = { this.refreshController.bind(this) }/>
                </View>
            )
        }
    }
}