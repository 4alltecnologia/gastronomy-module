import React, { Component } from "react"
import { Image, View, ScrollView, Text, StyleSheet, Linking } from "react-native"
import { FontFamily, FontColor } from "../../theme/Theme"
import UnityContactComponent from "./UnityContactComponent"
import UnityInformationComponent from "./UnityInformationComponent"
import UnityLocationComponent from "./UnityLocationComponent"
import UnityListShiftsComponent from "./UnityListShiftsComponent"
import { callPhoneNumber, openWebsite } from "../../utils"

export default class UnityInfoController extends Component {

    constructor(props) {
        super(props)

        this.state = {
            unity: this.props.detailsUnity
        }

        this.onPressOpenWebsite = this._onPressOpenWebsite.bind(this)
        this.onPressCallUnity = this._onPressCallUnity.bind(this)
    }

    _onPressOpenWebsite(website) {
        openWebsite(website)
    }

    _onPressCallUnity(phoneNumber) {
        callPhoneNumber(phoneNumber)
    }

    render() {
        return (
            <ScrollView accessibilityLabel = "scrollViewUnityInfo" scrollEnabled = { false }>
                <UnityInformationComponent description = { this.state.unity.desc } />
                <UnityListShiftsComponent hourGroups = { this.state.unity.unityOperatingHourGroups }/>
                <UnityLocationComponent address = { this.state.unity.address }
                                        latitude = { this.state.unity.latitude }
                                        longitude = { this.state.unity.longitude }
                />
                <UnityContactComponent telephone = { this.state.unity.phoneNumber }
                                       website = { this.state.unity.siteUrl }
                                       onPressOpenWebsite = { this.onPressOpenWebsite}
                                       onPressCallUnity = { this.onPressCallUnity }
                />
            </ScrollView>
        )
    }
}