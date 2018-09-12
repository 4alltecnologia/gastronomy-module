import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Images from "../../assets"
import { NO_PRODUCTS_WARNING_STRINGS as WarningStrings } from "../../languages"
import { FontFamily, FontWeight, BackgroundColor } from "../../theme/Theme"

export default class NoProductsWarning extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        content: {
            marginHorizontal: 20,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginBottom: 16,
            marginHorizontal: 24,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 18,
            color: BackgroundColor.secondary,
            textAlign: "center"
        },
        message: {
            marginBottom: 16,
            marginHorizontal: 24,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 16,
            color: "rgb(130,130,130)",
            textAlign: "center"
        },
        buttonTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 18,
            color: "white",
            backgroundColor: "transparent",
            textAlign: "center"
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 72,
            width: 72,
            marginBottom: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        }
    })

    stylesButton = StyleSheet.create({
        refreshOffers: {
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: BackgroundColor.secondary,
            alignSelf: "stretch"
        },
        buttonRefreshOffersGradient: {
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#eeeeee",
            alignSelf: "stretch"
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                    <Image style = { this.stylesImage.icon } source = { Images.icons.noOffers } accessibilityLabel = "imageIcon" />
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                        { WarningStrings.firstMessage }
                    </Text>
                    <Text style = { this.stylesText.message } accessibilityLabel = "textMessage">
                        { WarningStrings.secondMessage }
                    </Text>
                    <TouchableOpacity style = { this.stylesButton.refreshOffers } onPress = { () => this.props.onGoToCatalog() } accessibilityLabel = "viewButtonGoToCatalog">
                        <LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesButton.buttonRefreshOffersGradient }>
                            <Text style = { this.stylesText.buttonTitle } accessibilityLabel = "textButtonGoToCatalog">
                                { WarningStrings.buttonMessage }
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}