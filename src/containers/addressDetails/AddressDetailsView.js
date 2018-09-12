import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TextInput, FlatList, TouchableOpacity, Modal, Alert, Image, findNodeHandle } from "react-native"
import { getAddressByQueryAndLatLong, getAddressByPlaceId, addAddress } from "../../api/ApiRequests"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontColor, BackgroundColor, FontWeight } from "../../theme/Theme"
import { ADDRESS_DETAILS_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../languages/index"
import ModalZipCodeController from "./components/modalZipCode/ModalZipCodeController"
import { SegmentedControls } from "react-native-radio-buttons"
import LinearGradient from "react-native-linear-gradient"
import Spinner from "../../libs/customSpinner"
import Images from "../../assets/index"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default class AddressDetailsView extends PureComponent {

    Styles = require("./AddressDetailsStyles")

    constructor(props){
        super(props)
    }

    render() {
        return (
            <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} enableOnAndroid={true} style={this.Styles.stylesView.mainScroll} accessibilityLabel="viewMainScroll" keyboardOpeningTime={300}>
                <View style={this.Styles.stylesView.viewTitle}  accessibilityLabel="viewAddressContainer">
                    <View style={this.Styles.stylesView.addressViewIcon}  accessibilityLabel="viewAddressViewIcon">
                        <Image style = { this.Styles.stylesImage.pin } source = { Images.icons.pin }/>
                    </View>
                    <View style={this.Styles.stylesView.addressItem}  accessibilityLabel="viewAddressViewInfo">
                        <Text style={this.Styles.stylesText.addressStreet}  accessibilityLabel="textAddressStreet">{this.props.stateController.fullAddress.street}</Text>
                        <Text style={this.Styles.stylesText.addressInfo}  accessibilityLabel="textAddressInfo">{this.props.stateController.fullAddress.addressFormatted}</Text>
                    </View>
                </View>

                <View style={ this.Styles.stylesView.viewInput } accessibilityLabel="viewInput">
                    <TextInput
                        ref="textInputStreetNumber"
                        style={ this.Styles.stylesText.inputText }
                        placeholder={ this.props.stateController.errorForm ? ADDRESS_DETAILS_CONTAINER_STRINGS.fieldRequired : ADDRESS_DETAILS_CONTAINER_STRINGS.streetNumber }
                        placeholderTextColor={ this.props.stateController.errorForm ? "#f20000" : null }
                        underlineColorAndroid="#ffffff"
                        returnKeyType={"next"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.props.changeNumber(text)}
                        onSubmitEditing={() => this.refs["textInputComplement"].focus()}
                        value={this.props.stateController.addressNumber}
                        accessibilityLabel="textInputStreetNumber"
                    />
                    <TextInput
                        ref="textInputComplement"
                        style={ this.Styles.stylesText.inputText }
                        placeholder={ ADDRESS_DETAILS_CONTAINER_STRINGS.complement }
                        returnKeyType={"done"}
                        underlineColorAndroid="#ffffff"
                        onChangeText={(text) => this.props.changeComplement(text)}
                        value={this.props.stateController.addressComplement}
                        accessibilityLabel="textInputComplement"
                    />
                </View>

                <View style={ this.Styles.stylesView.viewTitleIdentifyAddress }  accessibilityLabel="viewTitle">
                    <Text style={ this.Styles.stylesText.titleText }  accessibilityLabel="textTitle">{ ADDRESS_DETAILS_CONTAINER_STRINGS.identifyAddress }</Text>
                </View>

                <View style={ this.Styles.stylesView.viewAddressNameOptions } accessibilityLabel="viewAddressNameOptions">
                    <SegmentedControls
                        tint={ BackgroundColor.primary }
                        backTint={ "#f2f2f2" }
                        selectedBackgroundColor={ BackgroundColor.primary }
                        selectedTint={ "#f2f2f2" }
                        separatorTint={ BackgroundColor.primary }
                        options={ this.props.stateController.addressNameOptions }
                        onSelection={ this.props.changeSelectedOption.bind(this) }
                        selectedOption={ this.props.stateController.selectedNameType }
                        optionStyle={ this.Styles.stylesRadio.segmentedControlsCells }
                        containerStyle={ this.Styles.stylesRadio.segmentedControlsContainer }
                        direction={ "row" }
                        containerBorderWidth={ 2 }
                        containerBorderRadius={ 2 }
                        paddingTop={ 8 }
                        paddingBottom={ 8 }
                        separatorWidth={ 2 }
                        accessibilityLabel="radioButtonsNameOptions"
                    />

                </View>
                {(this.props.stateController.selectedNameType == ADDRESS_DETAILS_CONTAINER_STRINGS.other) &&
                    <View>
                        <View style={this.Styles.stylesView.viewTitleIdentifyAddress} accessibilityLabel="viewTitle">
                            <Text style={this.Styles.stylesText.titleText}
                                  accessibilityLabel="textTitle">{ADDRESS_DETAILS_CONTAINER_STRINGS.nameTheAddress}</Text>
                        </View>

                        <View style={this.Styles.stylesView.viewInput} accessibilityLabel="viewInput">
                            <TextInput onFocus={(event: Event) => {
                                this.props.scrollToInput(this.scroll, findNodeHandle(event.target)) }}
                                       style={this.Styles.stylesText.inputText}
                                       placeholder={ADDRESS_DETAILS_CONTAINER_STRINGS.typeAddressName}
                                       underlineColorAndroid="#ffffff"
                                       onChangeText={(text) => this.props.changeCustomName(text)}
                                       value={this.props.stateController.changeCustomName}
                                       accessibilityLabel="textInputCustomAddressName"/>
                        </View>
                    </View>
                }

                <View style={this.Styles.stylesView.viewButton} accessibilityLabel="viewButton">
                    <TouchableOpacity style={this.Styles.stylesButton.buttonSaveAddress} enabled={true} onPress={()=>{ this.props.saveAddress("")} } accessibilityLabel="touchableSaveButton">
                        <LinearGradient colors={[BackgroundColor.primary, BackgroundColor.gradient]}
                                        style={this.Styles.stylesButton.buttonSaveGradient}>
                            <Text style={this.Styles.stylesButton.labelSaveLogin} accessibilityLabel="textButtonSave">{ADDRESS_DETAILS_CONTAINER_STRINGS.save}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.stateController.modalVisible}
                    onRequestClose={() => {}}>
                    <ModalZipCodeController zipCodePrefix={this.props.stateController.prefixZipCode} methodSetModalVisible={this.props.setModalVisible.bind()} methodSaveAddress={this.props.saveAddress.bind()}/>
                </Modal>

                <View accessibilityLabel="viewSpinner">
                    <Spinner visible={this.props.stateController.spinnerVisible}/>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}