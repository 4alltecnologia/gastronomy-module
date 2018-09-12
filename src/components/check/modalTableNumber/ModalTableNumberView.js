import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native"
import { MODAL_TABLE_NUMBER_STRINGS, GENERAL_STRINGS } from "../../../languages/index"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Images from "../../../assets/index"

export default class ModalTableNumberComponent extends PureComponent {

    Styles = require("./ModalTableNumberStyles")

    constructor(props){
        super(props)

        this.state = {
            tableNumber: "",
            disabled: true
        }
    }

    render(){
        return (
            <View style={this.Styles.stylesView.overlay} accessibilityLabel="viewOverlay">
                <KeyboardAwareScrollView ref="scroll" enableOnAndroid={true} accessibilityLabel="scrollViewModal" keyboardShouldPersistTaps={"always"}>
                    <View style={this.Styles.stylesView.mainViewModal} accessibilityLabel="viewMainModal">
                        <View style={this.Styles.stylesView.viewTop} accessibilityLabel="viewTopModal">
                            <View style={this.Styles.stylesView.viewTopDummy} accessibilityLabel="viewTopDummy">
                            </View>
                            <TouchableOpacity style={this.Styles.stylesView.viewTopClose} onPress={() => { this.props.setTableNumberModalVisible() }} accessibilityLabel="touchableTopClose">
                                <Image style = { this.Styles.stylesImage.cancel } source = { Images.icons.cancel }/>
                            </TouchableOpacity>
                        </View>
                        <View style={this.Styles.stylesView.viewTexts} accessibilityLabel="viewTexts">
                            <Text style={this.Styles.stylesText.textTitle} accessibilityLabel="textWarningTitle">{MODAL_TABLE_NUMBER_STRINGS.title}</Text>
                            <Text style={this.Styles.stylesText.textDescription} accessibilityLabel="textWarningDescription">{MODAL_TABLE_NUMBER_STRINGS.subtitle}</Text>
                        </View>
                        <View style={this.Styles.stylesView.viewInputTableNumber} accessibilityLabel="viewInputTableNumber">
                            <TextInput
                                style={this.Styles.stylesText.textInputTableNumber}
                                onChangeText={(text) => {
                                    this.setState({
                                        tableNumber: text,
                                        disabled: text.length == 0
                                    })
                                }}
                                keyboardType={"numeric"}
                                autoFocus={true}
                                maxLength={5}
                                selectTextOnFocus={true}
                                placeholder="-"
                                underlineColorAndroid="#ffffff"
                                accessibilityLabel="textInputTableNumber"/>
                        </View>

                        <View style={this.Styles.stylesView.viewButton} accessibilityLabel="viewButton">
                            <TouchableOpacity style={this.state.disabled ? this.Styles.stylesButton.buttonDisabled : this.Styles.stylesButton.button} disabled={this.state.disabled} onPress={() => this.props.confirmTableNumber(this.state.tableNumber)} accessibilityLabel="touchableButton">
                                <Text style={this.state.disabled ? this.Styles.stylesButton.labelButtonDisabled : this.Styles.stylesButton.labelButton} accessibilityLabel="textButton">{GENERAL_STRINGS.ok}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}