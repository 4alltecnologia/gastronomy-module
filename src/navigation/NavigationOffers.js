import React from "react"
import { StackNavigator, NavigationActions } from "react-navigation"
import { NavigationBackground, NavigationLeftButton, NavigationRightButton, NavigationTitleView } from "../utils"
import {
    ADDRESS_LIST_CONTAINER_STRINGS,
    DISCOUNTS_CLUB_CONTAINER_STRINGS,
    PAYMENT_CONTAINER_STRINGS,
    ORDER_HISTORY_CONTAINER_STRINGS,
    CART_CONTAINER_STRINGS,
    OFFERS_CONTAINER_STRINGS,
    SUCCESS_CONTAINER_STRINGS
} from "../languages"
import NavigationHeader from "./header/NavigationHeader"
import AddressListContainer from "../containers/AddressListContainer"
import AddressSearchContainer from "../containers/AddressSearchContainer"
import AddressDetailsContainer from "../containers/AddressDetailsContainer"
import DiscountsClubHomeContainer from "../containers/DiscountsClubHomeContainer"
import DiscountsClubOffersGroupContainer from "../containers/DiscountsClubOffersGroupContainer"
import DiscountsClubOfferDetailsContainer from "../containers/DiscountsClubOfferDetailsContainer"
import DiscountsClubTradesmanListContainer from "../containers/DiscountsClubTradesmanListContainer"
import DiscountsClubTradesmanDetailsContainer from "../containers/DiscountsClubTradesmanDetailsContainer"
import SuccessContainer from "../containers/SuccessContainer"
import ProductDetailContainer from "../containers/ProductDetailContainer"
import CartContainer from "../containers/CartContainer"
import PaymentContainer from "../containers/PaymentContainer"
import UnityListContainer from "../containers/UnityListContainer"
import NewUnityDetailContainer from "../containers/NewUnityDetailContainer"
import UnityInfoContainer from "../containers/UnityInfoContainer"
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
            screen: OffersContainer,
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
            screen: NewUnityDetailContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { !!navigation.state.params ? navigation.state.params.title : "" } //UNITY NAME
                                      shouldResetStackTo = { "DiscountsClubHomeContainer" }
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
                                      customTitle = { !!navigation.state.params.unity.name ? navigation.state.params.unity.name : "" } //PRODUCT NAME
                                      shouldCloseModule = { screenProps.shouldCloseModule && screenProps.shouldUnityCloseModule }
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
        DiscountsClubHomeContainer: {
            screen: ({ navigation }) => <DiscountsClubHomeContainer navigation = { navigation } mainContainer = { screenProps.mainContainer }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
                                      hideMainBackButton = { true }
                    />
                )
            })
        },
        DiscountsClubOffersGroupContainer: {
            screen: DiscountsClubOffersGroupContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        DiscountsClubOfferDetailsContainer: {
            screen: DiscountsClubOfferDetailsContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      navigationBackground = { NavigationBackground.TRANSPARENT }
                                      customTitle = { !!navigation.state.params.title ? navigation.state.params.title : "" } //OFFER NAME
                    />
                )
            })
        },
        DiscountsClubTradesmanListContainer: {
            screen: DiscountsClubTradesmanListContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.ORDERHISTORYANDCART }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        DiscountsClubTradesmanDetailsContainer: {
            screen: DiscountsClubTradesmanDetailsContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      rightButton = { NavigationRightButton.NONE }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
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
            screen: ({ navigation }) => <SuccessContainer navigation = { navigation } mainContainer = { "DiscountsClubHomeContainer" }/>,
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
        ProductDetailContainer: {
            screen: ProductDetailContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { !!navigation.state.params.product && !!navigation.state.params.product.name ? navigation.state.params.product.name : "" } //PRODUCT NAME
                                      navigationBackground = { !!navigation.state.params.product.image ? NavigationBackground.TRANSPARENT : navigation.state.params.navigationBackground } //NAVIGATION HEADER BACKGROUND
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
                    />
                )
            })
        },
        OrderHistoryListContainer: {
            screen: OrderHistoryListContainer,
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
        ModifierContainerOdd:{
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

    OffersStackNavigator.router.getStateForAction = navigateOnce(OffersStackNavigator.router.getStateForAction)

    return <OffersStackNavigator/>
}