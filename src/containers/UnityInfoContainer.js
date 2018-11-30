import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import UnityInfoController from "../components/unityInfo/UnityInfoController"

export default class UnityInfoContainer extends PureComponent {

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
                <UnityInfoController navigation = { this.props.navigation }/>
            </SafeAreaView>
        )
    }
}