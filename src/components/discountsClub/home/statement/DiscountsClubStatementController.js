import React, { PureComponent } from "react"
import { StyleSheet, View, AppState } from "react-native"
import { ExternalMethods } from "../../../../native/Functions"
import DiscountsClubStatementLoggedInComponent from "./DiscountsClubStatementLoggedInComponent"
import DiscountsClubStatementLoggedOffComponent from "./DiscountsClubStatementLoggedOffComponent"

export default class DiscountsClubStatementController extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isUserLoggedIn) {
            return (
                <DiscountsClubStatementLoggedInComponent userSavings = { this.props.userSavings }
                                                         onSelectItem = { this.props.onSelectItem }
                />
            )
        } else {
            return (
                <DiscountsClubStatementLoggedOffComponent/>
            )
        }
    }
}