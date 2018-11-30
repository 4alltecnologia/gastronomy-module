import React, { PureComponent } from "react"
import { StyleSheet, View, Text, FlatList, Animated } from "react-native"
import PropTypes from "prop-types"
import Images from "../../assets/index"
import { ORDER_TYPE_SELECTION_COMPONENT_STRINGS as OrderTypeStrings } from "../../languages/index"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import OfferCellComponent from "./OfferCellComponent"
import OfferItem from "./model/OfferItem"

export default class OffersListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "white"
        },
        flatList: {
            flex: 1,
            marginTop: 8
        },
        separator: {
            height: 0.5,
            marginHorizontal: 20,
            alignSelf: "stretch",
            backgroundColor: "#d1d1d1"
        },
        offerSelectionHeader: {
            height: 96,
            width: screenWidthPercentage(100),
            marginTop: 8,
            paddingHorizontal: 20
        }
    })

    stylesText = StyleSheet.create({
        headerTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 24,
            color: FontColor.secondary
        }
    })

    stylesImage = StyleSheet.create({
        headerImage: {
            height: 40,
            width: 40,
            marginBottom: 8,
            resizeMode: "contain",
            tintColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            offersList: props.offersList
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            offersList: nextProps.offersList
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <OfferCellComponent offerItem = { item }
                                onOfferTapped = { this.props.onOfferTapped }
            />
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = (item, index) => {
        let id = item.product.id + "" + item.product.orderType.id

        return id
    }

    render() {
        return (
            <View style = { this.stylesView.general }  accessibilityLabel = "viewGeneralOffersComponent">
                <FlatList style = { this.stylesView.flatList }
                          data = { this.state.offersList }
                          extraData = { this.state }
                          keyExtractor = { this._keyExtractor }
                          renderItem = { this._renderItem }
                          ItemSeparatorComponent = { this._renderSeparator }
                          initialNumToRender = { 12 }
                          maxToRenderPerBatch = { 12 }
                          scrollEnabled = { false }
                          disableVirtualization = { false }
                          onEndReachedThreshold = { 1200 }
                          removeClippedSubviews = { false }
                          accessibilityLabel = "flatListOffers"
                />
            </View>
        )
    }
}

OffersListComponent.propTypes = {
    offersList: PropTypes.arrayOf(PropTypes.instanceOf(OfferItem)).isRequired,
    onOfferTapped: PropTypes.func.isRequired
}

