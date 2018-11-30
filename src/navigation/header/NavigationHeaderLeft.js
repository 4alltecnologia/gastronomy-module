import React, { PureComponent } from "react"
import { Platform, BackHandler, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { NavigationActions } from "react-navigation"
import { BackgroundColor, FontColor, FontFamily } from "../../theme/Theme"
import { ExternalMethods } from "../../native/Functions"
import Images from "../../assets/index"
import { connect } from "react-redux"

class NavigationHeaderLeft extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            shouldCloseModule: !!props.shouldCloseModule ? props.shouldCloseModule : false,
            hideMainBackButton: !!props.hideMainBackButton ? props.hideMainBackButton : false,
            isCheckMode: props.isCheckMode,
            isOrderTypeSelectionMode: props.isOrderTypeSelectionMode
        }
    }

    stylesView = StyleSheet.create({
        content: {
            height: 44,
            width: 80,
            marginLeft: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 32,
            width: 32,
            resizeMode: "contain",
            tintColor: FontColor.primary
        }
    })

    styleTouchable = StyleSheet.create({
        icon: {
            height: 44,
            width: 44,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    _goBack(shouldReset = false, route = null) {
        if (shouldReset) {
            const orderStatusAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: route
                    })
                ]
            })

            this.props.navigation.dispatch(orderStatusAction)
        } else {
            this.props.navigation.goBack()
        }
    }

    render() {
        if (this.state.hideMainBackButton) {
            return (
                <View style = { this.stylesView.content }/>
            )
        } else {
            return (
                <View style = { this.stylesView.content }>
                    <TouchableOpacity onPress = { () => { !!this.props.shouldResetStackTo ? this._goBack(true, this.props.shouldResetStackTo) : this.state.shouldCloseModule ? ExternalMethods.closeModule() : this._goBack(false)}}
                                      accessibilityLabel = "touchableGoBack">
                        <View style = { this.styleTouchable.icon }>
                            <Image source = { this.state.isCheckMode ? Images.icons.cancel : Images.icons.arrowBack } style = { this.stylesImage.icon } accessibilityLabel = "imageContent"/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        isCheckMode: state.general.isCheckMode,
        isOrderTypeSelectionMode: state.general.isOrderTypeSelectionMode
    }),
    { }
) ( NavigationHeaderLeft )