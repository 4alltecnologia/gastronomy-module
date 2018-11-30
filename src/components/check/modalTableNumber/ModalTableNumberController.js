import React, { PureComponent } from "react"
import ModalTableNumberView from "./ModalTableNumberView"
import { connect } from "react-redux"
import { setTableNumber } from "../../../redux/actions"
import { ExternalMethods } from "../../../native/Functions"
import { FirebaseActions } from "../../../utils"

class ModalTableNumberComponent extends PureComponent {

    constructor(props){
        super(props)

        this.confirmTableNumber = this._confirmTableNumber.bind(this)
    }

    _confirmTableNumber(tableNumber) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.CHECK_BAR_TABLE_NUMBER, { tableNumber: tableNumber })
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