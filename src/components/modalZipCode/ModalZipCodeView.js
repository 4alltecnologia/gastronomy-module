import React, { PureComponent } from "react"
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, TouchableWithoutFeedback } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { BackgroundColor, FontWeight, FontFamily, FontColor } from "../../theme/Theme"
import { MODAL_ZIPCODE_COMPONENT_STRINGS } from "../../languages"
import { screenWidthPercentage, screenHeightPercentage, formatZipCode } from "../../utils"

export default class ModalZipCodeView extends PureComponent {

    stylesView = StyleSheet.create({
        overlay: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        mainViewModal: {
            position: "absolute",
            left: 0,
            right: 0,
            flexGrow: 1,
            backgroundColor:"#ffffff",
            flexDirection: "column",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderColor: "white",
            paddingHorizontal: 15,
            paddingBottom: 15,
            paddingTop: 24
        },
        title: {
            flex: 1,
            flexDirection: "column",
            marginBottom: 20
        },
        inputSeparator: {
            height: 0.75,
            marginHorizontal: 4,
            width: screenWidthPercentage(90),
            backgroundColor: "rgb(74, 74, 74)"
        }
    })

    stylesText = StyleSheet.create({
        inputText: {
            fontSize: 14,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            paddingHorizontal: 4,
            textAlign: "left"
        },
        addressTitle: {
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.semibold,
            textAlign: "left",
            color: FontColor.secondary,
            marginBottom: 16
        },
        addressSubtitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: FontColor.secondary,
            opacity: 0.75
        },
        buttonMessage: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: FontColor.primary
        }
    })

    stylesButton = StyleSheet.create({
        buttonMessage: {
            height: 44,
            marginVertical: 16,
            marginHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
            backgroundColor: BackgroundColor.primary,
            borderRadius: 4,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 4
        },
        buttonMessageGradient: {
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            backgroundColor: "#eeeeee",
            alignSelf: "stretch"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            disabled: true,
            isFocused: false
        }
    }

    _changeFocus = (event, isFocused) => {
        this.setState({
            isFocused
        })
    }

    render(){
        return (
            <View style = { this.stylesView.overlay } accessibilityLabel = "viewOverlay">
                <KeyboardAwareScrollView innerRef = { ref => { this.scroll = ref }}
                                             enableOnAndroid = { true }
                                             contentContainerStyle = {[ this.stylesView.mainViewModal, this.state.isFocused ? { top: 0 } : { bottom: 0 } ]}
                                             keyboardShouldPersistTaps = { "always" }
                                             accessibilityLabel = "scrollViewModal">
                    <View style = { this.stylesView.title } accessibilityLabel = "viewTitle">
                        <Text style = { this.stylesText.addressTitle } accessibilityLabel = "textTitle">
                            { MODAL_ZIPCODE_COMPONENT_STRINGS.title }
                        </Text>
                        <Text style = { this.stylesText.addressSubtitle } accessibilityLabel = "textSubtitle">
                            { MODAL_ZIPCODE_COMPONENT_STRINGS.subtitle }
                        </Text>
                    </View>
                    <View style = { this.stylesView.title } accessibilityLabel = "viewZipCode">
                        <TextInput
                            style = { this.stylesText.inputText }
                            returnKeyType = { "done" }
                            underlineColorAndroid = "#ffffff"
                            onChangeText = { this.props.changeZipCode }
                            value = { formatZipCode(this.props.zipCode) }
                            maxLength = { 9 }
                            onSubmitEditing = { () => this.props.saveAddress() }
                            onFocus = { (event) => { this._changeFocus(event, true) } }
                            onBlur = { (event) => { this._changeFocus(event, false) } }
                            accessibilityLabel = "textInputZipCode"
                        />
                        <View accessibilityLabel = "viewSeparator" style = { this.stylesView.inputSeparator }/>
                    </View>

                    <TouchableOpacity style = { this.stylesButton.buttonMessage } onPress = { () => this.props.saveAddress() } accessibilityLabel = "touchableButtonConfirmZipCode">
                        <LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesButton.buttonMessageGradient }>
                            <Text style = { this.stylesText.buttonMessage } accessibilityLabel = "textButtonConfirmZipCode">
                                { MODAL_ZIPCODE_COMPONENT_STRINGS.confirmButton }
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}