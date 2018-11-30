import React, { PureComponent } from "react"
import { Alert, LayoutAnimation, UIManager, Platform, BackHandler } from "react-native"
import { addProduct, canAddProduct, resetCart } from "../../database/specialization/StorageCart"
import { getProduct } from "../../database/specialization/StorageProduct"
import { getOrderType } from "../../database/specialization/StorageGeneral"
import { GENERAL_STRINGS, PRODUCT_CONTAINER_STRINGS } from "../../languages/index"
import { connect } from "react-redux"
import { totalCart, updateItemCurrentCartCheck, setUnityId } from "../../redux/actions"
import * as Errors from "../../errors"
import ProductDetailComponent from "./ProductDetailComponent"
import { ExternalMethods } from "../../native/Functions"
import { FirebaseActions } from "../../utils"

class ProductDetailController extends PureComponent {

    constructor(props) {
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            unity: this.props.unity,
            product: this.props.product,
            total: this.props.product.totalValue,
            observation: !!this.props.product.observation ? this.props.product.observation : "",
            quantity: 1,
            canAdd: true,
            isDiscountsClubMode: this.props.isDiscountsClubMode
        }

        this.onPlusPressed = this._onPlusPressed.bind(this)
        this.onMinusPressed = this._onMinusPressed.bind(this)
        this.onAddInCartPressed = this._onAddInCartPressed.bind(this)
        this.onObservationChange = this._onObservationChange.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.PRODUCT_DETAIL.screen)
        BackHandler.addEventListener("hardwareBackPress", this._handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this._handleBackButton)
    }

    _handleBackButton = () => {
        this.props.navigation.goBack()
        return true
    }

    _onPlusPressed() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.PRODUCT_DETAIL.actions.ADD, { id: this.state.product.id, product: this.state.product.desc })
        if (this.state.quantity >= 99) {
            return
        }

        let quantity = this.state.quantity + 1
        let total = quantity * this.state.product.totalValue

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        this.setState({
            quantity: quantity,
            total: total
        })
    }

    _onMinusPressed(){
        ExternalMethods.registerFirebaseEvent(FirebaseActions.PRODUCT_DETAIL.actions.REMOVE, { id: this.state.product.id, product: this.state.product.desc })
        if (this.state.quantity > 1){
            let quantity = this.state.quantity - 1
            let total = quantity * this.state.product.totalValue

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            this.setState({
                quantity: quantity,
                total: total
            })
        }
    }

    _onObservationChange(text) {
        this.setState({
            observation: text
        })
    }

    _onAddInCartPressed() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.PRODUCT_DETAIL.actions.ADD_CART, { id: this.state.product.id, product: this.state.product.desc })
        if (this.props.isCheckMode) {
            this.addProductToCart()
        } else {
            getOrderType((error, orderTypeList) => {
                if (error) {
                    return
                } else {
                    canAddProduct(this.state.unity.id, orderTypeList, (error, success) => {
                        if (success) {
                            this.addProductToCart()
                        } else {
                            if (error instanceof Errors.AddProductDifferentOrderTypeException) {
                                this._showAlertToResetCartAndAddProduct(error)
                            } else if (error instanceof Errors.AddProductDifferentUnityException) {
                                this._showAlertToResetCartAndAddProduct(error)
                            } else {
                                return
                            }
                        }
                    })
                }
            })
        }
    }

    _showAlertToResetCartAndAddProduct(error) {
        Alert.alert(
            error.title,
            error.message,
            [
                {text: PRODUCT_CONTAINER_STRINGS.buttonAddProduct, style: "cancel", onPress: () => {
                    resetCart((error) => {
                        if (!error) {
                            this.addProductToCart()
                        }
                    })
                }},
                {text: PRODUCT_CONTAINER_STRINGS.buttonCloseAlert, onPress: () => {
                        this.setState({
                            canAdd: true
                        })
                }}
            ]
        )
    }

    addProductToCart() {
        this.setState({
            canAdd: false
        })

        let product = this.state.product
        product.price = product.totalValue
        product.quantity = this.state.quantity
        product.total = this.state.total
        product.subItems = product.modifiers
        product.subItemsText = product.modifiersText
        product.observation = this.state.observation

        if (this.props.isCheckMode) {
            this.props.updateItemCurrentCartCheck(product, false)
            if (this.state.isDiscountsClubMode) {
                this.props.setUnityId(this.state.unity.id)
                this.props.goBack(true, "NewUnityDetailContainer")
            } else {
                this.props.goBack()
            }
        } else {
            getOrderType((error, orderTypeList) => {
                if (error) {
                    return
                } else {
                    addProduct(product, this.state.unity, orderTypeList, (error, data) => {
                        this.props.totalCart(this.props.quantity + 1)
                        if (this.state.isDiscountsClubMode) {
                            this.props.setUnityId(this.state.unity.id)
                            this.props.goBack(true, "NewUnityDetailContainer")
                        } else {
                            this.props.goBack()
                        }
                    })
                }
            })
        }
    }

    render() {
        return (
            <ProductDetailComponent canAdd = { this.state.canAdd }
                                    image = { !!this.state.product ? this.state.product.image : "" }
                                    description = { !!this.state.product ? this.state.product.desc : ""}
                                    observation = { this.state.observation }
                                    modifiersText = { !!this.state.product ? this.state.product.modifiersText : ""}
                                    price = { !!this.state.product ? this.state.product.totalValue : 0}
                                    quantity = { this.state.quantity }
                                    total = { this.state.total }
                                    onPlusPressed = { this.onPlusPressed }
                                    onMinusPressed = { this.onMinusPressed }
                                    onAddInCartPressed = { this.onAddInCartPressed }
                                    onObservationChange = { this.onObservationChange }
            />
        )
    }
}

export default connect(
    state => ({
        quantity: state.cart.quantity,
        isCheckMode: !!state.check.checkNumber && state.check.checkNumber != 0,
        isDiscountsClubMode: state.general.isDiscountsClubMode
    }),
    { totalCart, updateItemCurrentCartCheck, setUnityId }
)(ProductDetailController)
