import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native"
import { ADDRESS_SEARCH_NAME_CONTAINER_STRINGS, NO_ADDRESS_FOUND_WARNING_STRINGS } from "../../../../languages"
import { BackgroundColor } from "../../../../theme/Theme"
import NoAddressFoundWarning from "../../../../components/messages/NoAddressFoundWarning"
import Images from "../../../../assets"

export default class AddressSearchByNameView extends PureComponent {

    Styles = require("../../AddressSearchStyles")

    _renderItem = ({item, index}) => {
        var secondaryTextArray = item.structured_formatting.secondary_text.split(",")

        var fullAddress = {
            street: item.structured_formatting.main_text,
            addressFormatted: item.structured_formatting.secondary_text.substring(0,item.structured_formatting.secondary_text.lastIndexOf(",")),
            zip: null,
            neighborhood: secondaryTextArray.length == 2 ? null : secondaryTextArray[0],
            city: secondaryTextArray.length == 2 ? secondaryTextArray[0].split(" - ")[0] : secondaryTextArray[1].split(" - ")[0],
            uf: secondaryTextArray.length == 2 ? secondaryTextArray[0].split(" - ")[1] : secondaryTextArray[1].split(" - ")[1],
            country: secondaryTextArray[secondaryTextArray.length-1]
        }

        return (
            <View style={this.Styles.stylesView.addressContainer} accessibilityLabel="viewAddressContainer">
                <View style={this.Styles.stylesView.addressViewIcon} accessibilityLabel="viewAddressIcon">
                    <Image style = { this.Styles.stylesImage.pin } source = { Images.icons.pin }/>
                </View>
                <View style={this.Styles.stylesView.addressViewInfo} accessibilityLabel="viewAddressInfo">
                    <TouchableOpacity style={this.Styles.stylesView.addressItem} onPress={() => this.props.openDetailAddress(fullAddress)}  accessibilityLabel="touchableAddressItem">
                        <Text style={this.Styles.stylesText.addressStreet}  accessibilityLabel="textAddressStreet">{fullAddress.street}</Text>
                        <Text style={this.Styles.stylesText.addressInfo} accessibilityLabel="textAddressInfo">{fullAddress.addressFormatted}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

    _renderSeparator = () => {
        return (
            <View style = { this.Styles.stylesView.sectionSeparator } accessibilityLabel="viewSeparator"/>
        )
    }

    render() {
        return (
            <ScrollView style = { this.Styles.stylesView.mainScroll } accessibilityLabel="scrollViewMainScroll">
                <View style={ this.Styles.stylesView.viewTitle } accessibilityLabel="viewTitle">
                    <Text style={ this.Styles.stylesText.titleText } accessibilityLabel="viewTitleText">{ ADDRESS_SEARCH_NAME_CONTAINER_STRINGS.title }</Text>
                </View>

                <View style={ this.Styles.stylesView.viewInput } accessibilityLabel="viewInput">
                    <TextInput
                        style={ this.Styles.stylesText.inputSearch }
                        onChangeText={(text) => this.props._searchResults(text) }
                        placeholder={ ADDRESS_SEARCH_NAME_CONTAINER_STRINGS.placeholder }
                        underlineColorAndroid="#ffffff"
                        value={this.props.stateController.streetAddress}
                        onFocus= {() => this.setState({streetAddress: ""})}
                        accessibilityLabel="textInputStreetName"
                    />
                </View>

                <View style={this.Styles.stylesView.viewList} accessibilityLabel="viewList">
                    {(!this.props.stateController.refreshingList && this.props.stateController.streetAddress.length >= 3) &&
                        <FlatList
                            data={this.props.stateController.searchResults}
                            extraData={this.props}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={this._renderItem}
                            accessibilityLabel="flatListSearchResults"/>
                    }
                    {(this.props.stateController.refreshingList && this.props.stateController.streetAddress.length >= 3) &&
                        <View accessibilityLabel="viewLoading" style = {this.Styles.stylesView.viewActivityIndicator}>
                            <ActivityIndicator
                                animating={ this.props.stateController.refreshingList }
                                style={this.Styles.stylesView.activityIndicator}
                                size="large"
                                accessibilityLabel="activityIndicator"
                            />
                        </View>
                    }
                    {(!this.props.stateController.refreshingList && this.props.stateController.streetAddress.length >= 3 && this.props.stateController.searchResults.length == 0) &&
                        <NoAddressFoundWarning image={ Images.icons.noData } firstMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.firstMessageNoResults } secondMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.secondMessageNoResults }/>
                    }
                </View>
            </ScrollView>
        )
    }
}