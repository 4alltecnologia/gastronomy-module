import React, { PureComponent } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontFamily, FontWeight, FontColor } from "../../theme/Theme"

export default class UnityListHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 40,
            width: "100%",
            justifyContent: "center",
            paddingLeft: 10,
            backgroundColor: "#d1d1d1"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            color: FontColor.secondary,
            fontSize: 16,
            textAlign: "left",
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <Text style = { this.stylesText.title }>
                    { this.props.title }
                </Text>
            </View>
        )
    }
}
