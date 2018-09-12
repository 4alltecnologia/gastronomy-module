import React, { Component } from "react"
import { Image, View, Text, StyleSheet } from "react-native"
import { FontFamily, FontWeight, BackgroundColor } from "../../theme/Theme"

export default class UnityHeaderSectionComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            margin: 0,
            height: 50,
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.light,
            textAlign: "left",
            color: "rgb(61,61,61)"
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            width: 16,
            height: 16,
            marginRight: 8,
            marginLeft: 20,
            tintColor: BackgroundColor.primary,
            resizeMode: "contain"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel="viewGeneral">
                <Image source = { this.props.icon } style = { this.stylesImage.icon } accessibilityLabel="imageIcon"/>
                <Text style = { this.stylesText.title } accessibilityLabel="textTitle">
                    { this.props.title }
                </Text>
            </View>
        )
    }
}
