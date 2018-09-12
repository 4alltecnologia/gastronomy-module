import React, { PureComponent } from "react"
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from "react-native"
import { ADDRESS_SEARCH_ZIPCODE_CONTAINER_STRINGS, NO_ADDRESS_FOUND_WARNING_STRINGS } from "../../../../languages"
import mask from "vanilla-masker"
import NoAddressFoundWarning from "../../../../components/messages/NoAddressFoundWarning"
import Images from "../../../../assets"
import { BackgroundColor } from "../../../../theme/Theme"

export default class AddressSearchByZipCodeView extends PureComponent {

    Styles = require("../../AddressSearchStyles")

    constructor(props){
        super(props)
    }

    render() {
        const FORMAT = "99999-999"

        return (
            <ScrollView style = { this.Styles.stylesView.mainScroll } accessibilityLabel="scrollViewMainScroll">
                <View style={ this.Styles.stylesView.viewTitle } accessibilityLabel="viewTitle">
                    <Text style={ this.Styles.stylesText.titleText } accessibilityLabel="textTitleText">{ ADDRESS_SEARCH_ZIPCODE_CONTAINER_STRINGS.title }</Text>
                </View>

                <View style={ this.Styles.stylesView.viewInput } accessibilityLabel="viewInput">
                    <TextInput
                        keyboardType={"numeric"}
                        style={ this.Styles.stylesText.inputSearch }
                        onChangeText={(text) => this.props._searchResults(text) }
                        placeholder={ ADDRESS_SEARCH_ZIPCODE_CONTAINER_STRINGS.placeholder }
                        underlineColorAndroid="#ffffff"
                        value={mask.toPattern(this.props.stateController.zipCode,FORMAT)}
                        onFocus= {() => this.setState({zipCode: ""})}
                        accessibilityLabel="textInputZipCode"
                    />
                </View>

                <View style={this.Styles.stylesView.viewList} accessibilityLabel="viewList">
                    {(!this.props.stateController.refreshingList && this.props.stateController.zipCode.length >= 9 && this.props.stateController.searchResult != null) &&
                        <View style={this.Styles.stylesView.addressContainer} accessibilityLabel="viewAddressContainer">
                            <View style={this.Styles.stylesView.addressViewIcon} accessibilityLabel="viewAddressIcon">
                                <Image style = { this.Styles.stylesImage.pin } source = { Images.icons.pin }/>
                            </View>
                            <View style={this.Styles.stylesView.addressViewInfo} accessibilityLabel="viewAddressInfo">
                                <TouchableOpacity style={this.Styles.stylesView.addressItem} onPress={() => this.props.openDetailAddress(this.props.stateController.searchResult)}  accessibilityLabel="touchableAddressItem">
                                    <Text style={this.Styles.stylesText.addressStreet} accessibilityLabel="textAddressStreet">{this.props.stateController.searchResult.street}</Text>
                                    <Text style={this.Styles.stylesText.addressInfo} accessibilityLabel="textAddressInfo">{this.props.stateController.searchResult.addressFormatted}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {(this.props.stateController.refreshingList && this.props.stateController.zipCode.length == 9 && this.props.stateController.searchResult == null) &&
                        <View style = {this.Styles.stylesView.viewActivityIndicator} accessibilityLabel="viewLoading">
                            <ActivityIndicator
                                animating={ this.props.stateController.refreshingList }
                                style={this.Styles.stylesView.activityIndicator}
                                size="large"
                                accessibilityLabel="activityIndicator"
                            />
                        </View>
                    }
                    {(!this.props.stateController.refreshingList && this.props.stateController.zipCode.length >= 9 && this.props.stateController.searchResult == null) &&
                        <NoAddressFoundWarning image={ Images.icons.noData } firstMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.firstMessageNoResults } secondMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.secondMessageNoResults }/>
                    }
                </View>
            </ScrollView>
        )
    }
}