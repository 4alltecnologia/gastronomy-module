import React, { PureComponent } from "react"
import { View, StyleSheet, Text } from "react-native"
import { screenWidthPercentage, screenHeightPercentage } from "../../../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../../../theme/Theme"
import { GENERAL_STRINGS, MODIFIERS_MULTIPLE_SELECTION_STRINGS } from "../../../../languages/index"

export default class MulipleSelectionSubHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        viewTitle: {
            height:40,
            width:screenWidthPercentage(100),
            backgroundColor:"white",
            alignItems:"flex-start",
            justifyContent:"center"
        },
        content: {
            height:40,
            width:screenWidthPercentage(100),
            backgroundColor:"rgb(242,242,242)",
            alignItems:"flex-start",
            justifyContent:"center"
        },
        viewInfo: {
            flexDirection:"row"
        },
        viewMinMax: {
            marginLeft:20,
            flex:0.7
        },
        viewQuantitySelected: {
            flex:0.3,
            alignItems:"flex-end",
            justifyContent:"center",
            marginRight:20
        }
    })

    stylesText = StyleSheet.create({
        textChooseComponents: {
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color: "rgb(128,128,128)",
            marginLeft: 20
        },
        textSideDish: {
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)"
        },
        textMinMax: {
            fontSize: 14,
            fontWeight: FontWeight.medium,
            color: "rgb(128,128,128)"
        },
        textQuantitySelected: {
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color: "rgb(61,61,61)"
        },
    })

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View accessibilityLabel="viewMain">
                <View style={this.stylesView.content} accessibilityLabel="content">
                    <View style={this.stylesView.viewInfo} accessibilityLabel="viewInfo">
                        <View style={this.stylesView.viewMinMax} accessibilityLabel="viewMinMax">
                            <Text style={this.stylesText.textMinMax} accessibilityLabel="textMinMax">
                                { MODIFIERS_MULTIPLE_SELECTION_STRINGS.min }{ this.props.min } / { MODIFIERS_MULTIPLE_SELECTION_STRINGS.max }{ this.props.max }
                            </Text>
                        </View>
                        <View style = { this.stylesView.viewQuantitySelected } accessibilityLabel="viewQuantitySelected">
                            <Text style={this.stylesText.textQuantitySelected} accessibilityLabel="textQuantitySelected">
                                { this.props.quantitySelected }/{ this.props.max }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
