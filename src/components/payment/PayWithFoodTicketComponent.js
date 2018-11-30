import React, { Component } from "react"
import { Animated, Image, ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAY_WITH_FOOD_TICKET_COMPONENT_STRINGS as PaymentStrings, GENERAL_STRINGS } from "../../languages/index"
import Images from "../../assets/index"
import { PAYMENT_METHOD } from "../../utils"

import SelectGenericCardComponent from "./SelectGenericCardComponent"
import { OptionsModal } from "../SelectGenericItemListComponent"

export default class PayWithFoodTicketComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            width: "100%",
            flexGrow: 1,
            backgroundColor: "white",
            alignItems: "center"
        },
        title: {
            height: 48,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        needChange: {
            height: 48,
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            alignSelf: "stretch"
        },
        howMuch: {
            flex: 1,
            height: 48,
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "stretch"
        },
        expandable: {
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgb(242,242,242)",
            alignSelf: "stretch"
        },
        description: {
            marginTop: 8,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 16
        },
        line: {
            height: 1,
            width: "100%",
            marginBottom: 1,
            backgroundColor: "rgb(209,209,209)"
        },
        check: {
            flexDirection: "row"
        },
        imageBackground: {
            height: 18,
            width: 18,
            marginRight: 8,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontSize: 14,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            marginRight: 20,
            color: "rgb(91,91,91)"
        },
        needChange: {
            fontFamily: FontFamily.font,
            fontSize: 18,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(128,128,128)"
        },
        howMuch: {
            flex: 1,
            fontFamily: FontFamily.font,
            fontSize: 20,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(128,128,128)"
        },
        description: {
            fontFamily: FontFamily.font,
            fontSize: 13,
            fontWeight: FontWeight.medium,
            textAlign: "left",
            color: "rgb(128,128,128)"
        },
        descriptionBold: {
            fontFamily: FontFamily.font,
            fontSize: 13,
            fontWeight: FontWeight.bold,
            textAlign: "left",
            color: "rgb(128,128,128)"
        }
    })

    stylesButton = StyleSheet.create({
        checkSelected: {
            color: "rgb(61,61,61)"
        }
    })

    stylesImage = StyleSheet.create({
        check: {
            resizeMode: "contain",
            height: 12,
            width: 12,
            tintColor: BackgroundColor.primary
        },
        checkSelected: {
            resizeMode: "contain",
            height: 18,
            width: 18,
            tintColor: BackgroundColor.primary,
            opacity: 0.4
        },
        checkUnselected: {
            resizeMode: "contain",
            height: 18,
            width: 18,
            tintColor: "rgb(128,128,128)"
        },
        radialSelected: {
            resizeMode: "contain",
            height: 18,
            width: 18,
            marginRight: 8,
            marginLeft: 8,
            tintColor: BackgroundColor.primary
        },
        radialUnselected: {
            resizeMode: "contain",
            height: 18,
            width: 18,
            marginRight: 8,
            marginLeft: 8,
            tintColor: "rgb(128,128,128)"
        },
        cardTitle: {
            resizeMode: "contain",
            height: 24,
            width: 24,
            marginRight: 8,
            tintColor: BackgroundColor.primary
        }
    })

    stylesDropdown = StyleSheet.create({
        itemListTelcom: {
            textAlign: 'left',
            flex: 1,
            color: '#3d3d3d',
            fontSize: 16,
            fontFamily: FontFamily.font
        },
        itemTelcomSelected: {
            textAlign: 'left',
            flex: 1,
            color: '#3d3d3d',
            fontSize: 16,
            fontFamily: FontFamily.font
        }
    })

    constructor(props) {
        super(props)

        let value = this.props.selectedPaymentMethod.name == PAYMENT_METHOD.FOODTICKET.name ? true : false

        this.state = {
            isFoodTicket: value,
            needChange: true,
            text: "",
            isShowingOptions: false,
            selectedOption: this.props.selectedOption,
            cardList: this.props.cardList
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPaymentMethod.name == PAYMENT_METHOD.FOODTICKET.name) {
            this.setState({
                isFoodTicket: true,
                selectedOption: nextProps.selectedOption
            })

            this.props.onBrandIdChanged(nextProps.selectedOption.id)
        } else {
            this.setState({
                isFoodTicket: false
            })
        }
    }

    onIsFoodTicket() {
        this.props.onPayOnDeliveryTapped(PAYMENT_METHOD.FOODTICKET)
    }

    /**
     * Execute before the component show
     * @param value: Boolean
     */
    onShow(value) {
        this.setState({
            isShowingOptions: value,
        })
    }

    /**
     * Execute after user select a operator
     * @param item: Object
     * @param isShow: Boolean
     */
    onSelect(item, index): void {
        this.setState({
            isShowingOptions: false
        })

        this.props.onChangeFoodTicket(item)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine"/>
                <TouchableOpacity style = { this.stylesView.title } onPress = { () => this.onIsFoodTicket() } accessibilityLabel = "touchableFoodTicket">
                    <TouchableOpacity onPress = { () => this.onIsFoodTicket() } accessibilityLabel = "touchableOpacity">
                        <ImageBackground style = { this.stylesView.imageBackground }
                                         imageStyle = { this.state.isFoodTicket ? this.stylesImage.checkSelected : this.stylesImage.checkUnselected }
                                         source = { Images.icons.checkBorder }
                                         accessibilityLabel = "imageBackground">
                            <Image style = { this.stylesImage.check }
                                   source = { this.state.isFoodTicket ? Images.icons.check : null }
                                   accessibilityLabel = "imageCheckSelected"
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                    <Image style = { this.stylesImage.cardTitle } source = { Images.icons.foodTicket } accessibilityLabel = "imageCardTitle"/>
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                        { PaymentStrings.foodTicket }
                    </Text>
                </TouchableOpacity>
                { this.state.isFoodTicket ?
                    <Animated.View style = { this.stylesView.expandable }>
                        <View style = { this.stylesView.description } accessibilityLabel = "viewDescription">
                            <Text style = { this.stylesText.description } accessibilityLabel = "textDescription">
                                <Text style = { this.stylesText.description } accessibilityLabel = "textDescription1">
                                    { PaymentStrings.description.first }
                                </Text>
                                <Text style = { this.stylesText.descriptionBold } accessibilityLabel = "textDescriptionBold1">
                                    { PaymentStrings.description.second }
                                </Text>
                                <Text style = { this.stylesText.description } accessibilityLabel = "textDescription2">
                                    { PaymentStrings.description.third }
                                </Text>
                                <Text style = { this.stylesText.descriptionBold } accessibilityLabel = "textDescriptionBold2">
                                    { PaymentStrings.description.fourth }
                                </Text>
                                <Text style = { this.stylesText.description } accessibilityLabel = "textDescription3">
                                    { PaymentStrings.description.fifth }
                                </Text>
                                <Text style = { this.stylesText.descriptionBold } accessibilityLabel = "textDescriptionBold3">
                                    { PaymentStrings.description.sixth }
                                </Text>
                            </Text>
                        </View>
                        <SelectGenericCardComponent card = { this.state.selectedOption } onShow = { this.onShow.bind(this) }/>
                        { this.state.isShowingOptions ? <OptionsModal options = { this.state.cardList }
                                                                      animationType = "fade"
                                                                      itemListStyle = { this.stylesDropdown.itemListTelcom }
                                                                      itemStyle = { this.stylesDropdown.itemTelcomSelected }
                                                                      onSelect = { this.onSelect.bind(this) }
                                                                      onShow = { this.onShow.bind(this) }
                                                                      isShowingOptions = { this.state.isShowingOptions }
                                                                      selectedOption = { this.state.selectedOption }
                        /> : null }
                    </Animated.View> : null }
            </View>
        )
    }
}
