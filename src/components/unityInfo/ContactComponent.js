import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, AnimationTypes, formatDistance, formatPhoneNumber, ExternalLink } from "../../utils"
import Images from "../../assets/index"
import { DISCOUNTS_CLUB_TRADESMAN_DETAILS_CONTAINER_STRINGS as DiscountsStrings } from "../../languages/index"

export default class ContactComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: screenWidthPercentage(100),
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "white"
        },
        contactItem: {
            flex: 1,
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch"
        },
        contactItemLogoAndContact: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    })

    stylesButton = StyleSheet.create({
        contactItem: {
            height: 40,
            width: 72,
            marginLeft: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 22,
            color: FontColor.secondary
        },
        description: {
            marginTop: 16,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: BackgroundColor.primary
        },
        contactItem: {
            flex: 1,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 15,
            color: FontColor.secondary,
            opacity: 0.85
        },
        buttonContactItem: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: FontColor.secondary
        }
    })

    stylesImage = StyleSheet.create({
        logo: {
            height: 24,
            width: 24,
            marginRight: 8,
            resizeMode: "contain"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                    { DiscountsStrings.contact }
                </Text>
                { this.props.website ?
                    <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemWebsite">
                        <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactWebsite">
                            <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemWebsite">
                                { this.props.website }
                            </Text>
                        </View>
                        <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.WEBSITE, this.props.website, true) }>
                            <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemWebsite">
                                <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemWebsite">
                                    {  DiscountsStrings.access }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null }
                { this.props.email ?
                    <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemEmail">
                        <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactEmail">
                            <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemEmail">
                                { this.props.email }
                            </Text>
                        </View>
                        <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.EMAIL, this.props.email, false) }>
                            <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemEmail">
                                <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemEmail">
                                    {  DiscountsStrings.chatWith }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null }
                <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemPhone">
                    <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactPhone">
                        <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemPhone">
                            { formatPhoneNumber(this.props.phoneNumber) }
                        </Text>
                    </View>
                    <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.TELEPHONE, this.props.phoneNumber, false) }>
                        <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemPhone">
                            <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemPhone">
                                {  DiscountsStrings.call }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                { this.props.mobilePhoneNumber ?
                    <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemWhatsapp">
                        <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactWhatsapp">
                            <Image style = { this.stylesImage.logo } source = { Images.icons.whatsappLogo } accessibilityLabel = "imageLogoWhatsapp"/>
                            <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemWhatsapp">
                                { formatPhoneNumber(this.props.mobilePhoneNumber) }
                            </Text>
                        </View>
                        <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.WHATSAPP, this.props.mobilePhoneNumber, false) }>
                            <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemWhatsapp">
                                <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemWhatsapp">
                                    {  DiscountsStrings.chatWith }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null }
                { this.props.facebook ?
                    <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemFacebook">
                        <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactFacebook">
                            <Image style = { this.stylesImage.logo } source = { Images.icons.facebookLogo } accessibilityLabel = "imageLogoFacebook"/>
                            <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemFacebook">
                                /{ this.props.facebook }
                            </Text>
                        </View>
                        <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.FACEBOOK, this.props.facebook, true) }>
                            <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemFacebook">
                                <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemFacebook">
                                    {  DiscountsStrings.enterProfile }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null }
                { this.props.instagram ?
                    <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemInstagram">
                        <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactInstagram">
                            <Image style = { this.stylesImage.logo } source = { Images.icons.instagramLogo } accessibilityLabel = "imageLogoInstagram"/>
                            <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemInstagram">
                                /{ this.props.instagram }
                            </Text>
                        </View>
                        <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.INSTAGRAM, this.props.instagram, true) }>
                            <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemInstagram">
                                <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemInstagram">
                                    {  DiscountsStrings.enterProfile }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null }
                { this.props.twitter ?
                    <View style = { this.stylesView.contactItem } accessibilityLabel = "viewContactItemTwitter">
                        <View style =  { this.stylesView.contactItemLogoAndContact } accessibilityLabel = "viewContactItemLogoAndContactTwitter">
                            <Image style = { this.stylesImage.logo } source = { Images.icons.twitterLogo } accessibilityLabel = "imageLogoTwitter"/>
                            <Text style = { this.stylesText.contactItem } numberOfLines = { 1 } ellipsizeMode = { "tail" } accessibilityLabel = "textContactItemTwitter">
                                /{ this.props.twitter }
                            </Text>
                        </View>
                        <TouchableOpacity onPress = { () => this.props.onPressContact(ExternalLink.TWITTER, this.props.twitter, true) }>
                            <View style = { this.stylesButton.contactItem } accessibilityLabel = "buttonContactItemTwitter">
                                <Text style = { this.stylesText.buttonContactItem } accessibilityLabel = "textButtonContactItemTwitter">
                                    {  DiscountsStrings.enterProfile }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null }
            </View>
        )
    }
}