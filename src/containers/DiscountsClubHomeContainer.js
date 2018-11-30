import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import DiscountsClubHomeController from "../components/discountsClub/home/DiscountsClubHomeController"

export default class DiscountsClubHomeContainer extends PureComponent {

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
                <DiscountsClubHomeController navigation = { this.props.navigation }/>
            </SafeAreaView>
        )
    }
}