import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import { updateModifiersSelected, getModifiersSelected } from "../database/specialization/StorageModifiers"
import { MODIFIERS_SINGLE_SELECTION_STRINGS as SingleModifierStrings, MODIFIERS_MULTIPLE_SELECTION_STRINGS as MultipleModifierStrings } from "../languages/index"
import ModifierSingleSelectionController from "../containers/modifiers/ModifierSingleSelectionController"
import ModifierMultipleSelectionController from "../containers/modifiers/ModifierMultipleSelectionController"

export default class ModifierContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "rgb(242,242,242)"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            steps: [],
            nextModifier: null,
            product: this.props.navigation.state.params.product,
            unity: this.props.navigation.state.params.unity,
            catalogNavigationKey: !!this.props.navigation.state.params.catalogNavigationKey ? this.props.navigation.state.params.catalogNavigationKey : this.props.navigation.state.key
        }

        this.onNextPressed = this._onNextPressed.bind(this)
    }

    componentWillMount() {
        this.getModifiers()
    }

    getModifiers() {
        getModifiersSelected((error, data) => {
            let variations = data.product.productVariations.sort((prodA, prodB) => prodA.sortOrder < prodB.sortOrder ? -1 : 1)

            this.setState({
                nextModifier: data.nextModifier ? data.nextModifier : variations[0],
                steps: data.steps
            }, () => this._updateContainerTitle())
        })
    }

    _updateContainerTitle() {
        this.props.navigation.setParams({ title: this.state.nextModifier.name })
    }

    _onNextPressed(stepSelected){
        let noLeft = true
        this.updateModifier(stepSelected)

        this.state.nextModifier = this.state.product.productVariations[this.state.steps.length]
        this.state.product = !!stepSelected.product ? stepSelected.product : this.state.product

        updateModifiersSelected({
            nextModifier: this.state.nextModifier,
            steps: this.state.steps,
            product: this.state.product,
            unity: this.state.unity,
        }, (error, data) => {
            if (data.steps.length == data.product.productVariations.length){
                noLeft = false
                this.goToProductDetail(data.product, data.unity)
            } else if (!error && data.nextModifier) {
                noLeft = false
                this.props.navigation.navigate("ModifierContainer" + this.props.navigation.state.params.nextScreen, {
                    nextModifier: data.nextModifier,
                    steps: data.steps,
                    product: data.product,
                    unity: data.unity,
                    catalogNavigationKey: this.state.catalogNavigationKey,
                    nextScreen: this.props.navigation.state.params.nextScreen == "Odd" ? "Even" : "Odd"
                })
            }
        })

        if (this.state.steps.length == this.state.product.productVariations.length && noLeft){
            this.goToProductDetail(this.state.product, this.state.unity)
        }
    }

    goToProductDetail(product, unity) {
        this.props.navigation.navigate("ProductDetailContainer", {
            product: product,
            unity: unity,
            catalogNavigationKey: this.state.catalogNavigationKey
        })
    }

    updateModifier(stepSelected) {
        let exist = false
        let steps = this.state.steps

        steps.forEach((step) => {
            if (step.modifier.id == stepSelected.modifier.id) {
                exist = true
                step = stepSelected
            }
        })

        if (!exist){
            steps.push(stepSelected)
        }

        this.setState({
            steps: steps
        })

        return exist
    }

    render() {
        if (this.state.nextModifier) {
            if (this.state.steps.length < this.state.product.productVariations.length) {
                if (this.state.nextModifier.max == 1) {
                    return (
                        <SafeAreaView style = { this.stylesView.safeArea }>
                            <ModifierSingleSelectionController modifier = { this.state.nextModifier }
                                                               product = { this.state.product }
                                                               quantitySteps = { this.state.product.productVariations.length }
                                                               currentStep = { this.state.steps.length + 1 }
                                                               onNextPressed = { this.onNextPressed }
                            />
                        </SafeAreaView>
                    )
                } else {
                    return (
                        <SafeAreaView style = { this.stylesView.safeArea }>
                            <ModifierMultipleSelectionController modifier = { this.state.nextModifier }
                                                                 product = { this.state.product }
                                                                 quantitySteps = { this.state.product.productVariations.length }
                                                                 currentStep = { this.state.steps.length + 1 }
                                                                 onNextPressed = { this.onNextPressed }
                            />
                        </SafeAreaView>
                    )
                }
            } else {
                return (<View/>)
            }
        } else {
            return (<View/>)
        }
    }
}
