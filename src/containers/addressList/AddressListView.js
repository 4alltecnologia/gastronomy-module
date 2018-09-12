import React, { PureComponent } from "react"
import { Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator, RefreshControl, ScrollView, StatusBar } from "react-native"
import Images from "../../assets/index"
import { BackgroundColor, FontColor } from "../../theme/Theme"
import LinearGradient from "react-native-linear-gradient"
import NoAddressesWarning from "../../components/messages/NoAddressesWarning"
import { ADDRESS_LIST_CONTAINER_STRINGS, GENERAL_STRINGS } from "../../languages/index"
import Spinner from "../../libs/customSpinner"

export default class AddressListView extends PureComponent {

    Styles = require("./AddressListStyles")

    constructor(props){
        super(props)
    }

    _renderAddress = ({item, index}) => {
        let addressNumber = item.number
        let addressComplement = !!item.complement ? ", " + item.complement : ""

        addressNumber = addressNumber + addressComplement

        return (
            <View style={this.Styles.stylesView.addressContainer} accessibilityLabel="viewAddressContainer">
                <View style={this.Styles.stylesView.addressViewIcon} accessibilityLabel="viewAddressIcon">
                    <Image style = { this.Styles.stylesImage.pin } source = { Images.icons.pin }/>
                </View>
                <View style={this.Styles.stylesView.addressViewInfo} accessibilityLabel="viewAddressInfo">
                    <TouchableOpacity
                        onPress={ () => {
                            this.props.navigation.state.params.onReceiveAddressSelected(item)
                            this.props.navigation.goBack()
                            }
                        }
                        style={this.Styles.stylesView.addressItem}
                        key={index} accessibilityLabel="touchableAddressItem">
                        <Text style={this.Styles.stylesText.addressTitle} accessibilityLabel="textAddressTitle">{!!item.name ? item.name : ADDRESS_LIST_CONTAINER_STRINGS.addressPlaceholder}</Text>
                        <Text style={this.Styles.stylesText.addressStreet} accessibilityLabel="textAddressStreet">{item.street}</Text>
                        <Text style={this.Styles.stylesText.addressInfo} accessibilityLabel="textAddressInfo">
                            {ADDRESS_LIST_CONTAINER_STRINGS.number} { addressNumber } {"\n"}
                            {item.neighborhood}, {item.city} - {item.province}{"\n"}
                            {ADDRESS_LIST_CONTAINER_STRINGS.zip} {item.zip}{"\n"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={this.Styles.stylesView.addressViewDelete} accessibilityLabel="viewAddressDelete">
                    <TouchableOpacity style={this.Styles.stylesView.addressDelete} key={index} onPress={this.props._deleteAddress(index)} accessibilityLabel="touchableAddressDelete">
                        <Image style = { this.Styles.stylesImage.cancel } source = { Images.icons.cancel } accessibilityLabel="imageAddressDelete"/>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

    _renderSeparator = () => {
        return (
            <View accessibilityLabel="viewSeparator" style = { this.Styles.stylesView.sectionSeparator }/>
        )
    }

    render() {
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"

        if (this.props.stateController.loadingList) {
            return (
                <View accessibilityLabel="viewSpinner">
                    <StatusBar barStyle = { barStyle } accessibilityLabel="statusBar"/>
                    <Spinner visible={this.props.stateController.loadingList}/>
                </View>
            )
        } else if (this.props.stateController.addresses.length == 0) {
            return (
                <NoAddressesWarning addNewAddress = { this.props.addNewAddress }/>
            )
        } else {
            return (
                <View style={this.Styles.stylesView.container} accessibilityLabel="viewContainer">
                    <StatusBar barStyle = { barStyle } accessibilityLabel="statusBar"/>
                    <View style={this.Styles.stylesView.list} accessibilityLabel="viewList">
                        <FlatList data={this.props.stateController.addresses}
                                  extraData={this.props}
                                  keyExtractor={(item) => item.id}
                                  ItemSeparatorComponent={this._renderSeparator}
                                  renderItem={this._renderAddress}
                                  refreshControl = {
                                      <RefreshControl
                                          refreshing = { this.props.stateController.refreshingList }
                                          onRefresh = { this.props._onRefresh.bind(this) }
                                      />
                                  }
                                  accessibilityLabel="flatListAddresses"/>
                    </View>

                    <View style={this.Styles.stylesView.button} accessibilityLabel="viewButton">
                        <TouchableOpacity style={this.Styles.stylesButton.buttonLogin} onPress={()=>{ this.props.addNewAddress()} } accessibilityLabel="touchableButtonLogin">
                            <LinearGradient colors={[BackgroundColor.primary, BackgroundColor.gradient]}
                                            style={this.Styles.stylesButton.buttonLoginGradient}>
                                <Text style={this.Styles.stylesButton.labelButtonLogin} accessibilityLabel="textButtonLogin">{ADDRESS_LIST_CONTAINER_STRINGS.newAddress}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View accessibilityLabel="viewSpinner">
                        <Spinner visible={this.props.stateController.loadingList}/>
                    </View>
                </View>
            )
        }
    }
}