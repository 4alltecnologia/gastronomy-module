import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import Images from "../../assets"
import { ADDRESS_SEARCH_GEOLOCATION_CONTAINER_STRINGS, NO_ADDRESS_FOUND_WARNING_STRINGS } from "../../languages"
import { NO_ADDRESSES_WARNING_STRING as WarningStrings } from "../../languages"
import { FontFamily, FontWeight, BackgroundColor } from "../../theme/Theme"

export default class NoAddressFoundWarning extends PureComponent {

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
            fontWeight: FontWeight.semibold,
            fontSize: 16,
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

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.content } accessibilityLabel = "viewContent">
                    <Image style = { this.stylesImage.icon } source = { this.props.image } accessibilityLabel = "imageIcon" />
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                        { this.props.firstMessage }
                    </Text>
                    <Text style = { this.stylesText.message } accessibilityLabel = "textMessage">
                        { this.props.secondMessage }
                    </Text>
                </View>
            </View>
        )
    }
}