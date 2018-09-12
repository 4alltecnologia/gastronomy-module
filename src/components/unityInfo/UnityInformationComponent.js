import React, { PureComponent } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontFamily, FontWeight } from "../../theme/Theme"
import { UNITY_INFORMATION_COMPONENT_STRINGS as UnityInformationStrings } from "../../languages/index"

export default class UnityInfoContainer extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 0,
            backgroundColor: "white"
        },
        infoText: {
            flexGrow: 1,
            marginTop: 8,
            marginRight: 20,
            marginLeft: 20
        },
        infoTitle: {
            marginTop: 12,
            marginRight: 20,
            marginLeft: 20
        }
    })

    stylesText = StyleSheet.create({
        infoTitle: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "black"
        },
        infoText: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            textAlign: "left",
            color: "rgb(128,128,128)"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            !!this.props.description ?
            <View style = { this.stylesView.general } accessibilityLabel="viewGeneral">
                <View style = { this.stylesView.infoTitle } accessibilityLabel="viewInfoTitle">
                    <Text style = { this.stylesText.infoTitle } accessibilityLabel="textInfoTitle">
                        { UnityInformationStrings.information }
                    </Text>
                </View>
                <View style = { this.stylesView.infoText } accessibilityLabel="viewInfoText">
                    <Text style = { this.stylesText.infoText } accessibilityLabel="textInfoText">
                        { this.props.description }
                    </Text>
                </View>
            </View>
            : null
        )
    }
}
