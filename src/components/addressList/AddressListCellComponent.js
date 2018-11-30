import React, { PureComponent } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import Images from "../../assets"
import { AddressType, UserAddressType } from "../../utils"
import { FontFamily, FontColor, BackgroundColor, FontWeight } from "../../theme/Theme"
import { ADDRESS_LIST_CONTAINER_STRINGS } from "../../languages"
import * as Errors from "../../errors"

export default class AddressListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        addressContainer: {
            flex: 1,
            flexDirection: "row",
            paddingVertical: 16,
            paddingHorizontal: 20
        },
        addressViewIcon: {
            width: 44,
            paddingVertical: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start"
        },
        addressViewInfo: {
            flex: 1,
            flexDirection: "row"
        },
        addressViewDelete: {
            width: 80,
            marginLeft: 4,
            alignItems: "flex-end",
            justifyContent: "center"
        },
        addressItem: {
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
        },
        buttonActivateGps: {
            backgroundColor: BackgroundColor.primary,
            borderRadius: 2,
            height: 28,
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
        },
        buttonCancel: {
            height: 44,
            width: 44,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        addressTitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            textAlign: "left",
            color: BackgroundColor.primary
        },
        addressInfo: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(163,163,163)"
        },
        addressInfoError: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            textAlign: "left",
            color: BackgroundColor.primary
        },
        register: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: FontColor.secondary
        },
        activateGps: {
            color: "white",
            textAlign: "center",
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            fontFamily: FontFamily.font
        }
    })

    stylesImage = StyleSheet.create({
        pin: {
            height: 32,
            width: 32,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        },
        cancel: {
            height: 24,
            width: 24,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props){
        super(props)
    }

    _renderLocationCell() {
        return (
            <TouchableOpacity onPress = { () => this.props.selectAddress(this.props.address, true) } style = { this.stylesView.addressContainer } accessibilityLabel = "viewAddressLocationContainer">
                <View style = { this.stylesView.addressViewInfo } accessibilityLabel = "viewAddressInfoGps">
                    <View style = { this.stylesView.addressViewIcon } accessibilityLabel = "viewAddressIconGps">
                        { !this.props.address && !this.props.error ?
                            <ActivityIndicator animating = { true } size="large" accessibilityLabel="activityIndicator"/>
                            :
                            <Image style = { this.stylesImage.pin } source = { Images.icons.pinLocation } accessibilityLabel = "imageLocationPinGps"/>
                        }
                    </View>
                    {  !this.props.address && !this.props.error ?
                        <View style = { this.stylesView.addressItem }>
                            <Text style = { this.stylesText.addressTitle } accessibilityLabel = "textAddressSearchingGps">{ ADDRESS_LIST_CONTAINER_STRINGS.searching }</Text>
                        </View>
                        :
                        <View style = { this.stylesView.addressItem } accessibilityLabel = "touchableAddressSelectItemGps">
                            <Text style = { this.stylesText.addressTitle } accessibilityLabel = "textAddressCurrentLocation">{ ADDRESS_LIST_CONTAINER_STRINGS.currentLocation }</Text>
                            <Text style = { !this.props.error ? this.stylesText.addressInfo : this.stylesText.addressInfoError } accessibilityLabel = "textAddressInfoGps">
                                {   this.props.error instanceof Errors.LocationSettingsException ?
                                    ADDRESS_LIST_CONTAINER_STRINGS.disabled
                                    :
                                    this.props.error instanceof Errors.LocationException ?
                                    ADDRESS_LIST_CONTAINER_STRINGS.noLocation
                                    :
                                    (!!this.props.address ? this.props.address._parseFullAddress(AddressType.STREET_NUMBER) : ADDRESS_LIST_CONTAINER_STRINGS.addressNotRegistered) +
                                    (!!this.props.address ? "\n" + this.props.address._parseFullAddress(AddressType.NEIGHBORHOOD_CITY_PROVINCE) : "")
                                }
                            </Text>
                        </View>
                    }
                </View>

                { this.props.error instanceof Errors.LocationSettingsException ?
                    <View style = { this.stylesView.addressViewDelete } accessibilityLabel = "viewActivateGps">
                        <TouchableOpacity onPress = { () => this.props.activateGps() } accessibilityLabel = "touchableActivateGps">
                            <View style = { this.stylesView.buttonActivateGps } accessibilityLabel = "viewActivateGps">
                                <Text style = { this.stylesText.activateGps } accessibilityLabel = "textActivateGps">{ ADDRESS_LIST_CONTAINER_STRINGS.activateGps }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </TouchableOpacity>
        )
    }

    _renderRegularCell() {
        return (
            <TouchableOpacity onPress = { () => !!this.props.address ? this.props.selectAddress(this.props.address, false) : null } style = { this.stylesView.addressContainer } accessibilityLabel = "viewAddressContainer">
                <View style = { this.stylesView.addressViewInfo } accessibilityLabel = { "viewAddressInfo" + this.props.addressType }>
                    <View style = { this.stylesView.addressViewIcon } accessibilityLabel = { "viewAddressIcon" + this.props.addressType }>
                        <Image style = { this.stylesImage.pin } source = { this.props.addressType === UserAddressType.HOME ? Images.icons.pinHome : this.props.addressType === UserAddressType.WORK ? Images.icons.pinWork : Images.icons.pinLocation } accessibilityLabel = { "imageAddressIcon" + this.props.addressType }/>
                    </View>
                    <View style = { this.stylesView.addressItem } accessibilityLabel = { "touchableAddressItem" + this.props.addressType }>
                        <Text style = { this.stylesText.addressTitle } accessibilityLabel = { "textAddressTitle" + this.props.addressType }>{ this.props.addressType === UserAddressType.HOME ? ADDRESS_LIST_CONTAINER_STRINGS.home : this.props.addressType === UserAddressType.WORK ? ADDRESS_LIST_CONTAINER_STRINGS.work : this.props.address.name }</Text>
                        <Text style = { this.stylesText.addressInfo } accessibilityLabel = { "textAddressInfo" + this.props.addressType }>
                            { !!this.props.address ? this.props.address._parseFullAddress(AddressType.STREET_NUMBER) : ADDRESS_LIST_CONTAINER_STRINGS.addressNotRegistered }
                            { !!this.props.address ? "\n" + this.props.address._parseFullAddress(AddressType.NEIGHBORHOOD_CITY_PROVINCE) : "" }
                        </Text>
                    </View>
                </View>
                <View style = { this.stylesView.addressViewDelete } accessibilityLabel = "viewAddressDelete">
                    <TouchableOpacity onPress = { () => !!this.props.address ? this.props.deleteAddress(this.props.address) : this.props.addAddress(this.props.addressType) } accessibilityLabel = "touchableAddressDelete">
                        { !!this.props.address ?
                            <View style = { this.stylesView.buttonCancel }>
                                <Image style = { this.stylesImage.cancel } source = { Images.icons.cancel } accessibilityLabel = "imageAddressDelete"/>
                            </View>
                            :
                            <Text style = { this.stylesText.register } accessibilityLabel = "textAddressTitle">
                                { ADDRESS_LIST_CONTAINER_STRINGS.register }
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            this.props.addressType === UserAddressType.GPS ? this._renderLocationCell() : this._renderRegularCell()
        )
    }
}