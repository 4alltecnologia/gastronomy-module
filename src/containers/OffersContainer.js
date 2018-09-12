import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import OffersController from "../components/offers/OffersController"

export default class OffersContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <SafeAreaView style = { this.stylesView.safeArea }>
                <OffersController navigation = { this.props.navigation }/>
            </SafeAreaView>
        )
    }
}
