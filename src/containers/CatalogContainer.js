import React, { PureComponent } from "react"
import CatalogController from "../components/catalog/CatalogController"
import ModifierContainer from "../containers/ModifierContainer"
import { resetModifiersSelected, getModifiersSelected, updateModifiersSelected } from "../database/specialization/StorageModifiers"

export default class CatalogContainer extends PureComponent {

    navigateToDetail(product, unity) {
        if (product.productVariations.length > 0) {
            resetModifiersSelected((error) => {
                if (!error) {
                    this.updateModifersAndGoToChooseModifier(product, unity)
                }
            })
        } else {
            this.props.navigation.navigate("ProductDetailContainer",{ product: product, unity: unity, navigation:this.props.navigation, catalogNavigationKey: null})
        }
    }

    updateModifersAndGoToChooseModifier(product, unity) {
        getModifiersSelected((errorGet, modifiers) => {
            var newModifiers = modifiers ? modifiers : {}
            newModifiers.product = product
            newModifiers.unity = unity
            newModifiers.steps = []

            updateModifiersSelected(newModifiers, (errorUpdate, data) => {
                if (!errorUpdate){
                    this.props.navigation.navigate("ModifierContainerEven",{ product: product, unity: unity, catalogNavigationKey: null, nextScreen: "Odd" })
                }
            })
        })
    }

    render() {
        return (
            <CatalogController ref = { ref => (this.catalogController = ref) }
                               navigateToDetail = { this.navigateToDetail.bind(this) }
                               unityDetails = { this.props.unityDetails }
            />
        )
    }
}
