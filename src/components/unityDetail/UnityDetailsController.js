import React, { PureComponent } from "react"
import { Animated, View, ScrollView, Text, StyleSheet, Alert, Modal, LayoutAnimation, UIManager, Platform } from "react-native"
import { BackgroundColor } from "../../theme/Theme"
import { getUnityMedia, MediaTypes, getDistanceFromLatLonInKm, IdOrderType, FirebaseActions } from "../../utils"
import UnityHeaderComponent from "./UnityHeaderComponent"
import NewCatalogComponent from "../catalog/NewCatalogComponent"
import UnityInfoController from "../unityInfo/UnityInfoController"
import NoInternetWarning from "../../components/messages/NoInternetWarning"
import Spinner from "../../libs/customSpinner"
import FloatButton from "../floatButton/FloatButton"
import CheckBar from "../check/CheckBar"
import { OptionsModal } from "../../components/SelectGenericItemListComponent"
import { GENERAL_STRINGS } from "../../languages/index"
import { getOrderType } from "../../database/specialization/StorageGeneral"
import { saveProduct } from "../../database/specialization/StorageProduct"
import { parseSubItems } from "../../database/specialization/StorageCart"
import { getModifiersSelected, updateModifiersSelected, resetModifiersSelected } from "../../database/specialization/StorageModifiers"
import { getUnityCatalog, addItemsCheck } from "../../api/APIRequests"
import { BASE_URL_IMAGE } from "../../api/APIConfiguration"
import { ExternalMethods } from "../../native/Functions"
import { connect } from "react-redux"
import { totalCart, setCurrentCartCheck, updateItemCurrentCartCheck } from "../../redux/actions"
import ModalTableNumberController from "../check/modalTableNumber/ModalTableNumberController"
import ModalSuccessAlertController from "../check/modalSuccessAlert/ModalSuccessAlertController"
import UnityService from "../../api/services/UnityService"
import * as Errors from "../../errors"
import User from "../../models/User"

class UnityDetailsController extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            flexDirection: "column"
        },
        mainContainer: {
            flex: 1,
            backgroundColor: "white"
        },
        overlay: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgb(0,0,0)",
            opacity: 0.9,
            zIndex: 10
        }
    })

    stylesText = StyleSheet.create({
        itemList: {
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 10,
            fontSize: 18,
            textAlign: "left",
            alignItems: "center",
            justifyContent: "center"
        }
    })

    stylesImage = StyleSheet.create({
        iconArrow: {
            height: 18,
            width: 20,
            resizeMode: "contain",
            tintColor: BackgroundColor.primary
        },
        iconArrowFilled: {
            height: 18,
            width: 20,
            resizeMode: "contain",
            tintColor: "rgb(51,51,51)"
        }
    })

    constructor(props) {
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            unity: null,
            isLoading: true,
            isShowingModal: false,
            isCheckMode: props.isCheckMode, //redux
            showFloatButton: false,
            showMenu: true,
            showUnityHeaderWithInfo: props.showUnityHeaderWithInfo, //redux
            isOrderTypeOutdoor: true,
            distanceKm: props.distanceKm,
            userLatitude: props.userLatitude,
            userLongitude: props.userLongitude,
            catalogListHeight: 0,
            isLogged: false,
            showOverlay: false,
            opacity: new Animated.Value(0),
            modalTableNumberVisible: false,
            modalSuccessAlertVisible: false
        }

        this.onSelectCategory = this._onSelectCategory.bind(this)
        this.onShouldShowFloatButton = this._onShouldShowFloatButton.bind(this)
        this.onShowModal = this._onShowModal.bind(this)
        this.onShowInformation = this._onShowInformation.bind(this)
        this.onTapFloatButton = this._onTapFloatButton.bind(this)
        this.onSelectProduct = this._onSelectProduct.bind(this)
        this.actionCheckButton = this._actionCheckButton.bind(this)
        this.showOverlay = this._showOverlay.bind(this)
        this.setTableNumberModalVisible = this._setTableNumberModalVisible.bind(this)
        this.setSuccessAlertModalVisible = this._setSuccessAlertModalVisible.bind(this)
        this.addProduct = this._addProduct.bind(this)
        this.removeProduct = this._removeProduct.bind(this)
    }

    componentDidMount() {
        ExternalMethods.registerFirebaseScreen(FirebaseActions.UNITY_DETAIL.screen)

        this.props.navigation.addListener("willFocus", payload => {
            ExternalMethods.registerFirebaseScreen(FirebaseActions.UNITY_DETAIL.screen)
        })

        ExternalMethods.hasUserLogged((isLogged) => {
            this.setState({
                isLogged: isLogged
            }, () => this._getUnityDetails() )
        })
    }

    _refreshUnityDetails() {
        this._getUnityDetails()
    }

    _getUnityDetails() {
        Promise.all([UnityService.getUnityDetails(this.props.unityId),
                     UnityService.getUnityCatalog(this.props.unityId)]).then(responses => {
            getOrderType((error, orderTypeList) => {
                if (error) {
                    return
                }
                let isOrderTypeOutdoor = orderTypeList.filter(element => element === IdOrderType.DELIVERY.id).length > 0

                const unity = responses[0]
                const catalog = responses[1]

                var distanceKmAux = this.state.distanceKm
                if (distanceKmAux == null && this.state.userLatitude && this.state.userLongitude) {
                    distanceKmAux = getDistanceFromLatLonInKm(this.state.userLatitude, this.state.userLongitude, unity.latitude, unity.longitude) + "km"
                }

                this.setState({
                    isLoading: false,
                    error: null,
                    unity: unity,
                    isOrderTypeOutdoor: isOrderTypeOutdoor,
                    distanceKm: distanceKmAux,
                    listCategory: catalog.categories,
                    listOffers: catalog.productsOnSale,
                    showFloatButton: catalog.productsOnSale.length == 0 ? true : false
                }, () => this.props.setUnityName(unity.name))
            })
        }).catch(error => {
            this.setState({
                isLoading: false,
                error: error,
                listCategory: [],
                listOffers: [],
                showFloatButton: false
            })
        })
    }

    _onShowInformation() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.SHOW_INFO, {})

        this.props.navigation.navigate("UnityInfoContainer", { unity: this.state.unity })
    }

    _onShouldShowFloatButton(value) {
        this.setState({
            showFloatButton: value
        })
    }

    _onTapFloatButton() {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.FLOAT_BUTTON, {})

        this.setState({
            isShowingModal: true
        })
    }

    _onShowModal(value) {
        this.setState({
            isShowingModal: value
        })
    }

    _onSelectCategory(item, index) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.FLOAT_BUTTON_CATEGORY, { categoryName: item.name })
        var scrollPosition = 0
        scrollPosition += this.state.showUnityHeaderWithInfo ? 208 : 148 //UnityHeader height
        scrollPosition += this.state.listOffers.length > 0 ? 64 : 0 //TabHeader height

        for (i = 0; i < index; i++) {
            scrollPosition = scrollPosition + (this.state.listCategory[i].data.length * 128) //CatalogCell height
            scrollPosition += 40 //CatalogSectionHeader height
        }

        this.setState({
            isShowingModal: false
        }, () => this.scrollViewRef.scrollTo({
            y: scrollPosition,
            animated: true
        }))
    }

    _onSelectProduct(product) {
        if (!this.props.isCheckMode || (product.productVariations && product.productVariations.length > 0)) {
            ExternalMethods.registerFirebaseEvent(this.state.showFloatButton ? FirebaseActions.UNITY_DETAIL.actions.CATALOG_PRODUCT : FirebaseActions.UNITY_DETAIL.actions.OFFER_PRODUCT, {})
            if ((this.state.isOrderTypeOutdoor && !this.state.unity.outdoorOpened) || (!this.state.isOrderTypeOutdoor && !this.state.unity.indoorOpened)) {
                Alert.alert(
                    GENERAL_STRINGS.warning,
                    GENERAL_STRINGS.unityClosed,
                    [{
                        text: GENERAL_STRINGS.ok,
                        style: "cancel"
                    }],
                    { cancelable: false }
                )
            } else {
                saveProduct(product, (error, storageProduct) => {
                    if (!error) {
                        this._navigateToDetail(storageProduct)
                    } else {
                        Alert.alert(GENERAL_STRINGS.alertErrorTitle, GENERAL_STRINGS.alertErrorMessage)
                    }
                })
            }
        }
    }

    _navigateToDetail(product) {
        if (product.productVariations.length > 0) {
            resetModifiersSelected((error) => {
                if (!error) {
                    this._updateModifersAndGoToChooseModifier(product)
                }
            })
        } else {
            this.props.navigateTo("ProductDetailContainer", product, this.state.unity)
        }
    }

    _updateModifersAndGoToChooseModifier(product) {
        getModifiersSelected((errorGet, modifiers) => {
            var newModifiers = modifiers ? modifiers : {}
            newModifiers.product = product
            newModifiers.unity = this.state.unity
            newModifiers.steps = []

            updateModifiersSelected(newModifiers, (errorUpdate, data) => {
                if (!errorUpdate){
                    this.props.navigateTo("ModifierContainerEven", product, this.state.unity)
                }
            })
        })
    }

    _actionCheckButton(hasTableNumber) {
        if (!this.state.isLogged) {
            ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.CHECK_BAR_LOGIN, {})
            ExternalMethods.startLogin((user) => {
                ExternalMethods.registerFirebaseUser(new User(user))
                this.setState({
                    isLogged: !!user
                })
            })
        } else if (this.props.currentCartItemCount == 0) {
            Alert.alert(
                GENERAL_STRINGS.warning,
                GENERAL_STRINGS.emptyCheck,
                [{
                    text: GENERAL_STRINGS.ok, style: "cancel", onPress: () => {
                        this.setState({
                            isLoading: false
                        })
                    }
                }],
                {cancelable: false}
            )
        } else if (hasTableNumber) {
            ExternalMethods.getUserLogged((error, resultUserLogged) => {
                if (!!error) {
                    ExternalMethods.startLogin((user) => {
                        ExternalMethods.registerFirebaseUser(new User(user))
                        this.setState({
                            isLogged: !!user
                        }, () => this._actionCheckButton(false))
                    })
                } else {
                    this.setState({
                        isLoading: true
                    })
                    var orderItems = []

                    this.props.currentCart.map(product => {
                        var newProduct = {
                            idUnityItem: product.id,
                            quantity: product.quantity,
                            itemPrice: product.price,
                            discount: 0,
                            observation: product.observation,
                            subItems: parseSubItems(product.subItems)
                        }
                        orderItems.push(newProduct)
                    })

                    addItemsCheck(this.props.orderId, this.props.tableNumber, orderItems, resultUserLogged.sessionToken).then(response => {
                        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.CHECK_BAR_ORDER, { orderId: this.props.orderId, tableNumber: this.props.tableNumber, orderItems: orderItems })
                        this.props.totalCart(this.props.currentCartItemCount + this.props.quantityCart)
                        this.props.setCurrentCartCheck([])

                        this.setState({
                            isLoading: false
                        }, this.setSuccessAlertModalVisible())
                    }).catch((error) => {
                        Alert.alert(
                            GENERAL_STRINGS.warning,
                            !!error && !!error.data && !!error.data.message ? error.data.message : GENERAL_STRINGS.alertErrorMessage,
                            [{
                                text: GENERAL_STRINGS.ok, style: "cancel", onPress: () => {
                                    this.setState({
                                        isLoading: false
                                    })
                                }
                            }],
                            {cancelable: false}
                        )
                    })
                }
            })
        } else {
            this.setTableNumberModalVisible()
        }
    }

    _setTableNumberModalVisible() {
        this.setState({
            modalTableNumberVisible: !this.state.modalTableNumberVisible
        })
    }

    _setSuccessAlertModalVisible() {
        this.setState({
            modalSuccessAlertVisible: !this.state.modalSuccessAlertVisible
        })
    }

    _showOverlay(){
        var willShow = !this.state.showOverlay
        if (willShow){
            this.setState({
                showOverlay: true
            }, () => {
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue: 0.9,
                        duration: 500
                    }
                ).start()
            })
        } else {
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start(() => {
                this.setState({
                    showOverlay: false
                })
            })
        }
    }

    _addProduct(item) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.CHECK_PRODUCT_ADD, {})
        item.quantity = (item.quantity) ? (item.quantity < 99 ? item.quantity + 1 : 99) : 1
        this.props.updateItemCurrentCartCheck(item, true)
    }

    _removeProduct(item) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.CHECK_PRODUCT_REMOVE, {})
        item.quantity--
        this.props.updateItemCurrentCartCheck(item, true)
    }

    _renderError() {
        if (this.state.error instanceof Errors.ConnectionException) {
            return (
                <NoInternetWarning tryInternet = { () => this._refreshUnityDetails() }/>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner visible = { true } size = { 115 }/>
            )
        } else if (!!this.state.error) {
            return (
                this._renderError()
            )
        } else {
            return (
                <View style = { this.stylesView.general }>
                    <View style = { this.stylesView.mainContainer }>
                        <OptionsModal accessibilityLabel = "dropdownMenu"
                                      itemListStyle = { this.stylesText.itemList }
                                      options = { this.state.listCategory }
                                      animationType = "fade"
                                      onSelect = { this.onSelectCategory }
                                      onShow = { this.onShowModal }
                                      isShowingOptions = { this.state.isShowingModal }
                        />
                        { this.state.showMenu && this.state.showFloatButton ?
                            <FloatButton topPosition = { this.state.showUnityHeaderWithInfo ? 208 : 154 }
                                         onTapFloatButton = { this.onTapFloatButton }
                            />
                            : null }
                        <ScrollView ref = { ref => (this.scrollViewRef = ref )} style = { this.stylesView.general } accessibilityLabel = "scrollViewUnityDetail">
                            <UnityHeaderComponent unityName={this.state.unity.name}
                                                  unityImage={getUnityMedia(MediaTypes.THUMB, this.state.unity.media)}
                                                  unityDistance={this.state.distanceKm}
                                                  isUnityOpen={this.state.isOrderTypeOutdoor ? this.state.unity.outdoorOpened : this.state.unity.indoorOpened}
                                                  showMenu={this.state.showMenu}
                                                  showUnityInformation={this.state.showUnityHeaderWithInfo}
                                                  onShowInformation={this.onShowInformation}
                            />
                            { this.state.showMenu ?
                                <NewCatalogComponent listCategory = { this.state.listCategory }
                                                     listOffers = { this.state.listOffers }
                                                     onShouldShowFloatButton = { this.onShouldShowFloatButton }
                                                     onSelectProduct = { this.onSelectProduct }
                                                     addProduct = { this.addProduct }
                                                     removeProduct = { this.removeProduct }
                                />
                                : <UnityInfoController unity = { this.state.unity }/>
                            }
                        </ScrollView>
                    </View>
                    {this.state.isCheckMode ?
                        <CheckBar isLogged={this.state.isLogged}
                                  showOverlay={this.showOverlay}
                                  actionCheckButton={this.actionCheckButton}
                                  setTableNumberModalVisible={this.setTableNumberModalVisible}
                                  addProduct = { this.addProduct }
                                  removeProduct = { this.removeProduct }
                        />
                        : null
                    }
                    <Modal animationType="slide"
                           transparent={true}
                           visible={this.state.modalTableNumberVisible}
                           onRequestClose={() => {}}>
                        <ModalTableNumberController
                            actionCheckButton={this.actionCheckButton}
                            setTableNumberModalVisible={this.setTableNumberModalVisible}
                        />
                    </Modal>
                    <Modal animationType="slide"
                           transparent={true}
                           visible={this.state.modalSuccessAlertVisible}
                           onRequestClose={() => {}}>
                        <ModalSuccessAlertController
                            actionCheckButton={this.actionCheckButton}
                            setSuccessAlertModalVisible={this.setSuccessAlertModalVisible}
                        />
                    </Modal>
                    {this.state.showOverlay ?
                        <Animated.View style={[this.stylesView.overlay, {opacity: this.state.opacity}]}/>
                        : null
                    }
                </View>
            )
        }
    }
}

export default connect(
    state => ({
        checkNumber: state.check.checkNumber,
        checkUnity: state.check.checkUnity,
        orderId: state.check.orderId,
        tableNumber: state.check.tableNumber,
        currentCart: state.check.currentCart,
        quantityCart: state.cart.quantity,
        currentCartItemCount: state.check.currentCartItemCount,
        isCheckMode: state.general.isCheckMode,
        showUnityHeaderWithInfo: state.general.shouldShowUnityHeaderWithInfo,
        unityId: state.general.unityId
    }),
    { totalCart, setCurrentCartCheck, updateItemCurrentCartCheck }
) ( UnityDetailsController )