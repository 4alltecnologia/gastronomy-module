import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TextInput, FlatList, TouchableOpacity, Modal, Alert, Image, findNodeHandle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { screenWidthPercentage, AddressType, UserAddressType } from "../../utils"
import { FontFamily, BackgroundColor, FontWeight } from "../../theme/Theme"
import { ADDRESS_DETAILS_CONTAINER_STRINGS } from "../../languages"
import ModalZipCodeController from "../../components/modalZipCode/ModalZipCodeController"
import Spinner from "../../libs/customSpinner"
import Images from "../../assets"

export default class AddressDetailsComponent extends PureComponent {

    stylesView = StyleSheet.create({
        scroll: {
            backgroundColor: "white",
            flex: 1,
            flexDirection: "column"
        },
        addressViewInfo: {
            flex: 1,
            flexDirection: "row",
            marginVertical: 20,
            marginHorizontal: 10
        },
        addressViewIcon: {
            width: 44,
            paddingVertical: 1,
            alignItems: "center",
            justifyContent: "flex-start"
        },
        addressItem: {
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
        },
        viewButton: {
            flex: 0.15,
            justifyContent: "center",
            alignItems:"center",
            marginVertical: 20
        },
        buttonSaveAddress: {
            borderRadius: 8,
            height: 44,
            marginHorizontal: 60,
            marginTop: 12
        },
        buttonSaveGradient: {
            backgroundColor: "#eeeeee",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            height: 44
        },
        listSeparator: {
            height: 0.75,
            marginHorizontal: 24,
            marginBottom: 8,
            backgroundColor: "rgb(238, 238, 238)"
        },
        titleSeparator: {
            height: 0.75,
            marginHorizontal: 24,
            backgroundColor: "rgb(74, 74, 74)"
        }
    })

    stylesText = StyleSheet.create({
        inputText: {
            fontSize: 14,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 8
        },
        addressInfo: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(163,163,163)"
        },
        addressTitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            textAlign: "left",
            color: BackgroundColor.primary
        },
        saveLoginLabel: {
            color: "white",
            textAlign: "center",
            fontSize: 16,
            backgroundColor: "transparent",
            fontFamily: FontFamily.font,
            width: screenWidthPercentage(90)
        }
    })

    stylesImage = StyleSheet.create({
        pin: {
            height: 32,
            width: 32,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        }
    })

    constructor(props){
        super(props)
    }

    render() {
        return (
            <KeyboardAwareScrollView innerRef = { ref => {this.scroll = ref} } enableOnAndroid = { true } style = { this.stylesView.scroll } accessibilityLabel = "viewMainScroll" keyboardOpeningTime = { 300 } keyboardShouldPersistTaps = { "always" }>
                <View style = { this.stylesView.addressViewInfo } accessibilityLabel = "viewAddressInfo">
                    <View style = { this.stylesView.addressViewIcon } accessibilityLabel = "viewAddressIcon">
                        <Image style = { this.stylesImage.pin } source = { this.props.userAddressType === UserAddressType.HOME ? Images.icons.pinHome : this.props.userAddressType === UserAddressType.WORK ? Images.icons.pinWork : Images.icons.pinLocation } accessibilityLabel = "imageAddressPin"/>
                    </View>
                    <View style = { this.stylesView.addressItem } accessibilityLabel = "viewAddressItem">
                        <Text style = { this.stylesText.addressTitle } accessibilityLabel = "textAddressTitle">{ this.props.userAddressType === UserAddressType.HOME ? ADDRESS_DETAILS_CONTAINER_STRINGS.home : this.props.userAddressType === UserAddressType.WORK ? ADDRESS_DETAILS_CONTAINER_STRINGS.work : ADDRESS_DETAILS_CONTAINER_STRINGS.address }</Text>
                        <Text style = { this.stylesText.addressInfo } accessibilityLabel = "textAddressInfo">
                            { this.props.address.street + "\n" + this.props.address._parseFullAddress(AddressType.NEIGHBORHOOD_CITY_PROVINCE) }
                        </Text>
                    </View>
                </View>

                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.listSeparator }/>

                { this.props.userAddressType === UserAddressType.CUSTOM &&
                    <View>
                        <TextInput
                            ref = "textInputName"
                            style = { this.stylesText.inputText }
                            placeholder = { ADDRESS_DETAILS_CONTAINER_STRINGS.name }
                            underlineColorAndroid = "#ffffff"
                            returnKeyType = { "next" }
                            onChangeText = { this.props.changeName }
                            onSubmitEditing = { () => this.refs["textInputStreetNumber"].focus() }
                            value = { this.props.addressName }
                            accessibilityLabel = "textInputName"
                        />
                        <View accessibilityLabel = "viewSeparator" style = { this.stylesView.titleSeparator }/>
                    </View>
                }

                <TextInput
                    ref = "textInputStreetNumber"
                    style = { this.stylesText.inputText }
                    placeholder = { this.props.errorForm ? ADDRESS_DETAILS_CONTAINER_STRINGS.fieldRequired : ADDRESS_DETAILS_CONTAINER_STRINGS.streetNumber }
                    placeholderTextColor = { this.props.errorForm ? "#f20000" : null }
                    underlineColorAndroid = "#ffffff"
                    returnKeyType = { "next" }
                    keyboardType = { "numeric" }
                    onChangeText = { this.props.changeNumber }
                    onSubmitEditing = { () => this.refs["textInputComplement"].focus() }
                    value = { this.props.addressNumber }
                    accessibilityLabel = "textInputStreetNumber"
                />
                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.titleSeparator }/>

                <TextInput
                    ref = "textInputComplement"
                    style = { this.stylesText.inputText }
                    placeholder = { ADDRESS_DETAILS_CONTAINER_STRINGS.complement }
                    returnKeyType = { "next" }
                    maxLength = { 45 }
                    underlineColorAndroid = "#ffffff"
                    onChangeText = { this.props.changeComplement }
                    onSubmitEditing = { () => this.refs["textInputReference"].focus() }
                    value = { this.props.addressComplement }
                    accessibilityLabel = "textInputComplement"
                />
                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.titleSeparator }/>

                <TextInput
                    ref = "textInputReference"
                    style = { this.stylesText.inputText }
                    placeholder = { ADDRESS_DETAILS_CONTAINER_STRINGS.reference }
                    returnKeyType = { "done" }
                    underlineColorAndroid = "#ffffff"
                    onChangeText = { this.props.changeReference }
                    value = { this.props.addressReference }
                    accessibilityLabel = "textInputReference"
                />
                <View accessibilityLabel = "viewSeparator" style = { this.stylesView.titleSeparator }/>

                <View style = { this.stylesView.viewButton } accessibilityLabel = "viewButton">
                    <TouchableOpacity style = { this.stylesView.buttonSaveAddress } enabled = { true } onPress = { () => this.props.confirmZipCode() } accessibilityLabel = "touchableSaveButton">
                        <LinearGradient colors = { [BackgroundColor.primary, BackgroundColor.gradient] } style = { this.stylesView.buttonSaveGradient }>
                            <Text style = { this.stylesText.saveLoginLabel } accessibilityLabel = "textButtonSave">{ ADDRESS_DETAILS_CONTAINER_STRINGS.save }</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Modal animationType = "slide"
                       transparent = { true }
                       visible = { this.props.modalVisible }
                       onRequestClose={ () => {} }>
                    <ModalZipCodeController zipCode = { this.props.addressZipCode }
                                            setModalVisible = { this.props.setModalVisible }
                                            changeZipCode = { this.props.changeZipCode }
                                            saveAddress = { this.props.saveAddress }/>
                </Modal>

                <View accessibilityLabel = "viewSpinner">
                    <Spinner visible = { this.props.spinnerVisible }/>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}