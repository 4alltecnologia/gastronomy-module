import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import DiscountsClubOfferDetailsController from "../components/discountsClub/offerDetails/DiscountsClubOfferDetailsController"

export default class DiscountsClubOfferDetailsContainer extends PureComponent {

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
                <DiscountsClubOfferDetailsController offer = { this.props.navigation.state.params.offer }
                                                     navigation = { this.props.navigation }
                />
            </SafeAreaView>
        )
    }
}