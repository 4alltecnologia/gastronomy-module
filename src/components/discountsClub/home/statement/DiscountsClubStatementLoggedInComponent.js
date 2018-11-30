import React, { PureComponent } from "react"
import { StyleSheet, AppState, View, Text, ImageBackground, Image, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../../../../theme/Theme"
import { screenHeightPercentage, screenWidthPercentage, formatPrice, FirebaseActions } from "../../../../utils"
import Images from "../../../../assets"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../../../languages"
import { HOME_CONTENT_TYPE } from "../../DiscountClubUtils"

export default class DiscountsClubStatementLoggedInComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: BackgroundColor.primary
        },
        statementDetails: {
            flex: 1,
            marginTop: 8,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        goToStatement: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
        }
    })

    stylesImage = StyleSheet.create({
        background: {
            flex: 1,
            tintColor: "rgb(238,238,238)",
            resizeMode: "cover",
            opacity: 0.15
        },
        arrow: {
            height: 8,
            width: 8,
            marginLeft: 8,
            resizeMode: "contain",
            tintColor: FontColor.primary
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: FontColor.primary
        },
        monetarySymbol: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 18,
            color: FontColor.primary
        },
        statementValue: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 40,
            color: FontColor.primary
        },
        goToStatement: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 16,
            color: FontColor.primary
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
                    { DISCOUNTS_CLUB_CONTAINER_STRINGS.statementLoggedInComponent.mySavings }
                </Text>
                <View style = { this.stylesView.statementDetails } accessibilityLabel = "viewStatementDetails">
                    <Text accessibilityLabel = { "textStatementValue" + formatPrice(this.props.userSavings, false, false)}>
                        <Text style = { this.stylesText.monetarySymbol }>
                            { GENERAL_STRINGS.monetary }
                        </Text>
                        <Text style = { this.stylesText.statementValue }>
                            { formatPrice(this.props.userSavings, false, false)}
                        </Text>
                    </Text>
                    {/*<TouchableOpacity onPress = { () => this.props.onSelectItem(HOME_CONTENT_TYPE.STATEMENT, FirebaseActions.DISCOUNTS_CLUB_HOME.actions.STATEMENT) }>*/}
                        {/*<View style = { this.stylesView.goToStatement } accessibilityLabel = "vieGoToStatement">*/}
                            {/*<Text style = { this.stylesText.goToStatement } accessibilityLabel = "textGoToStatement">*/}
                                {/*{ DISCOUNTS_CLUB_CONTAINER_STRINGS.statementLoggedInComponent.goToStatement }*/}
                            {/*</Text>*/}
                            {/*<Image style = { this.stylesImage.arrow } source = { Images.icons.arrowRight } accessibilityLabel = "imageArrow"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </ImageBackground>
        )
    }
}

DiscountsClubStatementLoggedInComponent.propTypes = {
    userSavings: PropTypes.number.isRequired,
    onSelectItem: PropTypes.func.isRequired
}