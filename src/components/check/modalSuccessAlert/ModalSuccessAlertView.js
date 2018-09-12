import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { MODAL_SUCCESS_ALERT_COMPONENT_STRINGS } from "../../../languages/index"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Images from "../../../assets/index"

export default class ModalSuccessAlertComponent extends PureComponent {

    Styles = require("./ModalSuccessAlertStyles")

    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={this.Styles.stylesView.overlay} accessibilityLabel="viewOverlay">
                <KeyboardAwareScrollView ref="scroll" enableOnAndroid={true} accessibilityLabel="scrollViewModal" keyboardShouldPersistTaps={"always"}>
                    <View style={this.Styles.stylesView.mainViewModal} accessibilityLabel="viewMainModal">
                        <View style={this.Styles.stylesView.viewTexts} accessibilityLabel="viewTexts">
                            <Text style={this.Styles.stylesText.textTitle} accessibilityLabel="textWarningTitle">{MODAL_SUCCESS_ALERT_COMPONENT_STRINGS.yourOrder}</Text>
                            <Text style={this.Styles.stylesText.textSubtitle} accessibilityLabel="textWarningSubTitle">{MODAL_SUCCESS_ALERT_COMPONENT_STRINGS.confirmed}</Text>
                        </View>
                        <View style={this.Styles.stylesView.viewDescription} accessibilityLabel="viewInputTableNumber">
                            <Text style={this.Styles.stylesText.textDescription} accessibilityLabel="textWarningDescription">{MODAL_SUCCESS_ALERT_COMPONENT_STRINGS.textConfirmedOrder}</Text>
                        </View>

                        <View style={this.Styles.stylesView.viewButton} accessibilityLabel="viewButton">
                            <View style={this.Styles.stylesView.viewBottomDummy} accessibilityLabel="viewBottomDummy">
                            </View>
                            <TouchableOpacity style={this.Styles.stylesButton.button} onPress={() => this.props.closeModal()} accessibilityLabel="touchableButton">
                                <Text style={this.Styles.stylesButton.labelButton} accessibilityLabel="textButton">{MODAL_SUCCESS_ALERT_COMPONENT_STRINGS.gotIt}</Text>
                            </TouchableOpacity>
                            <View style={this.Styles.stylesView.viewBottomDummy} accessibilityLabel="viewBottomDummy">
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}