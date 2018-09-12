import React, { PureComponent } from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { NavigationActions } from "react-navigation"
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

        this.navigateTo = this._navigateTo.bind(this)
    }

    _navigateTo(screenName) {
        const navigationAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: screenName
                })
            ]
        })

        this.props.navigation.dispatch(navigationAction)
    }

    render() {
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"

        return (
            <View style = { this.stylesView.general }>
                <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                <CheckInitialController navigateTo = { this.navigateTo }/>
            </View>
        )
    }
}
