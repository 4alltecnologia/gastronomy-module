import React, { PureComponent } from "react"
import { View, StyleSheet, Text } from "react-native"
import { screenWidthPercentage } from "../../utils"
import { FontWeight, FontColor } from "../../theme/Theme"

export default class NewCatalogHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 40,
            width:screenWidthPercentage(100),
            backgroundColor:"white",
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color:"rgb(61,61,61)"
        }
    })

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <Text style = {this.stylesText.title} accessibilityLabel = "textTitle">
                    { this.props.title }
                </Text>
            </View>
        )
    }
}
