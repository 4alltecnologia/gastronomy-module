import React, { Component } from "react"
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from "react-native"
import AddressListController from "./AddressListController"

export default class AddressListModal extends Component {

    stylesView = StyleSheet.create({
        overlay: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        mainViewModal: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexGrow: 1,
            backgroundColor:"#ffffff",
            flexDirection: "column",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderColor: "white",
            paddingHorizontal: 15,
            paddingBottom: 15,
            paddingTop: 8
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal animationType = "slide"
                   transparent = { true }
                   visible = { this.props.showModalAddress }
                   onRequestClose = { () => {} }>
                <TouchableWithoutFeedback onPress = { () => this.props.defaultAddressSelected() }>
                    <View style = { this.stylesView.overlay } accessibilityLabel = "viewOverlay">
                        <TouchableWithoutFeedback onPress = { () => null }>
                            <View style = { this.stylesView.mainViewModal } accessibilityLabel = "viewMainModal">
                                <AddressListController navigation = { this.props.navigation }
                                                       defaultAddressSelected = { this.props.defaultAddressSelected }
                                                       cameFromModal = { true }
                                                       cameFromCart = { this.props.cameFromCart }/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}