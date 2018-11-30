import React, { PureComponent } from "react"
import { View, ScrollView, ActivityIndicator, Text, Alert, StyleSheet, LayoutAnimation, UIManager, Platform } from "react-native"
import UnityInformationComponent from "./UnityInformationComponent"
import ListProducts from "./ListProductsComponent"
import Address from "./AddressCartComponent"
import PayCart from "./PayCartComponent"
import LoginUserComponent from "./LoginUserComponent"
import SelectAddressComponent from "./SelectAddressComponent"
import IndoorDeliveryComponent from "./IndoorDeliveryComponent"
import AddressListModal from "../addressList/AddressListModal"
import { plusProduct, removeProduct, getCart, setField } from "../../database/specialization/StorageCart"
import { checkDeliveryFee } from "../../api/APIRequests"
import { ExternalMethods } from "../../native/Functions"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS, LOGIN_USER_COMPONENT_STRINGS as LoginStrings } from "../../languages/index"
import { getUnityMedia, MediaTypes, IdOrderType, FirebaseActions } from "../../utils"
import { connect } from "react-redux"
import { totalCart, setCurrentAddress, setUnityId } from "../../redux/actions"
import User from "../../models/User"

class CartController extends PureComponent {

    stylesView = StyleSheet.create({
        noProducts: {
            flex:1,
            backgroundColor:"#FFFFFF",
            alignItems:"center",
            justifyContent:"center"
        },
        content: {
            flex:1,
            backgroundColor:"#FFFFFF"
        },
        scrollview: {
            backgroundColor: "white"
        },
        userLoggedIn: {
            flexGrow: 1
        }
    })

    stylesActivity = StyleSheet.create({
        content: {
            flex:1
        }
    })

    constructor(props){
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            nameUnity: "",
            logoUnity: "",
            idUnity: "",
            products: [],
            subtotal: 0,
            total: 0,
            deliveryFee: 0,
            isLoadingDeliveryFee: true,
            deliveryEstimatedTime: 0,
            isUserLoggedIn: false,
            currentOrderType: [],
            isOutdoorDelivery: false,
            deliveryMethod: null,
            validAddress: true,
            showModalAddress: false
        }

        this.onNavigateToUnity = this._onNavigateToUnity.bind(this)
        this.changeAddress = this._changeAddress.bind(this)
        this.closeModalAddress = this._closeModalAddress.bind(this)
    }

    _onNavigateToUnity() {
        this.props.setUnityId(this.state.idUnity)
        this.props.navigation.navigate("NewUnityDetailContainer")
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.CART.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.CART.screen)
            ExternalMethods.hasUserLogged((isLogged) => {
                this.setState({
                    isUserLoggedIn: isLogged,
                    validAddress: false
                }, this.getCartData())
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quantity === this.props.quantity) {
            this.setState({
                isLoadingDeliveryFee: true
            }, () => this.getCartData())
        }
    }

    getCartData() {
        getCart((error, data) => {
            if (error || !data || data.total === 0) {
                this.setState({
                    isLoadingDeliveryFee: false,
                    products:[]
                })
                return
            }

            let unityData = {
                idUnity: 0,
                nameUnity: "",
                logoUnity: "",
                deliveryEstimatedTime: 0,
                deliveryEstimatedIdUnitTime: 1,
                takeAwayEstimatedTime: 0,
                takeAwayEstimatedIdUnitTime: 1
            }

            unityData.indoorDeliveryMethods = []

            if (!!data.unity) {
                data.unity.hasMenuTakeAway && data.idOrderType.includes(IdOrderType.TAKEAWAY.id) ? unityData.indoorDeliveryMethods.push(IdOrderType.TAKEAWAY.id) : null
                data.unity.hasMenuShortDelivery && data.idOrderType.includes(IdOrderType.SHORTDELIVERY.id) ? unityData.indoorDeliveryMethods.push(IdOrderType.SHORTDELIVERY.id) : null
                data.unity.hasMenuVoucher && data.idOrderType.includes(IdOrderType.VOUCHER.id) ? unityData.indoorDeliveryMethods.push(IdOrderType.VOUCHER.id) : null

                unityData.logoUnity = getUnityMedia(MediaTypes.LOGO, data.unity.media)
                unityData.nameUnity = data.unity.name
                unityData.idUnity = data.unity.id
                unityData.deliveryEstimatedTime = data.unity.deliveryEstimatedTime
                unityData.deliveryEstimatedIdUnitTime = data.unity.deliveryEstimatedIdUnitTime
                unityData.takeAwayEstimatedTime = data.unity.takeAwayEstimatedTime
                unityData.takeAwayEstimatedIdUnitTime = data.unity.takeAwayEstimatedIdUnitTime
            }

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            this.setState({
                currentOrderTypeList: data.idOrderType,
                isOutdoorDelivery: data.idOrderType.includes(IdOrderType.DELIVERY.id),
                deliveryMethod: data.idOrderType.includes(IdOrderType.DELIVERY.id) ? IdOrderType.DELIVERY.id : null,
                products: data.products,
                subtotal: data.productTotal,
                total: data.total,
                nameUnity: unityData.nameUnity,
                logoUnity: unityData.logoUnity,
                idUnity: unityData.idUnity,
                deliveryEstimatedTime: unityData.deliveryEstimatedTime,
                deliveryEstimatedIdUnitTime: unityData.deliveryEstimatedIdUnitTime,
                takeAwayEstimatedTime: unityData.takeAwayEstimatedTime,
                takeAwayEstimatedIdUnitTime: unityData.takeAwayEstimatedIdUnitTime,
                indoorDeliveryMethods: unityData.indoorDeliveryMethods
            }, () => this.checkDelivery())
        })
    }

    onPlusPressed(productID, idOnCart){
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CART.actions.ADD, { productId: productID })

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        plusProduct(productID, idOnCart, (error, data) => {
            this.props.totalCart(this.props.quantity+1)
            this.setState({
                products:data.products,
                subtotal:data.productTotal,
                total:data.total
            })
        })
    }

    onMinusPressed(productID, idOnCart){
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CART.actions.REMOVE, { productId: productID })

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        removeProduct(productID, idOnCart, (error, data) => {
            this.props.totalCart(this.props.quantity-1)
            if (!error && data) {
                this.setState({
                    products:data.products,
                    subtotal:data.productTotal,
                    total:data.total
                })
            } else {
                this.setState({
                    products:[],
                    subtotal:0,
                    total:0
                }, () => setTimeout(() => this.props.navigation.goBack(), 750))
            }
        })
    }

    signIn() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CART.actions.LOGIN, {})
        ExternalMethods.startLogin((user) => {
            ExternalMethods.registerFirebaseUser(new User(user))

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            this.setState({
                isUserLoggedIn: !!user
            })
        })
    }

    //FIX: THERE'S NO IMPLEMENTATION BY FINTECH SIDE ON WHAT TO DO HERE
    checkCompletedUserData() {
        ExternalMethods.hasUserDataCompleted((success) => {
            this.setState({
                isUserLoggedIn: success
            })
        })
    }

    onSelectIndoorDeliveryMethod(indoorDeliveryMethod) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CART.actions.CHOOSE_INDOOR_METHOD, { indoorDeliveryMethod: indoorDeliveryMethod })
        this.setState({
            deliveryMethod: indoorDeliveryMethod
        })
    }

    checkDelivery(address = null) {
        if (this.state.isOutdoorDelivery && !!this.props.currentAddress && !!this.props.currentAddress.isDefault) {
            this.setState({
                    isLoadingDeliveryFee:true
                }, () =>
                    checkDeliveryFee(this.props.currentAddress.zip, this.props.currentAddress.province, this.props.currentAddress.city, this.props.currentAddress.neighborhood, this.state.idUnity).then(data => {
                        setField([{name:"deliveryFee", value:data.fee},{name:"address", value:this.props.currentAddress}], (error, datasave) => {
                            this.setState({
                                deliveryFee: data.fee,
                                total: datasave.total,
                                isLoadingDeliveryFee: false,
                                validAddress: true
                            })
                        })
                    }).catch(error => {
                        setField([{name:"deliveryFee", value:0},{name:"address", value:null}], (error, datasave) => {
                            this.setState({
                                deliveryFee: 0,
                                validAddress: false,
                                isLoadingDeliveryFee: false,
                                total: datasave.total
                            }, () =>
                                Alert.alert(
                                    GENERAL_STRINGS.warning,
                                    CART_CONTAINER_STRINGS.cartController.addressNotSupported,
                                    [
                                        {text: GENERAL_STRINGS.ok, style: "cancel"}
                                    ],
                                    { cancelable: false }
                                )
                            )
                        })
                    })
            )
        } else {
            setField([{name:"address", value:null}], (error, datasave) => {
                this.setState({
                    isLoadingDeliveryFee: false,
                    deliveryFee: 0,
                    validAddress: false
                })
            })
        }
    }

    choosePaymentMethod() {
        ExternalMethods.hasUserLogged((isLogged) => {
            if (isLogged) {
                getCart((error, cart) => {
                    if (error) {
                        Alert.alert(GENERAL_STRINGS.warning, GENERAL_STRINGS.genericError)
                    } else {
                        ExternalMethods.registerFirebaseEvent(FirebaseActions.CART.actions.CHOOSE_PAYMENT, {})
                        this.props.navigation.navigate("PaymentContainer", { cart : cart, idOrderType: this.state.deliveryMethod })
                    }
                })
            } else {
                this.setState({
                    isUserLoggedIn: isLogged
                }, () => {
                    this.props.setCurrentAddress(null)
                    this.getCartData(isLogged)
                })
            }
        })
    }

    _changeAddress() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.CART.actions.CHANGE_ADDRESS, {})

        this.setState({
            showModalAddress: true
        })
    }

    _closeModalAddress() {
        this.setState({
            showModalAddress: false
        })
    }

    render(){
        if (this.state.isLoadingDeliveryFee == true) {
            return (
                <ActivityIndicator
                    animating = { true }
                    style = {this.stylesActivity.content}
                    size = "large"
                    accessibilityLabel = "activityIndicator"
                />
            )
        } else if (this.state.products.length == 0){
            return (
                <View style={this.stylesView.noProducts} accessibilityLabel="viewNoProducts">
                    <Text accessibilityLabel="text">
                        { CART_CONTAINER_STRINGS.cartController.noProducts }
                    </Text>
                </View>
            )
        } else {
            let canPay = this.state.isOutdoorDelivery ? !!this.props.currentAddress : !!this.state.deliveryMethod

            return (
                <ScrollView style = { this.stylesView.scrollview } accessibilityLabel="scrollView">
                    <View style = { this.stylesView.content } accessibilityLabel="viewContent">
                        <UnityInformationComponent
                            deliveryEstimatedTime = {this.state.deliveryEstimatedTime}
                            deliveryEstimatedIdUnitTime = {this.state.deliveryEstimatedIdUnitTime}
                            takeAwayEstimatedTime = { this.state.takeAwayEstimatedTime }
                            takeAwayEstimatedIdUnitTime = { this.state.takeAwayEstimatedIdUnitTime }
                            deliveryMethod = { this.state.deliveryMethod }
                            unityImage = {this.state.logoUnity}
                            unityName = {this.state.nameUnity}
                            onNavigateToUnity = { this.onNavigateToUnity }
                        />
                        <ListProducts
                            products = { this.state.products }
                            subtotal = { this.state.subtotal }
                            deliveryFee = { this.state.deliveryFee }
                            onPlusPressed = { this.onPlusPressed.bind(this) }
                            onMinusPressed = { this.onMinusPressed.bind(this) }
                        />
                        { !this.state.isOutdoorDelivery ?
                            this.state.isUserLoggedIn ?
                                <View style = { this.stylesView.userLoggedIn }>
                                    <IndoorDeliveryComponent unityIndoorDeliveryMethods = { this.state.indoorDeliveryMethods }
                                                             moduleDeliveryMethods = { true }
                                                             takeAwayEstimatedTime = { this.state.takeAwayEstimatedTime }
                                                             takeAwayEstimatedIdUnitTime = { this.state.takeAwayEstimatedIdUnitTime }
                                                             onSelectIndoorDeliveryMethod = { this.onSelectIndoorDeliveryMethod.bind(this) }/>
                                    <PayCart choosePaymentMethod = { this.choosePaymentMethod.bind(this) }
                                             canPay = { canPay }
                                             total = { this.state.total }
                                             showIndoorDeliveryPrice = { false } //Won't be used yet
                                    />
                                </View>
                                : <LoginUserComponent message = { LoginStrings.messageOrder }
                                                      signIn = { this.signIn.bind(this) }
                                                      shouldShowTopSeparator = { true }
                                />
                            : this.state.isUserLoggedIn && !!this.props.currentAddress && !!this.props.currentAddress.id && this.state.validAddress ?
                                <View style = { this.stylesView.userLoggedIn }>
                                    <Address
                                        address = { this.props.currentAddress }
                                        deliveryEstimatedTime = { this.state.deliveryEstimatedTime }
                                        deliveryEstimatedIdUnitTime = { this.state.deliveryEstimatedIdUnitTime }
                                        deliveryFee = { this.state.deliveryFee }
                                        onSelectAddress = { this.changeAddress }
                                    />
                                    <PayCart
                                        choosePaymentMethod = { this.choosePaymentMethod.bind(this) }
                                        canPay = { canPay }
                                        total = { this.state.total }
                                        showIndoorDeliveryPrice = { false }
                                    />
                                </View>
                                : !this.state.isUserLoggedIn ?
                                    <LoginUserComponent message = { LoginStrings.messageOrder }
                                                        signIn = { this.signIn.bind(this) }
                                                        shouldShowTopSeparator = { true }
                                    />
                                    : <SelectAddressComponent onSelectAddress = { this.changeAddress }
                                                              shouldShowTopSeparator = { true }
                                    />
                        }
                        <AddressListModal navigation = { this.props.navigation }
                                          defaultAddressSelected = { this.closeModalAddress }
                                          showModalAddress = { this.state.showModalAddress }
                                          cameFromCart = { true }/>
                    </View>
                </ScrollView>
            )
        }
    }
}

export default connect(
    state => ({
        quantity: state.cart.quantity,
        currentAddress: state.general.currentAddress
    }),
    { totalCart, setCurrentAddress, setUnityId }
)(CartController)
