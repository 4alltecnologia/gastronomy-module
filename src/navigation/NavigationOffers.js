import React from "react"
import { StackNavigator, NavigationActions } from "react-navigation"
import { NavigationBackground, NavigationLeftButton, NavigationRightButton, NavigationTitleView } from "../utils"
import {
    ADDRESS_LIST_CONTAINER_STRINGS,
    ADDRESS_SEARCH_CONTAINER_STRINGS,
    ADDRESS_DETAILS_CONTAINER_STRINGS,
    PAYMENT_CONTAINER_STRINGS,
    ORDER_HISTORY_CONTAINER_STRINGS,
    CART_CONTAINER_STRINGS,
    OFFERS_CONTAINER_STRINGS,
    SUCCESS_CONTAINER_STRINGS,
    GENERAL_STRINGS
} from "../languages"
import NavigationHeader from "./NavigationHeader"
import AddressListController from "../containers/addressList/AddressListController"
import AddressSearchController from "../containers/addressSearch/AddressSearchController"
import AddressDetailsController from "../containers/addressDetails/AddressDetailsController"
import SuccessContainer from "../containers/SuccessContainer"
import ProductDetailContainer from "../containers/ProductDetailContainer"
import CartContainer from "../containers/CartContainer"
import PaymentContainer from "../containers/PaymentContainer"
import UnityListContainer from "../containers/UnityListContainer"
import NewUnityDetailContainer from "../containers/NewUnityDetailContainer"
import ModifierContainer from "../containers/ModifierContainer"
import OrderHistoryListContainer from "../containers/OrderHistoryListContainer"
import OffersContainer from "../containers/OffersContainer"

const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action
    return (
        state &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
}

export const OffersStack = ({ initialRouteName, screenProps }) => {
    const OffersStackNavigator = StackNavigator({
        OffersContainer: {
            screen: ({ navigation }) => <OffersContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { OFFERS_CONTAINER_STRINGS.title }
                                      hideMainBackButton = { true }
                    />
                )
            })
        },
        NewUnityDetailContainer: {
            screen: ({ navigation }) => <NewUnityDetailContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { !!navigation.state.params ? navigation.state.params.title : "" } //UNITY NAME
                                      shouldResetStackTo = { "OffersContainer" }
                    />
                )
            })
        },
        AddressList: {
            screen: ({ navigation }) => <AddressListController navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { ADDRESS_LIST_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        AddressSearch: {
            screen: ({ navigation }) => <AddressSearchController navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { ADDRESS_SEARCH_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        AddressDetails: {
            screen: ({ navigation }) => <AddressDetailsController navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { ADDRESS_DETAILS_CONTAINER_STRINGS.title }
                                      hideMainBackButton = { true }
                    />
                )
            })
        },
        SuccessContainer: {
            screen: ({ navigation }) => <SuccessContainer navigation = { navigation } mainContainer = { "OffersContainer" }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { SUCCESS_CONTAINER_STRINGS.title }
                                      hideMainBackButton = { true }
                    />
                )
            })
        },
        PaymentContainer: {
            screen: ({ navigation }) => <PaymentContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { PAYMENT_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        ProductDetailContainer: {
            screen: ({ navigation }) => <ProductDetailContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { !!navigation.state.params.product.name ? navigation.state.params.product.name : "" } //PRODUCT NAME
                                      navigationBackground = { !!navigation.state.params.product.image ? NavigationBackground.TRANSPARENT : navigation.state.params.navigationBackground } //NAVIGATION HEADER BACKGROUND
                    />
                )
            })
        },
        CartContainer: {
            screen: ({ navigation }) => <CartContainer navigation = {navigation}/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { CART_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        OrderHistoryListContainer: {
            screen: ({ navigation }) => <OrderHistoryListContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { ORDER_HISTORY_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        ModifierContainerEven:{
            screen: ({ navigation }) => <ModifierContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { !!navigation.state.params ? navigation.state.params.title : "" } //MODIFIER NAME
                    />
                )
            })
        },
        ModifierContainerOdd:{
            screen: ({ navigation }) => <ModifierContainer navigation = { navigation }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { !!navigation.state.params ? navigation.state.params.title : "" } //MODIFIER NAME
                    />
                )
            })
        }
    }, { initialRouteName,
        headerMode: "screen",
        navigationOptions: {
            gesturesEnabled: false
        }
    })

    OffersStackNavigator.router.getStateForAction = navigateOnce(OffersStackNavigator.router.getStateForAction)

    return <OffersStackNavigator/>
}