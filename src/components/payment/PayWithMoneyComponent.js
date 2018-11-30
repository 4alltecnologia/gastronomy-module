import React, { Component } from "react"
import { Animated, Image, ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet, findNodeHandle } from "react-native"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { PAY_WITH_MONEY_COMPONENT_STRINGS as PaymentStrings, GENERAL_STRINGS } from "../../languages/index"
import Images from "../../assets/index"
import { PAYMENT_METHOD } from "../../utils"
import Numeral from "numeral"
import { LANGUAGE } from "../../configs"
import VMasker from "vanilla-masker"

export default class PayWithMoneyComponent extends Component {

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
            justifyContent: "space-between",
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

    constructor(props) {
        super(props)

        let value = this.props.selectedPaymentMethod.name == PAYMENT_METHOD.MONEY.name ? true : false

        this.state = {
            isMoney: value,
            needChange: true,
            text: ""
        }

        Numeral.locale(LANGUAGE.toLowerCase())
    }

    componentWillReceiveProps(nextProps) {
        let value = nextProps.selectedPaymentMethod.name == PAYMENT_METHOD.MONEY.name ? true : false

        this.setState({
            isMoney: value
        })
    }

    _onIsMoney(value) {
        this.props.onPayOnDeliveryTapped(PAYMENT_METHOD.MONEY)
    }

    _onNeedChange(value) {
        this.setState({
            needChange: value
        })

        this.props.onNeedChange(value)
    }

    _onChangeTyped(change) {
        let changeTest = VMasker.toNumber(change)

        if (changeTest.length > 8) {
            return
        } else if (changeTest == 0) {
            this.setState({
                text: ""
            })

            return
        }

        let stringValue = VMasker.toMoney(change, {
            precision: 2,
            separator: ",",
            delimiter: ".",
            unit: GENERAL_STRINGS.monetary,
            zeroCents: false })

        this.setState({
            text: stringValue
        })

        this.props.onChangeTyped(changeTest)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                <View style = { this.stylesView.line } accessibilityLabel = "viewLine"/>
                <TouchableOpacity style = { this.stylesView.title } onPress = { () => this._onIsMoney() } accessibilityLabel = "touchableMoney">
                    <TouchableOpacity onPress = { () => this._onIsMoney() } accessibilityLabel = "touchableIsMoney">
                        <ImageBackground style = { this.stylesView.imageBackground }
                                         imageStyle = { this.state.isMoney ? this.stylesImage.checkSelected : this.stylesImage.checkUnselected }
                                         source = { Images.icons.checkBorder }
                                         accessibilityLabel = "imageBackground">
                            <Image style = { this.stylesImage.check }
                                   source = { this.state.isMoney ? Images.icons.check : null }
                                   accessibilityLabel = "imageCheckSelected"
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                    <Image style = { this.stylesImage.cardTitle } source = { Images.icons.bankNote } accessibilityLabel = "imageCardTitle"/>
                    <Text style = { this.stylesText.title } accessibilityLabel = "textTitle">
                        { PaymentStrings.money }
                    </Text>
                </TouchableOpacity>
                { this.state.isMoney ?
                    <Animated.View style = { this.stylesView.expandable } accessibilityLabel = "viewExpandable">
                        <View style = { this.stylesView.needChange } accessibilityLabel = "viewNeedChange">
                            <Text style = { this.stylesText.needChange } accessibilityLabel = "textNeedChange">
                                { PaymentStrings.needChange }
                            </Text>
                            <View style = { this.stylesView.check } accessibilityLabel = "viewCheckYes">
                                <TouchableOpacity onPress = { () => this._onNeedChange(true) } accessibilityLabel = "touchableMoneyYes">
                                    <Image style = { this.state.needChange ? this.stylesImage.radialSelected : this.stylesImage.radialUnselected }
                                           source = { this.state.needChange ? Images.icons.checkRadial : Images.icons.checkBorder }
                                           accessibilityLabel = "imageCheckSelected"
                                    />
                                </TouchableOpacity>
                                <Text accessibilityLabel = "textYes">
                                    { GENERAL_STRINGS.yes }
                                </Text>
                            </View>
                            <View style = { this.stylesView.check } accessibilityLabel = "viewCheckNo">
                                <TouchableOpacity onPress = { () => this._onNeedChange(false) } accessibilityLabel = "touchableMoneyNo">
                                    <Image style = { this.state.needChange ? this.stylesImage.radialUnselected : this.stylesImage.radialSelected }
                                           source = { this.state.needChange ? Images.icons.checkBorder : Images.icons.checkRadial }
                                           accessibilityLabel = "imageCheckSelected"
                                    />
                                </TouchableOpacity>
                                <Text accessibilityLabel = "textNo">
                                    { GENERAL_STRINGS.no }
                                </Text>
                            </View>
                        </View>
                        { this.state.needChange ?
                            <View style = { this.stylesView.howMuch } accessibilityLabel = "viewHowMuch">
                                <TextInput style = { this.stylesText.howMuch }
                                           onFocus={(event: Event) => {
                                               this.props.onScrollToInput(findNodeHandle(event.target))
                                           }}
                                           keyboardType={"numeric"}
                                           placeholder = { PaymentStrings.howMuch }
                                           onChangeText = { (text) => this._onChangeTyped(text) }
                                           value = { this.state.text }
                                           accessibilityLabel = "textInputHowMuch"
                                />
                            </View> : null }
                    </Animated.View> : null }
            </View>
        )
    }
}
