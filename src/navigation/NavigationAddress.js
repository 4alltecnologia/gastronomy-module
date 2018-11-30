import React from "react"
import { StackNavigator } from "react-navigation"
import { NavigationLeftButton, NavigationTitleView } from "../utils"
import { DISCOUNTS_CLUB_CONTAINER_STRINGS } from "../languages"
import NavigationHeader from "./header/NavigationHeader"
import AddressListContainer from "../containers/AddressListContainer"
import AddressSearchContainer from "../containers/AddressSearchContainer"
import AddressDetailsContainer from "../containers/AddressDetailsContainer"

const navigateOnce = (getStateForAction) => (action, state) => {
    const { type, routeName } = action
    return (
        state &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
}

export const AddressStack = ({ initialRouteName, screenProps }) => {
    const AddressNavigator = StackNavigator({
        AddressListContainer: {
            screen: ({ navigation }) => <AddressListContainer navigation = { navigation } defaultAddressSelected = { screenProps.defaultAddressSelected }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
                                      hideMainBackButton = { true }
                    />
                )
            })
        },
        AddressSearchContainer: {
            screen: ({ navigation }) => <AddressSearchContainer navigation = { navigation } defaultAddressSelected = { screenProps.defaultAddressSelected }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
                    />
                )
            })
        },
        AddressDetailsContainer: {
            screen: ({ navigation }) => <AddressDetailsContainer navigation = { navigation } defaultAddressSelected = { screenProps.defaultAddressSelected }/>,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <NavigationHeader navigation = { navigation }
                                      titleView = { NavigationTitleView.CUSTOMTITLE }
                                      leftButton = { NavigationLeftButton.BACK }
                                      customTitle = { DISCOUNTS_CLUB_CONTAINER_STRINGS.title }
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

    AddressNavigator.router.getStateForAction = navigateOnce(AddressNavigator.router.getStateForAction)

    return <AddressNavigator/>
}