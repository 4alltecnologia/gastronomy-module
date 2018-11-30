import React from "react"
import { StackNavigator, NavigationActions } from "react-navigation"
import { NavigationBackground, NavigationLeftButton, NavigationRightButton, NavigationTitleView } from "../utils"
import {
    ADDRESS_LIST_CONTAINER_STRINGS,
    CART_CONTAINER_STRINGS,
    SUCCESS_CONTAINER_STRINGS,
    PAYMENT_CONTAINER_STRINGS,
    ORDER_HISTORY_CONTAINER_STRINGS
} from "../languages"
import NavigationHeader from "./header/NavigationHeader"
import AddressListContainer from "../containers/AddressListContainer"
import AddressSearchContainer from "../containers/AddressSearchContainer"
import AddressDetailsContainer from "../containers/AddressDetailsContainer"
import SuccessContainer from "../containers/SuccessContainer"
import ProductDetailContainer from "../containers/ProductDetailContainer"
import CartContainer from "../containers/CartContainer"
import PaymentContainer from "../containers/PaymentContainer"
import UnityListContainer from "../containers/UnityListContainer"
import NewUnityDetailContainer from "../containers/NewUnityDetailContainer"
import UnityInfoContainer from "../containers/UnityInfoContainer"
import ModifierContainer from "../containers/ModifierContainer"
import OrderHistoryListContainer from "../containers/OrderHistoryListContainer"
import OrderTypeSelectionContainer from "../containers/OrderTypeSelectionContainer"

const navigateOnce = (getStateForAction) => (action, state) => {
    const { type, routeName } = action
    return (
        state &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
}

export const UnityListStack = ({ initialRouteName, screenProps }) => {
    const UnityListNavigator = StackNavigator({
        UnityListContainer: {
            screen: ({ navigation }) => <UnityListContainer navigation = { navigation } screenProps = { screenProps }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { !!screenProps.appName ? screenProps.appName : "" }
                                      shouldCloseModule = { screenProps.shouldCloseModule }
                                      hideMainBackButton = { screenProps.hideMainBackButton }
                    />
                )
            })
        },
        OrderTypeSelectionContainer: {
            screen: OrderTypeSelectionContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { !!screenProps.appName ? screenProps.appName : "" }
                                      shouldCloseModule = { screenProps.shouldCloseModule }
                                      hideMainBackButton = { true }
                    />
                )
            })
        },
        NewUnityDetailContainer: {
            screen: ({ navigation }) => <NewUnityDetailContainer navigation = { navigation } latitude = { screenProps.latitude } longitude = { screenProps.longitude }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { !!navigation.state.params ? navigation.state.params.title : "" } //UNITY NAME
                                      shouldCloseModule = { screenProps.shouldCloseModule && screenProps.shouldUnityCloseModule }
                    />
                )
            })
        },
        UnityInfoContainer: {
            screen: UnityInfoContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.NONE }
                                      customTitle = { !!navigation.state.params.unity.name ? navigation.state.params.unity.name : "" } //UNITY NAME
                                      shouldCloseModule = { screenProps.shouldCloseModule && screenProps.shouldUnityCloseModule }
                    />
                )
            })
        },
        OrderHistoryListContainer: {
            screen: ({ navigation }) => <OrderHistoryListContainer navigation = { navigation } hideButtonNoOrders = { screenProps.hideButtonNoOrders } updateNoOrders = { screenProps.updateNoOrders }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { ORDER_HISTORY_CONTAINER_STRINGS.title }
                                      shouldCloseModule = { screenProps.shouldCloseModule && screenProps.shouldOrderHistoryCloseModule}
                    />
                )
            })
        },
        AddressListContainer: {
            screen: AddressListContainer,
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
        AddressSearchContainer: {
            screen: AddressSearchContainer,
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
        AddressDetailsContainer: {
            screen: AddressDetailsContainer,
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
        SuccessContainer: {
            screen: ({ navigation }) => <SuccessContainer navigation = { navigation } mainContainer = { screenProps.mainContainer }/>,
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
            screen: PaymentContainer,
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
        CartContainer: {
            screen: CartContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { CART_CONTAINER_STRINGS.title }
                                      shouldCloseModule = { screenProps.shouldCloseModule && screenProps.shouldCartCloseModule }
                    />
                )
            })
        },
        ProductDetailContainer: {
            screen: ProductDetailContainer,
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
        ModifierContainerEven: {
            screen: ModifierContainer,
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
        ModifierContainerOdd: {
            screen: ModifierContainer,
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

    UnityListNavigator.router.getStateForAction = navigateOnce(UnityListNavigator.router.getStateForAction)

    return <UnityListNavigator/>
}