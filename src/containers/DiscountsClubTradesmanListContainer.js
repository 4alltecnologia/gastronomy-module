import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import DiscountsClubTradesmanListController from "../components/discountsClub/tradesmanList/DiscountsClubTradesmanListController"

export default class DiscountsClubTradesmanListContainer extends PureComponent {

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
                <DiscountsClubTradesmanListController offersGroup = { this.props.navigation.state.params.offersGroup }
                                                      previousOffersGroup = { this.props.navigation.state.params.previousOffersGroup }
                                                      navigation = { this.props.navigation }
                />
            </SafeAreaView>
        )
    }
}