import React, { PureComponent } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { FontColor } from "../../theme/Theme"
import ModifierFooterComponent from "./components/ModifierFooterComponent"
import SingleSelectionProductsListComponent from "./components/singleSelection/SingleSelectionProductsListComponent"
import { addProductModifier, removeProductModifier } from "../../database/specialization/StorageProduct"
import { GENERAL_STRINGS } from "../../languages/index"
import { ExternalMethods } from "../../native/Functions"
import { FirebaseActions } from "../../utils"

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
        let selectedOption = !!this.state.selectedOption && this.state.selectedOption.id === option.id ? null : option

        if (!!selectedOption) {
            ExternalMethods.registerFirebaseEvent(FirebaseActions.MODIFIERS.actions.SINGLE_ADD, { id: selectedOption.id, name: selectedOption.name })
        } else {
            ExternalMethods.registerFirebaseEvent(FirebaseActions.MODIFIERS.actions.SINGLE_REMOVE, { id: option.id, name: option.name })
        }

        this.setState({
            selectedOption: selectedOption,
            totalValue: !!selectedOption ? this.state.productValue + option.originalPrice : this.state.productValue
        })
    }

    _onNextPressed() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.MODIFIERS.actions.MODIFIERS_ADDED, {})

        addProductModifier(this.state.modifier, !!this.state.selectedOption ? [this.state.selectedOption] : [], (error, product) => {
            if (!error) {
                this.props.onNextPressed({
                    listOptions: !!this.state.selectedOption ? [this.state.selectedOption] : [],
                    modifier: this.state.modifier,
                    product: product
                })
            } else {
                Alert.alert(GENERAL_STRINGS.alertErrorTitle, GENERAL_STRINGS.alertErrorMessage)
            }
        })
    }

    render() {
        let enableNext = this.state.modifier.min > 0 ? this.state.selectedOption != null : true

        return(
            <View style = { this.stylesView.content } accessibilityLabel="viewMain">
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