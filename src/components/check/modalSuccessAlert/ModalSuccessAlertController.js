import React, { PureComponent } from "react"
import ModalSuccessAlertView from "./ModalSuccessAlertView"

export default class ModalSuccessAlertComponent extends PureComponent {

    constructor(props){
        super(props)

        this.closeModal = this._closeModal.bind(this)
    }

    _closeModal() {
        this.props.setSuccessAlertModalVisible()
    }

    render(){
        return (
            <ModalSuccessAlertView
                {...this.props}
                closeModal={this.closeModal}/>
        )
    }
}