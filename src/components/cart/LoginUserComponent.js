import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { LOGIN_USER_COMPONENT_STRINGS as LoginStrings} from "../../languages/index"
import { screenWidthPercentage } from "../../utils"

export default class LoginUserComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 210,
            width: screenWidthPercentage(100),
            backgroundColor: "rgb(255, 255, 255)"
        },
        topSeparator: {
            height: 0.5,
            top: 0,
            position: "absolute",
            backgroundColor: "rgb(209,209,209)",
            width: screenWidthPercentage(100)
        },
        bottomSeparator: {
            height: 0.5,
            bottom: 0,
            position: "absolute",
            backgroundColor: "rgb(209,209,209)",
            width: screenWidthPercentage(100)
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginTop: 24,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 30,
            textAlign: "center",
            color: "rgb(61, 61, 61)"
        },
        subtitle: {
            marginTop: 4,
            marginHorizontal: 60,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            textAlign: "center",
            color: "rgb(61, 61, 61)"
        },
        buttonSignIn: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 16,
            color: FontColor.primary
        },
        buttonSignUp: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: BackgroundColor.primary
        }
    })

    stylesButton =StyleSheet.create({
        buttonSignIn: {
            height: 44,
            marginHorizontal: 20,
            marginTop: 16,
            borderRadius: 8,
            backgroundColor: BackgroundColor.primary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
        },
        buttonSignUp: {
            height: 24,
            marginTop: 16,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            shouldShowTopSeparator: !!props.shouldShowTopSeparator ? props.shouldShowTopSeparator : false,
            shouldShowBottomSeparator: !!props.shouldShowBottomSeparator ? props.shouldShowBottomSeparator : false
        }
    }

    render() {
        return (
            <View style = { this.stylesView.general} accessibilityLabel = "viewGeneral">
                { this.state.shouldShowTopSeparator ?
                <View style = { this.stylesView.topSeparator } accessibilityLabel = "viewTopSeparator"/>
                : null }
                <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                    { LoginStrings.title }
                </Text>
                <Text style = { this.stylesText.subtitle } accessibilityLabel = "textSubtitle">
                    { this.props.message }
                </Text>
                <TouchableOpacity style = { this.stylesButton.buttonSignIn } onPress = { this.props.signIn.bind(this) } accessibilityLabel = "buttonSignIn">
                    <Text style = { this.stylesText.buttonSignIn } accessibilityLabel = "textButtonSignIn">
                        { LoginStrings.buttonSignIn }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = { this.stylesButton.buttonSignUp } onPress = { this.props.signIn.bind(this) } accessibilityLabel = "buttonSignUp">
                    <Text style = { this.stylesText.buttonSignUp } accessibilityLabel = "textButtonSignUp">
                        { LoginStrings.buttonSignUp }
                    </Text>
                </TouchableOpacity>
                { this.state.shouldShowBottomSeparator ?
                    <View style = { this.stylesView.bottomSeparator } accessibilityLabel = "viewBottomSeparator"/>
                    : null }
            </View>
        )
    }
}