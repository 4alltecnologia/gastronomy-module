import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native"
import { CachedImage } from "react-native-cached-image"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import { screenWidthPercentage, getOrderTypeMessageForCells, getOrderTypeIcon, IdOrderType } from "../../utils"
import Images from "../../assets/index"
import { LANGUAGE } from "../../configs"
import { ORDER_HISTORY_CELL_COMPONENT_STRINGS as OrderStrings, GENERAL_STRINGS } from "../../languages/index"

export default class IndoorDeliverySingleCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        content: {
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "stretch",
            borderRadius: 8,
            borderColor: BackgroundColor.primary,
            borderWidth: 1
        },
        icon: {
            flexGrow: 1,
            width: 60,
            margin: 0,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch"
        },
        message: {
            flexGrow: 1,
            margin: 8,
            alignItems: "flex-start",
            justifyContent: "center",
            alignSelf: "stretch"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginTop: 2,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: BackgroundColor.primary
        },
        messageGeneral: {
            marginTop: 2,
            marginBottom: 2,
            marginRight: 8,
            textAlign: "left",
            backgroundColor: "transparent"
        },
        message: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: "rgb(128,128,128)"
        },
        messageBold: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 12,
            color: "rgb(61,61,61)"
        }
    })

    stylesImage = StyleSheet.create({
        icon: {
            height: 32,
            width: 32,
            resizeMode: "contain",
            backgroundColor: "transparent"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderType: props.orderType,
            isSelected: props.isSelected
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orderType: nextProps.orderType,
            isSelected: nextProps.isSelected
        })
    }

    render() {
        let message = getOrderTypeMessageForCells(this.state.orderType, true)
        let iconSource = getOrderTypeIcon(this.state.orderType)
        let width = screenWidthPercentage(100) - 30

        return (
            <View style = { [this.stylesView.content, { width: width}] } accessilibityInfo = "viewContent" >
                <View style = { [this.stylesView.icon, { backgroundColor: this.state.isSelected ? BackgroundColor.primary : "transparent" } ]}>
                    <Image style = { [this.stylesImage.icon, {tintColor: this.state.isSelected ? "white" : BackgroundColor.primary }] } source = { iconSource } accessibilityInfo = "imageIcon"/>
                </View>
                <View style = { [this.stylesView.message, { width: width - 76 } ]} accessibilityInfo = "viewMessage">
                    <Text style = { this.stylesText.title } accessibilityInfo = "textTitle">
                        { message.firstMessage }
                    </Text>
                    <Text style = { this.stylesText.messageGeneral } accessibilityInfo = "textMessage">
                        <Text style = { this.stylesText.message }>
                            { message.secondMessage }
                        </Text>
                        { this.state.orderType == IdOrderType.TAKEAWAY.id ?
                        <Text style = { this.stylesText.messageBold }>
                            { this.props.takeawayTimeText }
                        </Text>
                            : null }
                    </Text>
                </View>
            </View>
        )
    }
}