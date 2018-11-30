import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import DiscountsClubOffersGroupController from "../components/discountsClub/offersGroup/DiscountsClubOffersGroupController"

export default class DiscountsClubOffersGroupContainer extends PureComponent {

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
                <DiscountsClubOffersGroupController offersGroup = { this.props.navigation.state.params.offersGroup }
                                                    navigation = { this.props.navigation }
                />
            </SafeAreaView>
        )
    }
}