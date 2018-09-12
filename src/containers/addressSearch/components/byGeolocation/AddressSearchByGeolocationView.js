import React, { PureComponent } from "react"
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator,Image } from "react-native"
import { ADDRESS_SEARCH_GEOLOCATION_CONTAINER_STRINGS, NO_ADDRESS_FOUND_WARNING_STRINGS } from "../../../../languages"
import { BackgroundColor } from "../../../../theme/Theme"
import NoAddressFoundWarning from "../../../../components/messages/NoAddressFoundWarning"
import Images from "../../../../assets"

export default class AddressSearchByGeolocationView extends PureComponent {

    Styles = require("../../AddressSearchStyles")

    constructor(props){
        super(props)
    }

    render() {
        return (
            <ScrollView style = { this.Styles.stylesView.mainScroll } accessibilityLabel="viewMainScroll">
                <View style={ this.Styles.stylesView.viewTitleGeolocation } accessibilityLabel="viewTitle">
                    <Text style={ this.Styles.stylesText.titleText } accessibilityLabel="textTitle">{ ADDRESS_SEARCH_GEOLOCATION_CONTAINER_STRINGS.title }</Text>
                </View>

                <View style={this.Styles.stylesView.viewList} accessibilityLabel="viewList">
                    {(this.props.stateController.refreshingList) &&
                        <View style = {this.Styles.stylesView.viewActivityIndicator} accessibilityLabel="viewLoading">
                            <ActivityIndicator
                                animating={ this.props.stateController.refreshingList }
                                style={this.Styles.stylesView.activityIndicator}
                                size="large"
                                accessibilityLabel="activityIndicator"
                            />
                        </View>
                    }
                    {(!this.props.stateController.refreshingList && this.props.stateController.latitude != null && this.props.stateController.searchResult != null) &&
                        <View style={this.Styles.stylesView.addressContainer} accessibilityLabel="viewAddressContainer">
                            <View style={this.Styles.stylesView.addressViewIcon} accessibilityLabel="viewAddressViewIcon">
                                <Image style = { this.Styles.stylesImage.pin } source = { Images.icons.pin }/>
                            </View>
                            <View style={this.Styles.stylesView.addressViewInfo} accessibilityLabel="viewAddressViewInfo">
                                <TouchableOpacity style={this.Styles.stylesView.addressItem} onPress={() => this.props.openDetailAddress(this.props.stateController.searchResult)}  accessibilityLabel="touchableAddressItem">
                                    <Text style={this.Styles.stylesText.addressStreet} accessibilityLabel="textAddressStreet">{this.props.stateController.searchResult.street}</Text>
                                    <Text style={this.Styles.stylesText.addressInfo} accessibilityLabel="textAddressInfo">{this.props.stateController.searchResult.addressFormatted}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {(!this.props.stateController.refreshingList && this.props.stateController.latitude == null) &&
                        <NoAddressFoundWarning image={ Images.icons.noLocation } firstMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.firstMessageNoGps } secondMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.secondMessageNoGps }/>
                    }
                    {(!this.props.stateController.refreshingList && this.props.stateController.latitude != null && this.props.stateController.searchResult == null) &&
                        <NoAddressFoundWarning image={ Images.icons.noData } firstMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.firstMessageNoResults } secondMessage={ NO_ADDRESS_FOUND_WARNING_STRINGS.secondMessageNoResults }/>
                    }
                </View>
            </ScrollView>
        )
    }
}