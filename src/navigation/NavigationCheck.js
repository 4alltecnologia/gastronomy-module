import React from "react"
import { StackNavigator, NavigationActions } from "react-navigation"
import { CHECK_PAYMENT_CONTAINER_STRINGS, CHECK_SUCCESS_CONTAINER_STRINGS, GENERAL_STRINGS } from "../languages"
import ProductDetailContainer from "../containers/ProductDetailContainer"
import NewUnityDetailContainer from "../containers/NewUnityDetailContainer"
import UnityInfoContainer from "../containers/UnityInfoContainer"
import ModifierContainer from "../containers/ModifierContainer"
import CheckInitialContainer from "../containers/CheckInitialContainer"
import CheckProductListContainer from "../containers/CheckProductListContainer"
import CheckPaymentContainer from "../containers/CheckPaymentContainer"
import CheckSuccessContainer from "../containers/CheckSuccessContainer"
import NavigationHeader from "./header/NavigationHeader"
import { NavigationBackground, NavigationLeftButton, NavigationRightButton, NavigationTitleView } from "../utils"

const navigateOnce = (getStateForAction) => (action, state) => {
    const { type, routeName } = action
    return (
        state &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
}

export const CheckStack = ({ initialRouteName, screenProps }) => {
    const CheckNavigator = StackNavigator({
        CheckInitialContainer: {
            screen: CheckInitialContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { GENERAL_STRINGS.loading }
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
                                      rightButton = { NavigationRightButton.CHECK }
                                      customTitle = { navigation.state.params ? navigation.state.params.title : "" } //UNITY NAME
                                      shouldCloseModule = { true }
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
        CheckProductListContainer: {
            screen: CheckProductListContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { navigation.state.params ? navigation.state.params.title : "" } //CHECK NAME
                                      shouldCloseModule = { true }
                    />
                )
            })
        },
        CheckPaymentContainer: {
            screen: CheckPaymentContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { CHECK_PAYMENT_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        CheckSuccessContainer: {
            screen: CheckSuccessContainer,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { CHECK_SUCCESS_CONTAINER_STRINGS.title }
                                      hideMainBackButton = { true }
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
                                      customTitle = { navigation.state.params ? navigation.state.params.title : "" } //MODIFIER NAME
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
                                      customTitle = { navigation.state.params ? navigation.state.params.title : "" } //MODIFIER NAME
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
        }
    }, { initialRouteName,
        headerMode: "screen",
        navigationOptions: {
            gesturesEnabled: false
        }
    })

    CheckNavigator.router.getStateForAction = navigateOnce(CheckNavigator.router.getStateForAction)

    return <CheckNavigator/>
}