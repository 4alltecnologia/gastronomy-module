import React, { PureComponent } from "react"
import ModalZipCodeView from "./ModalZipCodeView"

export default class ModalZipCodeController extends PureComponent {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <ModalZipCodeView
                setModalVisible = { this.props.setModalVisible }
                zipCode = { this.props.zipCode }
                changeZipCode = { this.props.changeZipCode }
                saveAddress = { this.props.saveAddress }/>
        )
    }
}