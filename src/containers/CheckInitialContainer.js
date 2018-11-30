import React, { PureComponent } from "react"
import { View, StyleSheet } from "react-native"
import { FontColor } from "../theme/Theme"
import CheckInitialController from "../components/check/CheckInitialController"

export default class CheckInitialContainer extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <CheckInitialController navigation = { this.props.navigation }/>
            </View>
        )
    }
}
