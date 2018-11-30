import React, { PureComponent } from "react"
import { StyleSheet, AppState, View, Text, ImageBackground } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../../../../theme/Theme"
import { screenHeightPercentage, screenWidthPercentage } from "../../../../utils"
import Images from "../../../../assets"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS } from "../../../../languages"

export default class DiscountsClubStatementLoggedOffComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: BackgroundColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        background: {
            flex: 1,
            tintColor: "rgb(238,238,238)",
            resizeMode: "cover",
            opacity: 0.15
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: FontColor.primary,
            textAlign: "center"
        },
        message: {
            marginTop: 8,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.primary,
            textAlign: "center"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ImageBackground style = { this.stylesView.general }
                             imageStyle = { this.stylesImage.background }
                             source = { Images.backgrounds.clubStatement }
            >
                <Text style = { this.stylesText.title } accessibilityLabel = "textStatementTitle">
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.statementLoggedOffComponent.title }
                </Text>
                <Text style = { this.stylesText.message } accessibilityLabel = "textStatementMessage">
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.statementLoggedOffComponent.message }
                </Text>
            </ImageBackground>
        )
    }
}