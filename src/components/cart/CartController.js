import React, { PureComponent } from "react"
import { View, ScrollView, ActivityIndicator, Text, Alert, StyleSheet } from "react-native"
import UnityInformationComponent from "./UnityInformationComponent"
import ListProducts from "./ListProductsComponent"
import Address from "./AddressCartComponent"
import PayCart from "./PayCartComponent"
import LoginUserComponent from "./LoginUserComponent"
import SelectAddressComponent from "./SelectAddressComponent"
import IndoorDeliveryComponent from "./IndoorDeliveryComponent"
import { plusProduct, removeProduct, getCart, setField } from "../../database/specialization/StorageCart"
import { getUnity } from "../../database/specialization/StorageUnity"
import { getOrderType } from "../../database/specialization/StorageGeneral"
import { checkDeliveryFee } from "../../api/ApiRequests"
import { ExternalMethods } from "../../native/Functions"
import { GENERAL_STRINGS, CART_CONTAINER_STRINGS, LOGIN_USER_COMPONENT_STRINGS as LoginStrings } from "../../languages/index"
import { getUnityMedia, MediaTypes, IdOrderType } from "../../utils"
import { connect } from "react-redux"
import { totalCart } from "../../redux/actions"

class CartController extends PureComponent {

    stylesView = StyleSheet.create({
        noProducts:{
            flex:1,
            backgroundColor:"#FFFFFF",
            alignItems:"center",
            justifyContent:"center"
        },
        content:{
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
        content:{
            flex:1
        }
    })

    constructor(props){
        super(props)

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
            addressSelected: null,
            isUserLoggedIn: false,
            currentOrderType: [],
            isOutdoorDelivery: false,
            deliveryMethod: null
        }
    }

    componentDidMount() {
        ExternalMethods.hasUserLogged((isLogged) => {
            this.setState({
                isUserLoggedIn: isLogged
            }, this.getCartData(isLogged))
        })
    }

    getCartData(isLogged) {
        getCart((error, data) => {
            if (error || !data) {
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
            }, () => this.checkDelivery(isLogged ? data.address : null))
        })
    }

    onPlusPressed(productID, idOnCart){
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
        removeProduct(productID, idOnCart, (error, data) => {
            this.props.totalCart(this.props.quantity-1)
            if (!error && data){
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
        ExternalMethods.startLogin((loginSuccess) => {
            if (loginSuccess) {
                // this.checkCompletedUserData()
                this.setState({
                    isUserLoggedIn: loginSuccess
                })
            }
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

    onSelectAddress() {
        this.props.navigation.navigate("AddressList", {
            onReceiveAddressSelected:this.onReceiveAddressSelected.bind(this),
            onReceiveAddressRemove:this.onReceiveAddressRemove.bind(this)
        })
    }

    onReceiveAddressSelected(address) {
        this.checkDelivery(address)
    }

    onReceiveAddressRemove(address){
        if (this.state.addressSelected != null && this.state.addressSelected.id == address.id){
            setField([{name:"deliveryFee", value:0},{name:"address", value:null}], (error, datasave) => {
                this.setState({
                    deliveryFee:0,
                    total:datasave.total,
                    isLoadingDeliveryFee:false,
                    addressSelected:null
                })
            })
        }
    }

    onSelectIndoorDeliveryMethod(indoorDeliveryMethod) {
        this.setState({
            deliveryMethod: indoorDeliveryMethod
        })
    }

    checkDelivery(address) {
        if (!!address){
            this.setState({
                isLoadingDeliveryFee:true
            })
            checkDeliveryFee(address.zip, address.province, address.city, address.neighborhood, this.state.idUnity).then(data => {
                setField([{name:"deliveryFee", value:data.fee},{name:"address", value:address}], (error, datasave) => {
                    this.setState({
                        deliveryFee:data.fee,
                        total:datasave.total,
                        isLoadingDeliveryFee:false,
                        addressSelected:address
                    })
                })
            }).catch(error => {
                Alert.alert(
                    GENERAL_STRINGS.warning,
                    CART_CONTAINER_STRINGS.cartController.addressNotSupported,
                    [
                        {text: GENERAL_STRINGS.ok, style: "cancel",  onPress: () => {
                            setField([{name:"deliveryFee", value:0},{name:"address", value:null}], (error, datasave) => {
                                this.setState({
                                    deliveryFee:0,
                                    total:datasave.total,
                                    isLoadingDeliveryFee:false,
                                    addressSelected:null
                                })
                            })
                        }}
                    ]
                )
            })
        } else {
            setField([{name:"address", value:null}], (error, datasave) => {
                this.setState({
                    addressSelected:null,
                    isLoadingDeliveryFee:false
                })
            })
        }
    }

    choosePaymentMethod() {
        getCart((error, cart) => {
            if (error) {
                Alert.alert(GENERAL_STRINGS.warning, GENERAL_STRINGS.genericError)
            } else {
                this.props.navigation.navigate("PaymentContainer", { cart : cart, idOrderType: this.state.deliveryMethod })
            }
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
                    <Text accessibilityLabel="text">{CART_CONTAINER_STRINGS.cartController.noProducts}</Text>
                </View>
            )
        } else {
            let canPay = this.state.isOutdoorDelivery ? !!this.state.addressSelected : !!this.state.deliveryMethod

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
                            : this.state.isUserLoggedIn && !!this.state.addressSelected ?
                                <View style = { this.stylesView.userLoggedIn }>
                                    <Address
                                        address = { this.state.addressSelected }
                                        deliveryEstimatedTime = { this.state.deliveryEstimatedTime }
                                        deliveryEstimatedIdUnitTime = { this.state.deliveryEstimatedIdUnitTime }
                                        deliveryFee = { this.state.deliveryFee }
                                        onSelectAddress = { this.onSelectAddress.bind(this) }
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
                                    : <SelectAddressComponent onSelectAddress = { this.onSelectAddress.bind(this) }
                                                              shouldShowTopSeparator = { true }
                                    />
                        }
                    </View>
                </ScrollView>
            )
        }
    }
}

export default connect(
    state => ({
        quantity: state.cart.quantity
    }),
    { totalCart }
)(CartController)
