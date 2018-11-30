import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import DiscountsClubTradesmanDetailsController from "../components/discountsClub/tradesmanDetails/DiscountsClubTradesmanDetailsController"

export default class DiscountsClubTradesmanDetailsContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView forceInset = {{ bottom: "never" }} style = { this.stylesView.safeArea }>
                <DiscountsClubTradesmanDetailsController tradesman = { this.props.navigation.state.params.tradesman }
                                                         offersGroup = { this.props.navigation.state.params.offersGroup }
                                                         previousOffersGroup = { this.props.navigation.state.params.previousOffersGroup }
                                                         navigation = { this.props.navigation }
                />
            </SafeAreaView>
        )
    }
}