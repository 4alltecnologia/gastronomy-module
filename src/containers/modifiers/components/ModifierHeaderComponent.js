import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import { screenWidthPercentage, screenHeightPercentage } from "../../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../../theme/Theme"
import { MODIFIERS_HEADER_COMPONENT_STRINGS as MODIFIERS_STRINGS } from "../../../languages/index"

export default class ModifierHeaderComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 68,
            width: screenWidthPercentage(100),
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row"
        },
        texts: {
            height: 48,
            width: screenWidthPercentage(100),
            alignItems: "flex-start",
            justifyContent: "space-between"
        }
    })

    stylesText = StyleSheet.create({
        stepsMain: {
            height: 20,
            marginLeft: 20,
        },
        stepsText: {
            fontSize: 16,
            fontWeight: FontWeight.medium,
            color:"rgb(61, 61, 61)"
        },
        stepsNumber: {
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: BackgroundColor.primary
        },
        chooseComplements: {
            height: 20,
            marginLeft: 20,
            textAlign: "left",
            fontSize: 16,
            fontWeight: FontWeight.medium,
        }
    })

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style = { this.stylesView.general } accessibilityLabel="viewGeneral">
                <View style = { this.stylesView.texts } accessibilityLabel = "viewTexts">
                    <Text style = { this.stylesText.stepsMain } accessibilityLabel="textStepsMain">
                        <Text style={this.stylesText.stepsText} accessibilityLabel="textStepsText1">
                            { MODIFIERS_STRINGS.steps }
                        </Text>
                        <Text style={this.stylesText.stepsNumber} accessibilityLabel="textStepsNumber1">
                            { this.props.currentStep }
                        </Text>
                        <Text style={this.stylesText.stepsText} accessibilityLabel="textStepsText2">
                            { MODIFIERS_STRINGS.of }
                        </Text>
                        <Text style={this.stylesText.stepsNumber} accessibilityLabel="textStepsNumber2">
                            { this.props.quantitySteps }
                        </Text>
                    </Text>
                    <Text style={this.stylesText.chooseComplements} accessibilityLabel="textChooseComplements">
                        { MODIFIERS_STRINGS.chooseComplements }
                    </Text>
                </View>
            </View>
        )
    }
}
