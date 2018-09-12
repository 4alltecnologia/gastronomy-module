import React, { Component } from "react"
import { Image, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Images from "../../assets/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { HEADER_COMPONENT_STRINGS } from "../../languages/index"
import { CachedImage } from "react-native-cached-image"
export default class UnityHeaderComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            margin: 0,
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(239,239,239)"
        },
        unityBanner: {
            height: 148,
            width: screenWidthPercentage(100),
            position: "absolute",
            top: 0
        },
        unityClosed: {
            height: 40,
            position: "absolute",
            right: 20,
            left: 20,
            bottom: 100,
            zIndex: 50,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            backgroundColor: BackgroundColor.primary
        },
        unityDetails: {
            height: 96,
            position: "absolute",
            right: 20,
            left: 20,
            bottom: 12,
            zIndex: 100,
            borderRadius: 8,
            alignSelf: "stretch",
            shadowColor: "black",
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 4,
            shadowOpacity: 0.5,
            backgroundColor: "white"
        },
        unityNameDistance: {
            flex: 1,
            height: 48,
            margin: 0,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderWidth: 1,
            borderColor: "rgb(239,239,239)"
        },
        unityInformationTags: {
            flex: 1,
            height: 48,
            margin: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: "rgb(239,239,239)"
        },
        unityName: {
            flex: 0.7,
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        unityNameNoDistance: {
            flex: 1,
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        unityDistance: {
            flex: 0.3,
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
        },
        unityInformation: {
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        unityTags: {
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        unityName: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: "rgb(61,61,61)"
        },
        unityDistance: {
            fontFamily: FontFamily.font,
            fontSize: 12,
            fontWeight: FontWeight.light,
            textAlign: "center",
            color: "rgb(128,128,128)"
        },
        unityClosed: {
            marginBottom: 4,
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.medium,
            textAlign: "center",
            color: FontColor.primary
        },
        information: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "center",
            color: BackgroundColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        unityImage: {
            margin: 0,
            alignSelf: "stretch",
            resizeMode: "cover"
        },
        pinDistance: {
            height: 14,
            width: 14,
            marginRight: 4,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        info: {
            height: 14,
            width: 14,
            marginRight: 4,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            hasTags: false
        }
    }

    render() {
        return (
            <View style = { [this.stylesView.general, { height: this.props.showUnityInformation ? 208 : 148 }] } accessibilityLabel = "viewGeneral">
                {!!this.props.unityImage ?
                    <CachedImage source={{uri: this.props.unityImage}}
                                 style={this.stylesView.unityBanner} resizeMode={"cover"}
                                 accessibilityLabel="imageUnityBanner"/>
                    :
                    <View style={this.stylesView.unityBanner}/>
                }
                { !this.props.isUnityOpen ?
                <View style = { this.stylesView.unityClosed } accessibilityLabel = "viewUnityClosed">
                    <Text style = { this.stylesText.unityClosed } accessibilityLabel = "textUnityClosed">
                        { HEADER_COMPONENT_STRINGS.unityClosed }
                    </Text>
                </View>
                    : null }
                { this.props.showUnityInformation ?
                <View style = { this.stylesView.unityDetails } accessibilityLabel = "viewUnityDetails">
                    <View style = { this.stylesView.unityNameDistance } accessibilityLabel = "viewUnityNameDistance">
                        <View style = { this.props.unityDistance ? this.stylesView.unityName : this.stylesView.unityNameNoDistance } accessibilityLabel = "viewUnityName">
                            <Text style = {[ this.stylesText.unityName, {textAlign: this.props.unityDistance ? "left" : "center"} ]} numberOfLines = { 1 } accessibilityLabel = "textUnityName">
                                { this.props.unityName }
                            </Text>
                        </View>
                        { this.props.unityDistance ?
                            <View style = { this.stylesView.unityDistance } accessibilityLabel = "viewUnityDistance">
                                <Image style = { this.stylesImage.pinDistance } source = { Images.icons.pin } accessibilityLabel = "imagePinDistance"/>
                                <Text style = { this.stylesText.unityDistance } accessibilityLabel = "textDistance">
                                    { this.props.unityDistance }
                                </Text>
                            </View>
                            : null
                        }
                    </View>
                    <View style = { this.stylesView.unityInformationTags } accessibilityLabel = "viewUnityInformationTags">
                        <View style = { [this.stylesView.unityInformation, { flex: this.state.hasTags ? 0.5 : 1 }] } accessibilityLabel = "viewUnityInformation">
                            <Image style = { this.stylesImage.info } source = { this.props.showMenu ? Images.icons.info : Images.icons.forkKnife } accessibilityLabel = "imageInformation"/>
                            <TouchableWithoutFeedback onPress = { () => this.props.onShowInformation() }>
                                <View>
                                    <Text style = { this.stylesText.information } accessibilityLabel = "textInformation">
                                        { this.props.showMenu ? HEADER_COMPONENT_STRINGS.info : HEADER_COMPONENT_STRINGS.offersCatalog }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        { this.state.hasTags ?
                            <View>
                                <View style = { [this.stylesView.unityTags, { flex: this.state.hasTags ? 0.5 : 1 }] } accessibilityLabel = "viewUnityTags">
                                </View>
                            </View>
                        : null }
                    </View>
                </View>
                    : null }
            </View>

        )
    }
}
