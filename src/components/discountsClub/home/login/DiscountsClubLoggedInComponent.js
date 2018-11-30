import React, { PureComponent } from "react"
import { StyleSheet, AppState, View, Text, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../../../../theme/Theme"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../../../languages"
import { HOME_CONTENT_TYPE } from "../../DiscountClubUtils"

export default class DiscountsClubLoggedInComponent extends PureComponent {

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
            fontSize: 22,
            color: FontColor.secondary,
            textAlign: "center"
        },
        message: {
            marginTop: 8,
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
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.loggedInComponent.title }{ this.props.userName }
                </Text>
                <Text style = { this.stylesText.message }>
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.loggedInComponent.message }
                </Text>
                {/*<TouchableOpacity style = { this.stylesButton.buttonMessage } onPress = { () => this.props.onGoToMyCoupons() } accessibilityLabel = "viewButtonLoggedInMessage">*/}
                    {/*<LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesButton.buttonMessageGradient }>*/}
                        {/*<Text style = { this.stylesText.buttonMessage } accessibilityLabel = "textButtonLoggedInMessage">*/}
                            {/*{ DISCOUNTS_CLUB_CONTAINER_STRINGS.loggedInComponent.buttonMessage }*/}
                        {/*</Text>*/}
                    {/*</LinearGradient>*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}

DiscountsClubLoggedInComponent.propTypes = {
    onGoToMyCoupons: PropTypes.func.isRequired
}