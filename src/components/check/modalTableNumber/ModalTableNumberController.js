import React, { PureComponent } from "react"
import ModalTableNumberView from "./ModalTableNumberView"
import { connect } from "react-redux"
import { setTableNumber } from "../../../redux/actions"

class ModalTableNumberComponent extends PureComponent {

    constructor(props){
        super(props)

        this.confirmTableNumber = this._confirmTableNumber.bind(this)
    }

    _confirmTableNumber(tableNumber) {
        this.props.setTableNumber(tableNumber)
        this.props.setTableNumberModalVisible()
        this.props.actionCheckButton(true)
    }

    render(){
        return (
            <ModalTableNumberView
                {...this.props}
                confirmTableNumber={this.confirmTableNumber}/>
        )
    }
}

export default connect(
    state => ({
        tableNumber: state.check.tableNumber
    }),
    { setTableNumber }
)(ModalTableNumberComponent)