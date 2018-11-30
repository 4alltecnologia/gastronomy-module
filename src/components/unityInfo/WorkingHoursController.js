import React, { PureComponent } from "react"
import WorkingHoursComponent from "./WorkingHoursComponent"

export default class PaymentMethodsListController extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <WorkingHoursComponent workingHours = { this.props.workingHours }/>
        )
    }
}