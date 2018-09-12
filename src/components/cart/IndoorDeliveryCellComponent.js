import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, getOrderTypeMessageForCells, getOrderTypeIcon } from "../../utils"
import Images from "../../assets/index"
import { LANGUAGE } from "../../configs"
import { ORDER_HISTORY_CELL_COMPONENT_STRINGS as OrderStrings, GENERAL_STRINGS } from "../../languages/index"

export default class IndoorDeliveryCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        content: {
            flex: 1,
            height: 120,
            alignItems: "center",
            justifyContent: "space-around",
            padding: 8,
            borderRadius: 8,
            borderColor: BackgroundColor.primary,
            borderWidth: 1
        }
    })

    stylesText = StyleSheet.create({
        messageGeneral: {
            textAlign: "center"
        },
        message: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,

        },
        messageBold: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: BackgroundColor.primary
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 45,
            width: 45,
            resizeMode: "contain",
            backgroundColor: "transparent"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderType: props.orderType,
            isSelected: props.isSelected,
            numberOfCells: props.numberOfCells,
            index: props.index
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orderType: nextProps.orderType,
            isSelected: nextProps.isSelected,
            numberOfCells: nextProps.numberOfCells,
            index: nextProps.index
        })
    }

    render() {
        let message = getOrderTypeMessageForCells(this.state.orderType)
        let iconSource = getOrderTypeIcon(this.state.orderType)

        let magicNumber = (30 / this.state.numberOfCells) + ((this.state.numberOfCells - 1) * 4)
        let width = this.state.numberOfCells == 2 ? screenWidthPercentage(50) - magicNumber : screenWidthPercentage(33.8) - magicNumber

        return (
            <TouchableWithoutFeedback style = { this.stylesView.general } onPress = { () => { this.props.onTapCell(this.state.index) } }>
                <View style = { [this.stylesView.content, { width: width, backgroundColor: this.state.isSelected ? BackgroundColor.primary : "transparent"  }] } accessilibityInfo = "viewContent" >
                    <Image style = { [this.stylesImage.icon, {tintColor: this.state.isSelected ? "white" : BackgroundColor.primary }] } source = { iconSource } accessibilityInfo = "imageIcon"/>
                    <Text style = { this.stylesText.messageGeneral } accessibilityInfo = "textMessage">
                        <Text style = { [this.stylesText.message, {color: this.state.isSelected ? "white" : BackgroundColor.primary }] }>
                            { message.firstMessage + " "}
                        </Text>
                        <Text style = { [this.stylesText.messageBold, {color: this.state.isSelected ? "white" : BackgroundColor.primary }] }>
                            { message.secondMessage }
                        </Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}