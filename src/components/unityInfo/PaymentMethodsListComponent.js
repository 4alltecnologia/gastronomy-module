import React, { PureComponent } from "react"
import { StyleSheet, View, FlatList } from "react-native"
import PaymentMethodsListHeaderComponent from "./PaymentMethodsListHeaderComponent"
import PaymentMethodsListCellComponent from "./PaymentMethodsListCellComponent"

export default class PaymentMethodsListComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "white"
        },
        contentContainer: {
            backgroundColor: "white"
        },
        collumnWrapper: {
            justifyContent: "flex-start"
        },
        separator: {
            height: 10,
            backgroundColor: "white",
            alignSelf: "stretch"
        }
    })

    constructor(props) {
        super(props)
    }

    _renderHeader = () => {
        return (
            <PaymentMethodsListHeaderComponent title = { this.props.paymentType.title }
                                               subtitle = { this.props.paymentType.subtitle }
            />
        )
    }

    _renderItem = ({ item, index }) => {
        return (
            <PaymentMethodsListCellComponent card = { item }/>
        )
    }

    _renderSeparator = () => {
        return (
            <View style = { this.stylesView.separator }/>
        )
    }

    _keyExtractor = ( item, index ) => {
        return item.id + ""
    }

    render() {
        return (
            <FlatList style = { this.stylesView.general }
                      contentContainerStyle = { this.stylesView.contentContainer }
                      columnWrapperStyle = { this.stylesView.collumnWrapper }
                      numColumns = { 3 }
                      data = { this.props.paymentType.getUniquePaymentMethodsList() }
                      extraData = { this.props }
                      keyExtractor = { this._keyExtractor }
                      renderItem = { this._renderItem }
                      ListHeaderComponent = { this._renderHeader }
                      ItemSeparatorComponent = { this._renderSeparator }
                      initialNumToRender = { 10 }
                      maxToRenderPerBatch = { 8 }
                      scrollEventThrottle = { 160 }
                      scrollEnabled = { false }
                      disableVirtualization = { false }
                      onEndReachedThreshold = { 100 }
                      removeClippedSubviews = { false }
                      listKey = { this.props.listKey }
                      accessibilityLabel = "flatlistTradesman"
            />
        )
    }
}