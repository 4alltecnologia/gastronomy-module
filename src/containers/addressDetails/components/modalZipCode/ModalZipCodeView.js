import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native"
import { BackgroundColor } from "../../../../theme/Theme"
import { MODAL_ZIPCODE_COMPONENT_STRINGS } from "../../../../languages/index"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Images from "../../../../assets/index"

export default class ModalZipCodeComponent extends PureComponent {

    Styles = require("./ModalZipCodeStyles")

    constructor(props){
        super(props)

        this.state = {
            zipCodePrefix: props.zipCodePrefix,
            zipCodeSufix: "",
            disabled: true
        }
    }

    render(){
        return (
            <View style={this.Styles.stylesView.overlay} accessibilityLabel="viewOverlay">
                <KeyboardAwareScrollView ref="scroll" enableOnAndroid={true} accessibilityLabel="scrollViewModal">
                    <View style={this.Styles.stylesView.mainViewModal} accessibilityLabel="viewMainModal">
                        <View style={this.Styles.stylesView.viewTop} accessibilityLabel="viewTopModal">
                            <View style={this.Styles.stylesView.viewTopDummy} accessibilityLabel="viewTopDummy">
                            </View>
                            <TouchableOpacity style={this.Styles.stylesView.viewTopClose} onPress={() => { this.props.methodSetModalVisible() }} accessibilityLabel="touchableTopClose">
                                <Image style = { this.Styles.stylesImage.cancel } source = { Images.icons.cancel }/>
                            </TouchableOpacity>
                        </View>
                        <View style={this.Styles.stylesView.viewTexts} accessibilityLabel="viewTexts">
                            <Text style={this.Styles.stylesText.textWarningTitle} accessibilityLabel="textWarningTitle">{MODAL_ZIPCODE_COMPONENT_STRINGS.warningTitle}</Text>
                            <Text style={this.Styles.stylesText.textWarningDescription} accessibilityLabel="textWarningDescription">{MODAL_ZIPCODE_COMPONENT_STRINGS.warningDescription}</Text>
                        </View>
                        <View style={this.Styles.stylesView.viewInputZipCode} accessibilityLabel="viewInputZipCode">
                            <Text style={this.Styles.stylesText.textZipCode} accessibilityLabel="textZipCode">{this.state.zipCodePrefix + " -"}</Text>
                            <TextInput
                                style={this.Styles.stylesText.textInputZipCode}
                                onChangeText={(text) => this.setState({zipCodeSufix: text, disabled: text.length < 3})}
                                keyboardType={"numeric"}
                                autoFocus={true}
                                selectTextOnFocus={true}
                                placeholder="000"
                                maxLength = { 3 }
                                underlineColorAndroid="#ffffff"
                                accessibilityLabel="textInputZipCode"/>
                        </View>

                        <View style={this.Styles.stylesView.viewButton} accessibilityLabel="viewButton">
                            <View style={this.Styles.stylesView.viewBottomDummy} accessibilityLabel="viewBottomDummy">
                            </View>
                            <TouchableOpacity style={this.state.disabled ? this.Styles.stylesButton.buttonLoginDisabled : this.Styles.stylesButton.buttonLogin} disabled={this.state.disabled} onPress={() => this.props.confirmZipCode(this.state.zipCodePrefix, this.state.zipCodeSufix)} accessibilityLabel="touchableButtonLogin">
                                <Text style={this.state.disabled ? this.Styles.stylesButton.labelButtonLoginDisabled : this.Styles.stylesButton.labelButtonLogin} accessibilityLabel="textButtonLogin">{MODAL_ZIPCODE_COMPONENT_STRINGS.confirmButton}</Text>
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