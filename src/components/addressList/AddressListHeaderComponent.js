import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { UserAddressType } from "../../utils"
import AddressListCellComponent from "./AddressListCellComponent"

export default class AddressListHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column"
        },
        listSeparator: {
            height: 0.75,
            marginHorizontal: 20,
            backgroundColor: "#d1d1d1"
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.container } accessibilityLabel = "viewAddressHeader">
                <AddressListCellComponent address = { this.props.addressGps }
                                          error = { this.props.error }
                                          addressType = { UserAddressType.GPS }
                                          addAddress = { this.props.addAddress }
                                          deleteAddress = { this.props.deleteAddress }
                                          activateGps = { this.props.activateGps }
                                          selectAddress = { this.props.selectAddress }/>
                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.listSeparator }/>
                <AddressListCellComponent address = { this.props.addressHome }
                                          error = { null }
                                          addressType = { UserAddressType.HOME }
                                          addAddress = { this.props.addAddress }
                                          deleteAddress = { this.props.deleteAddress }
                                          selectAddress = { this.props.selectAddress }/>
                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.listSeparator }/>
                <AddressListCellComponent address = { this.props.addressWork }
                                          error = { null }
                                          addressType = { UserAddressType.WORK }
                                          addAddress = { this.props.addAddress }
                                          deleteAddress = { this.props.deleteAddress }
                                          selectAddress = { this.props.selectAddress }/>
                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.listSeparator }/>
            </View>
        )
    }
}