import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import PropTypes from "prop-types"
import * as Errors from "../../../../errors"
import DiscountsClubLoginController from "../login/DiscountsClubLoginController"

export default class DiscountsClubHomeFooterController extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <DiscountsClubLoginController isUserLoggedIn = { this.props.isUserLoggedIn }
                                              userName = { this.props.userName }
                                              onLoginUser = { this.props.onLoginUser }
                                              onGoToMyCoupons = { this.props.onGoToMyCoupons }
                />
            </View>
        )
    }
}

DiscountsClubHomeFooterController.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
    onLoginUser: PropTypes.func.isRequired,
    onGoToMyCoupons: PropTypes.func.isRequired
}