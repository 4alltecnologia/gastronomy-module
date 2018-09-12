import React, { PureComponent } from "react"
import { Image, View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import Images from "../../assets/index"
import UnityHeaderSectionComponent from "../unityInfo/UnityHeaderSectionComponent"
import { UNITY_HEADER_SECTION_COMPONENT_STRINGS as UnityHeaderStrings, UNITY_CONTACT_COMPONENT_STRINGS as UnityContactStrings } from "../../languages/index"

export default class UnityInfoContainer extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            margin: 0,
            backgroundColor: "white"
        },
        contactItems: {
            marginRight: 0,
            marginLeft: 0
        },
        contactItem: {
            margin: 0,
            height: 54,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "rgb(242,242,242)"
        },
        line: {
            marginRight: 20,
            marginLeft: 20,
            height: 0.5,
            backgroundColor: "rgb(209,209,209)"
        }
    })

    stylesText = StyleSheet.create({
        contactTitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.light,
            textAlign: "left",
            color: "rgb(128,128,128)"
        },
        contactSubtitle: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.light,
            textAlign: "right",
            color: BackgroundColor.primary,
            justifyContent: "flex-end"
        }
    })

    stylesButton = StyleSheet.create({
        action: {
            height: 44,
            alignItems: "center",
            justifyContent: "center",
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            (this.props.website || this.props.telephone) ?
                <View style = { this.stylesView.general } accessibilityLabel="viewGeneral">
                        <UnityHeaderSectionComponent title = { UnityHeaderStrings.contact } icon = { Images.icons.contact } />
                        <View style = { this.stylesView.contactItems } accessibilityLabel="viewContactItems">
                            { this.props.telephone ?
                            <View style = { this.stylesView.contactItem } accessibilityLabel="viewContactItem1">
                                <Text style = { this.stylesText.contactTitle } accessibilityLabel="textContactTitle1">
                                    { UnityContactStrings.telephone }
                                </Text>
                                <TouchableWithoutFeedback style = { this.stylesButton.action } onPress = { () => this.props.onPressCallUnity(this.props.telephone) } accessibilityLabel="buttonAction1">
                                    <View>
                                        <Text style = { this.stylesText.contactSubtitle } accessibilityLabel="textContactSubtitle1">
                                            { this.props.telephone }
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                                : null }
                            <View style = { this.stylesView.line } accessibilityLabel="viewLine"/>
                            { this.props.website ?
                                <View style = { this.stylesView.contactItem } accessibilityLabel="viewContactItem2">
                                    <Text style = { this.stylesText.contactTitle } accessibilityLabel="textContactTitle2">
                                        { UnityContactStrings.website }
                                    </Text>
                                    <TouchableWithoutFeedback style = { this.stylesButton.action } onPress = { () => this.props.onPressOpenWebsite(this.props.website) } accessibilityLabel="buttonAction2">
                                        <View>
                                            <Text style = { this.stylesText.contactSubtitle } accessibilityLabel="textContactSubtitle2">
                                                { this.props.website }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                : null }
                        </View>
                </View> : null
        )
    }
}
