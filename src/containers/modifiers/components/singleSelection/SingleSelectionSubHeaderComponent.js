import React, { PureComponent } from "react"
import { View, StyleSheet, Text } from "react-native"
import { screenWidthPercentage } from "../../../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../../../theme/Theme"
import { GENERAL_STRINGS, MODIFIERS_SINGLE_SELECTION_STRINGS } from "../../../../languages/index"

export default class SingleSelectionSubHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        viewTitle: {
            height: 40,
            width:screenWidthPercentage(100),
            backgroundColor:"white",
            alignItems:"flex-start",
            justifyContent:"center"
        },
        content: {
            height: 40,
            width:screenWidthPercentage(100),
            backgroundColor:"rgb(242,242,242)",
            alignItems:"flex-start",
            justifyContent:"center"
        },
        viewInfo: {
            marginLeft:20
        }
    })

    stylesText = StyleSheet.create({
        textChooseComponents: {
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color:"rgb(128,128,128)",
            marginLeft:20
        },
        textSideDish: {
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color:"rgb(61,61,61)"
        },
        textChooseOption: {
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color: "rgb(128,128,128)"
        }
    })

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View accessibilityLabel = "viewMain">
                <View style = { this.stylesView.content } accessibilityLabel = "content">
                    <View style = { this.stylesView.viewInfo } accessibilityLabel = "viewInfo">
                        <Text style = { this.stylesText.textChooseOption } accessibilityLabel = "textChooseOption">
                            { MODIFIERS_SINGLE_SELECTION_STRINGS.chooseOption }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
