import React, { PureComponent } from "react"
import DiscountsClubLoggedInComponent from "./DiscountsClubLoggedInComponent"
import DiscountsClubLoggedOffComponent from "./DiscountsClubLoggedOffComponent"

export default class DiscountsClubLoginController extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isUserLoggedIn) {
            return (
                <DiscountsClubLoggedInComponent userName = { this.props.userName }
                                                onGoToMyCoupons = { this.props.onGoToMyCoupons }
                />
            )
        } else {
            return (
                <DiscountsClubLoggedOffComponent onLoginUser = { this.props.onLoginUser }/>
            )
        }
    }
}