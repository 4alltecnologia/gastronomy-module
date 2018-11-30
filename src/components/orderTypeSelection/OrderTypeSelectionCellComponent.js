import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import PropTypes from "prop-types"
import Images from "../../assets/index"
import { ORDER_STATUS_COMPONENT_STRINGS as OrderStrings } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import OrderTypeSelection from "../../models/orderType/OrderTypeSelection"

export default class OrderTypeSelectionCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            padding: 8,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center"
        },
        content: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "white",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 6,
            shadowOpacity: 0.2,
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 14,
            color: FontColor.secondary
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            height: 52,
            width: 52,
            marginBottom: 16,
            resizeMode: "contain",
            tintColor: BackgroundColor.secondary
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderTypeSelectionItem: props.orderTypeSelectionItem
        }
    }

    render() {
        return (
            <TouchableOpacity onPress = { () => this.props.onPressOrderType(this.state.orderTypeSelectionItem.idOrderType) } accessibilityLabel = { "buttonOrderType" + this.state.orderTypeSelectionItem.idOrderType.key }>
                <View style = { [this.stylesView.general, { height: screenWidthPercentage(50) - 28, width: screenWidthPercentage(50) - 28}] } accessibilityLabel = "viewGeneral">
                    <View style = { [this.stylesView.content, { height: screenWidthPercentage(50) - 44, width: screenWidthPercentage(50) - 44}] } accessibilityLabel = "viewGeneral">
                        <Image style = { this.stylesImage.image } source = { this.state.orderTypeSelectionItem.imageURI } accessibilityLabel = "imageHeaderImage"/>
                        <Text style = { this.stylesText.title } accessibilityLabel = "textHeaderTitle">
                            { this.state.orderTypeSelectionItem.title }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

OrderTypeSelectionCellComponent.propTypes = {
    orderTypeSelectionItem: PropTypes.instanceOf(OrderTypeSelection).isRequired,
    onPressOrderType: PropTypes.func.isRequired,
}

