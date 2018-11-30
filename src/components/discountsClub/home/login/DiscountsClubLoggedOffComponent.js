import React, { PureComponent } from "react"
import { StyleSheet, AppState, View, Text, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../../../../theme/Theme"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS } from "../../../../languages"

export default class DiscountsClubLoggedOffComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            paddingTop: 24,
            paddingBottom: 16,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: FontColor.secondary,
            textAlign: "center"
        },
        message: {
            marginTop: 8,
            marginHorizontal: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.secondary,
            textAlign: "center",
            opacity: 0.75
        },
        buttonMessage: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
            textAlign: "center"
        }
    })

    stylesButton = StyleSheet.create({
        buttonMessage: {
            height: 44,
            marginVertical: 32,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
            backgroundColor: BackgroundColor.primary,
            borderRadius: 4,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 4
        },
        buttonMessageGradient: {
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            backgroundColor: "#eeeeee",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <Text style = { this.stylesText.title }>
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.loggedOffComponent.title }
                </Text>
                <Text style = { this.stylesText.message }>
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.loggedOffComponent.message }
                </Text>
                <TouchableOpacity style = { this.stylesButton.buttonMessage } onPress = { () => this.props.onLoginUser() } accessibilityLabel = "viewButtonLoggedOffMessage">
                    <LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesButton.buttonMessageGradient }>
                        <Text style = { this.stylesText.buttonMessage } accessibilityLabel = "textButtonLoggedOffMessage">
                            { DISCOUNTS_CLUB_CONTAINER_STRINGS.loggedOffComponent.buttonMessage }
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

DiscountsClubLoggedOffComponent.propTypes = {
    onLoginUser: PropTypes.func.isRequired
}