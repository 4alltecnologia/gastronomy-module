import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import PropTypes from "prop-types"
import Images from "../../assets/index"
import { ORDER_STATUS_COMPONENT_STRINGS as OrderStrings } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import OrderTypeSelection from "../../models/orderType/OrderTypeSelection"

export default class OfferOrderTypeSelectionCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 44,
            backgroundColor: BackgroundColor.secondary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 22
        }
    })

    stylesText = StyleSheet.create({
        title: {
            marginLeft: 4,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            height: 32,
            width: 32,
            resizeMode: "contain"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            orderTypeSelectionItem: props.orderTypeSelectionItem
        }
    }

    render() {
        //width: 20 from padding, 8 from separator
        return (
            <TouchableOpacity onPress = { () => this.props.onPressOrderType(this.state.orderTypeSelectionItem) } accessibilityLabel = "buttonGeneral">
                <View style = { [this.stylesView.general,
                                { width: this.props.orderTypeSelectionListLength == 2 ? screenWidthPercentage(50) - 28 : screenWidthPercentage(100) - 40,
                                    backgroundColor: this.props.isSelected ? BackgroundColor.primary : "rgb(239,239,239)" }] }
                      accessibilityLabel = {"viewGeneral" + this.state.orderTypeSelectionItem.title}>
                    <Image style = { [this.stylesImage.image, { tintColor: this.props.isSelected ? FontColor.primary : "rgb(130,130,130)" }] } source = { this.state.orderTypeSelectionItem.imageURI } accessibilityLabel = "imageHeaderImage"/>
                    <Text style = { [this.stylesText.title, { color: this.props.isSelected ? FontColor.primary : "rgb(130,130,130)"} ] } accessibilityLabel = "textHeaderTitle">
                        { this.state.orderTypeSelectionItem.title }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

OfferOrderTypeSelectionCellComponent.propTypes = {
    orderTypeSelectionItem: PropTypes.instanceOf(OrderTypeSelection).isRequired,
    onPressOrderType: PropTypes.func.isRequired,
}

