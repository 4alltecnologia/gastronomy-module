import React, { PureComponent } from "react"
import { View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { FontColor } from "../theme/Theme"
import Images from "../assets"

export default class NavigationHeaderGenericBackButton extends PureComponent {

    styleView = StyleSheet.create({
        content: {
            marginLeft:10,
            alignItems:"flex-start"
        }
    })

    styleImage = StyleSheet.create({
        arrowBack: {
            marginLeft: 10,
            tintColor: FontColor.primary
        }
    })

    styleTouchable = StyleSheet.create({
        content: {
            width:40,
            height:40,
            justifyContent:"center"
        }
    })

    render(){
        return (
            <View style={ this.styleView.content } accessibilityLabel="viewContent">
                <TouchableOpacity style={this.styleTouchable.content} onPress={() => {
                    this.props.navigation.goBack()
                }} accessibilityLabel="touchableOpacityBackButton">
                    <Image source={Images.icons.arrowBack} style={this.styleImage.arrowBack} accessibilityLabel="imageArrowBack"/>
                </TouchableOpacity>
            </View>
        )
    }
}