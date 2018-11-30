import React, { Component } from "react"
import { StyleSheet, Image, View, Text, TouchableWithoutFeedback } from "react-native"
import { FontFamily, FontColor, BackgroundColor } from "../../theme/Theme"
import Images from "../../assets/index"

export default class FloatButton extends Component {

    stylesView = StyleSheet.create({
        general: {
            height: 50,
            width: 50,
            position: "absolute",
            top: 0,
            right: 0
        },
        content: {
            height: 50,
            width: 50,
            position: "absolute",
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            backgroundColor: BackgroundColor.primary,
            shadowColor: "black",
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 4,
            shadowOpacity: 1.0
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 32,
            width: 32,
            marginLeft: 8,
            resizeMode: "contain",
            tintColor: "white"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableWithoutFeedback style = { this.stylesView.general } onPress = {() => this.props.onTapFloatButton() } accessibilityLabel = "buttonFloatButton">
                <View style = { [this.stylesView.content, { top: this.props.topPosition }] }>
                    <Image style = { this.stylesImage.icon } source = { Images.icons.floatIcon } accessibilityLabel = "imageFloatButton"/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}