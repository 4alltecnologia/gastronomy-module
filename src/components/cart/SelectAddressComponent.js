import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { SELECT_ADDRESS_COMPONENT_STRINGS as AddressStrings} from "../../languages/index"
import { screenWidthPercentage } from "../../utils"

export default class SelectAddressComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 218,
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
        buttonSelectAddress: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
            textAlign: "center"
        }
    })

    stylesButton =StyleSheet.create({
        buttonSelectAddress: {
            height: 44,
            marginHorizontal: 20,
            marginTop: 24,
            borderRadius: 8,
            backgroundColor: BackgroundColor.primary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
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
                    <View style={this.stylesView.topSeparator} accessibilityLabel="viewSeparator"/>
                    : null }
                <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                    { AddressStrings.title }
                </Text>
                <Text style = { this.stylesText.subtitle } accessibilityLabel = "textSubtitle">
                    { AddressStrings.subtitle }
                </Text>
                <TouchableOpacity style = { this.stylesButton.buttonSelectAddress } onPress = { this.props.onSelectAddress.bind(this) } accessibilityLabel = "buttonSelectAddress">
                    <Text style = { this.stylesText.buttonSelectAddress } accessibilityLabel = "textButtonSelectAddress">
                        { AddressStrings.buttonSelectAddress }
                    </Text>
                </TouchableOpacity>
                { this.state.shouldShowBottomSeparator ?
                    <View style = { this.stylesView.bottomSeparator } accessibilityLabel = "viewBottomSeparator"/>
                    : null }
            </View>
        )
    }
}