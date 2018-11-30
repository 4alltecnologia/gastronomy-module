import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { setCurrentAddress } from "../../redux/actions"
import CurrentAddressView from "./CurrentAddressView"

class CurrentAddressController extends PureComponent {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <CurrentAddressView
                currentAddress = { this.props.currentAddress }
                changeAddress = { this.props.changeAddress }/>
        )
    }
}

export default connect(
    state => ({
        currentAddress: state.general.currentAddress
    }),
    { setCurrentAddress }
) ( CurrentAddressController )