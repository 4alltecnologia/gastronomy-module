import React, { PureComponent } from "react"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, FlatList, Alert, StatusBar, ScollView } from "react-native"
import { screenWidthPercentage, screenHeightPercentage, PriceType } from "../../utils"
import { FontWeight, BackgroundColor, FontColor } from "../../theme/Theme"
import { GENERAL_STRINGS } from "../../languages/index"
import Numeral from "numeral"
import "numeral/locales/pt-br"
import { LANGUAGE } from "../../configs"
import Images from "../../assets"
import { addProductModifier, removeProductModifier } from "../../database/specialization/StorageProduct"
import ProductDescriptionComponent from "./components/ProductDescriptionComponent"
import ModifierFooterComponent from "./components/ModifierFooterComponent"
import MultipleSelectionProductsListComponent from "./components/multipleSelection/MultipleSelectionProductsListComponent"

export default class ModifierMultipleSelectionController extends PureComponent {

    stylesView = StyleSheet.create({
        content:{
            flex:1
        }
    })

    constructor(props){
        super(props)

        this.state = {
            modifier: props.modifier,
            listOptions: props.modifier.options,
            quantitySelected: 0,
            listSelectedOptions: [],
            productValue: 0,
            totalValue: 0
        }

        this.onMinusPressed = this._onMinusPressed.bind(this)
        this.onPlusPressed = this._onPlusPressed.bind(this)
        this.onNextPressed = this._onNextPressed.bind(this)
    }

    componentWillMount() {
        removeProductModifier(this.state.modifier, (error, product) => {
            this.setState({
                productValue: product.totalValue,
                totalValue: product.totalValue
            })
        })
    }

    _onNextPressed() {
        addProductModifier(this.state.modifier, this.state.listSelectedOptions, (error, product) => {
            if (!error) {
                this.props.onNextPressed({
                    listOptions: this.state.listSelectedOptions ? this.state.listSelectedOptions : [],
                    modifier: this.state.modifier,
                    product: product
                })
            } else {
                Alert.alert(GENERAL_STRINGS.alertErrorTitle , GENERAL_STRINGS.alertErrorMessage)
            }
        })
    }

    _onPlusPressed(optionSelected) {
        if (this.state.quantitySelected < this.state.modifier.max) {
            let listProducts = this.state.listSelectedOptions
            listProducts.push(optionSelected)

            let value = 0

            if (this.state.modifier.priceType == PriceType.SUM_TOTAL) {
                listProducts.map(modifier => {
                    value += modifier.originalPrice
                })
            } else if (this.state.modifier.priceType == PriceType.AVERAGE) {
                listProducts.map(modifier => {
                    value += modifier.originalPrice / listProducts.length
                })
            }

            this.setState({
                quantitySelected: this.state.listSelectedOptions.length,
                listSelectedOptions: listProducts,
                totalValue: this.state.productValue + value
            })
        }
    }

    _onMinusPressed(optionSelected) {
        if (this.state.quantitySelected > 0){
            let canRemove = true
            let newListProducts = []
            this.state.listSelectedOptions.map((option) => {
                if (option.id != optionSelected.id){
                    newListProducts.push(option)
                } else if (option.id == optionSelected.id && canRemove == false){
                    newListProducts.push(option)
                } else if (canRemove == true){
                    canRemove = false
                }
            })

            let value = 0

            if (this.state.modifier.priceType == PriceType.SUM_TOTAL) {
                newListProducts.map(modifier => {
                    value += modifier.originalPrice
                })
            } else if (this.state.modifier.priceType == PriceType.AVERAGE) {
                newListProducts.map(modifier => {
                    value += modifier.originalPrice / newListProducts.length
                })
            }

            this.setState({
                listSelectedOptions: newListProducts,
                quantitySelected: newListProducts.length,
                totalValue: this.state.productValue + value
            })
        }
    }

    render(){
        let enableNext = this.state.quantitySelected >= this.state.modifier.min
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"

        return(
            <View style = { this.stylesView.content } accessibilityLabel = "viewMain">
                <StatusBar barStyle = { barStyle } accessibilityLabel = "statusBar"/>
                <MultipleSelectionProductsListComponent modifier = { this.state.modifier }
                                                        product = { this.props.product }
                                                        listOptions = { this.state.listOptions }
                                                        listSelectedOptions = { this.state.listSelectedOptions }
                                                        quantitySteps = { this.props.quantitySteps }
                                                        currentStep = { this.props.currentStep }
                                                        min = { this.state.modifier.min }
                                                        max = { this.state.modifier.max }
                                                        quantitySelected = { this.state.quantitySelected }
                                                        onPlus = { this.onPlusPressed }
                                                        onMinus = { this.onMinusPressed }
                />
                <ModifierFooterComponent totalValue = { this.state.totalValue }
                                         enableNext = { enableNext }
                                         onNextPressed = { this.onNextPressed }
                />
            </View>
        )
    }
}