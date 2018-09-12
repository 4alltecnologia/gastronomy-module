import React, { PureComponent } from "react"
import { View, StyleSheet, Alert, StatusBar } from "react-native"
import { FontColor } from "../../theme/Theme"
import ModifierFooterComponent from "./components/ModifierFooterComponent"
import SingleSelectionProductsListComponent from "./components/singleSelection/SingleSelectionProductsListComponent"
import { addProductModifier, removeProductModifier } from "../../database/specialization/StorageProduct"
import { GENERAL_STRINGS } from "../../languages/index"

export default class ModifierSingleSelectionController extends PureComponent {

    stylesView = StyleSheet.create({
        content: {
            flex:1
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            modifier: props.modifier,
            listOptions: props.modifier.options,
            selectedOption: null,
            productValue: 0,
            totalValue: 0
        }

        this.onSelectOption = this._onSelectOption.bind(this)
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

    _onSelectOption(option) {
        this.setState({
            selectedOption: option,
            totalValue: this.state.productValue + option.originalPrice
        })
    }

    _onNextPressed() {
        if (!!this.state.selectedOption) {
            addProductModifier(this.state.modifier, [this.state.selectedOption], (error, product) => {
                if (!error) {
                    this.props.onNextPressed({
                        listOptions: this.state.selectedOption ? [this.state.selectedOption] : [],
                        modifier: this.state.modifier,
                        product: product
                    })
                } else {
                    Alert.alert(GENERAL_STRINGS.alertErrorTitle , GENERAL_STRINGS.alertErrorMessage)
                }
            })
        } else {
            this.props.onNextPressed({
                listOptions: this.state.selectedOption ? [this.state.selectedOption] : [],
                modifier: this.state.modifier,
                product: null
            })
        }
    }

    render() {
        let enableNext = this.state.modifier.min > 0 ? this.state.selectedOption != null : true
        let barStyle = FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"

        return(
            <View style = { this.stylesView.content } accessibilityLabel="viewMain">
                <StatusBar barStyle = { barStyle } accessibilityLabel="statusBar"/>
                <SingleSelectionProductsListComponent product = { this.props.product }
                                                      selectedOption = { this.state.selectedOption }
                                                      listOptions = { this.state.listOptions }
                                                      quantitySteps = { this.props.quantitySteps }
                                                      currentStep = { this.props.currentStep }
                                                      onSelectOption = { this.onSelectOption }
                                                      priceType = { this.state.modifier.priceType }
                />
                <ModifierFooterComponent totalValue = { this.state.totalValue }
                                         enableNext = { enableNext }
                                         onNextPressed = { this.onNextPressed }
                />
            </View>
        )
    }
}
