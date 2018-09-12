import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView, NavigationActions } from "react-navigation"
import ProductDetailController from "../components/productDetail/ProductDetailController"

export default class ProductDetailContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "rgb(242,242,242)"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            product: this.props.product ? this.props.product : this.props.navigation.state.params.product,
            unity: this.props.unity ? this.props.unity : this.props.navigation.state.params.unity,
            catalogNavigationKey: this.props.navigation.state.params.catalogNavigationKey == null ? this.props.navigation.state.key : this.props.navigation.state.params.catalogNavigationKey
        }

        this.goBack = this._goBack.bind(this)
    }

    _goBack(shouldReset = false, route = null) {
        if (shouldReset) {
            const orderStatusAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: route,
                        params: {
                            distanceKm: this.state.unity.distanceKm
                        }
                    })
                ]
            })

            this.props.navigation.dispatch(orderStatusAction)
        } else {
            this.props.navigation.goBack(this.state.catalogNavigationKey)
        }
    }

    render() {
        return (
            <SafeAreaView style = { this.stylesView.safeArea }>
                <ProductDetailController unity = { this.state.unity }
                                         product = { this.state.product }
                                         navigation = { this.props.navigation }
                                         goBack = { this.goBack }
                />
            </SafeAreaView>
        )
    }
}
