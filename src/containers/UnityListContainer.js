import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import UnityListController from "../components/unityList/UnityListController"

export default class UnityListContainer extends PureComponent {

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
                <UnityListController navigation = { this.props.navigation }/>
            </SafeAreaView>
        )
    }
}