import React, { PureComponent } from "react"
import ModalZipCodeView from "./ModalZipCodeView"

export default class ModalZipCodeComponent extends PureComponent {

    constructor(props){
        super(props)
    }

    confirmZipCode = (zipCodePrefix, zipCodeSufix) => {
        this.props.methodSaveAddress(zipCodePrefix + "-" + zipCodeSufix)
    }

    render(){
        return (
            <ModalZipCodeView
                {...this.props}
                stateController={this.state}
                confirmZipCode={this.confirmZipCode.bind()}/>
        )
    }
}