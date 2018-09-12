import React, { PureComponent } from "react"
import { TouchableOpacity, View, Text, Animated, AppState, Alert } from "react-native"
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerPan } from "react-native-tab-view"
import Permissions from "react-native-permissions"
import { ADDRESS_SEARCH_CONTAINER_STRINGS, GENERAL_STRINGS, LOCATION_SETTINGS_STRINGS } from "../../languages"
import { getCurrentLocation, callNativeLocationSettings } from "../../utils"
import * as Errors from "../../errors"
import AddressSearchView from "./AddressSearchView"

export default class AddressSearchController extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            navigation: this.props.navigation,
            sessionToken: this.props.navigation.state.params.sessionToken,
            latitude: null,
            longitude: null,
            index: 0,
            routes: [
                { key: "1", title: ADDRESS_SEARCH_CONTAINER_STRINGS.byGeolocation },
                { key: "2", title: ADDRESS_SEARCH_CONTAINER_STRINGS.byZipCode },
                { key: "3", title: ADDRESS_SEARCH_CONTAINER_STRINGS.byStreetAddress }
            ],
            appState: AppState.currentState
        }

        this.getLatLong()
    }

    getLatLong(){
        Permissions.request("location", { type: "whenInUse" }).then(response => {
            if (response == "authorized") {
                getCurrentLocation().then(position => {
                    if (position == null) {
                        this.setState({
                            latitude: null,
                            longitude: null
                        })
                    } else {
                        setTimeout(() => {
                            this.setState({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            })

                            AppState.removeEventListener("change", this._handleAppStateChange)
                        }, 400)
                    }
                }).catch(error => {
                    if (error instanceof Errors.LocationSettingsException) {
                        Alert.alert(
                            LOCATION_SETTINGS_STRINGS.attention,
                            LOCATION_SETTINGS_STRINGS.needActivateGps,
                            [{
                                text: GENERAL_STRINGS.no, style: "cancel",
                                onPress: () => {
                                    this.setState({
                                        latitude: "denied",
                                        longitude: "denied"
                                    })

                                    AppState.removeEventListener("change", this._handleAppStateChange)
                                }
                            }, {
                                text: GENERAL_STRINGS.yes,
                                onPress: () => {
                                    callNativeLocationSettings()
                                    AppState.addEventListener("change", this._handleAppStateChange)
                                }
                            }], { cancelable: false }
                        )
                    } else {
                        this.setState({
                            latitude: null,
                            longitude: null
                        })
                    }
                })
            } else {
                this.setState({
                    latitude: "denied",
                    longitude: "denied"
                })
            }
        }).catch(error => {
            console.log(error) //IT'S NOT SUPPOSED TO FALL ON CATCH
        })
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this.getLatLong()
        }
        this.setState({appState: nextAppState})
    }

    _handleIndexChange = index => {
        this.setState({ index })
    }

    render() {
        return (
            <AddressSearchView
                navigation={this.props.navigation}
                stateController={this.state}
                _handleIndexChange={this._handleIndexChange.bind()}/>
        )
    }
}