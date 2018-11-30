import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from "react-native"
import PropTypes from "prop-types"
import Images from "../../assets"
import { ORDER_TYPE_SELECTION_COMPONENT_STRINGS as OrderTypeStrings } from "../../languages"
import { screenWidthPercentage, AddressType } from "../../utils"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import OrderTypeSelectionCellComponent from "./OrderTypeSelectionCellComponent"
import OrderTypeSelection from "../../models/orderType/OrderTypeSelection"

const ADDRESS_BAR_HEIGHT = 40
const ADDRESS_BAR_TEXT_OPACITY = 1

export default class OrderTypeSelectionComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            backgroundColor: "rgb(239,239,239)"
        },
        header: {
            height: 130,
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BackgroundColor.primary
        },
        addressBar: {
            width: screenWidthPercentage(100),
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            backgroundColor: BackgroundColor.secondary,
        },
        orderTypeSelection: {
            flex: 1,
            width: screenWidthPercentage(100),
            paddingTop: 32,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "flex-start"
        },
        flatList: {
            height: screenWidthPercentage(50),
            marginTop: 32
        },
        separator: {
            width: 8,
            backgroundColor: "transparent"
        }
    })

    stylesText = StyleSheet.create({
        headerTitle: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 24,
            color: "white"
        },
        address: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: "white",
            textAlign: "center"
        },
        selectOrderType: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 18,
            color: FontColor.secondary,
            textAlign: "center"
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
            address: props.address,
            orderTypeSelectionList: props.orderTypeSelectionList,
            addressBarHeight: new Animated.Value(0),
            addressTextOpacity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Animated.parallel([
                Animated.spring( this.state.addressBarHeight, { toValue: ADDRESS_BAR_HEIGHT } ),
                Animated.spring( this.state.addressTextOpacity, { toValue: ADDRESS_BAR_TEXT_OPACITY } )
            ]).start()
        }, 100)
    }

    _renderItem = ({item, index}) => {
        return (
            <OrderTypeSelectionCellComponent orderTypeSelectionItem = { item }
                                             onPressOrderType = { this.props.onPressOrderType }
            />
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = (item, index) => {
        return item.idOrderType.id + ""
    }

    render() {
        return (
            <View style={this.stylesView.general} accessibilityLabel="viewGeneral">
                <View style={this.stylesView.header} accessibilityLabel="viewHeader">
                    <Image style={this.stylesImage.headerImage} source={Images.icons.gastronomy}
                           accessibilityLabel="imageHeaderImage"/>
                    <Text style={this.stylesText.headerTitle} accessibilityLabel="textHeaderGastronomyTitle">
                        {OrderTypeStrings.headerTitle}
                    </Text>
                </View>
                <Animated.View style={[this.stylesView.addressBar, {height: this.state.addressBarHeight}]}
                               accessibilityLabel="viewTopBarBackground">
                    <Animated.Text style={[this.stylesText.address, {opacity: this.state.addressTextOpacity}]}
                                   accessibilityLabel="textAddress">
                        { !!this.state.address ? this.state.address._parseFullAddress(AddressType.STREET_NEIGHBORHOOD_CITY) : ""}
                    </Animated.Text>
                </Animated.View>
                <View style={this.stylesView.orderTypeSelection} accessibilityLabel="viewOrderTypeSelection">
                    <Text style={this.stylesText.selectOrderType} accessibilityLabel="textSelectOrderType">
                        {OrderTypeStrings.selectOrderType}
                    </Text>
                    <View style={this.stylesView.flatList}>
                        <FlatList renderItem={this._renderItem}
                                  ItemSeparatorComponent={this._renderSeparator}
                                  data={this.state.orderTypeSelectionList}
                                  keyExtractor={this._keyExtractor}
                                  extraData={this.state}
                                  horizontal={true}
                                  scrollEnabled={false}
                                  disableVirtualization={false}
                                  onEndReachedThreshold={1200}
                                  removeClippedSubviews={false}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

OrderTypeSelectionComponent.propTypes = {
    address: PropTypes.object,
    orderTypeSelectionList: PropTypes.arrayOf(PropTypes.instanceOf(OrderTypeSelection)).isRequired,
    onPressOrderType: PropTypes.func.isRequired,
}

