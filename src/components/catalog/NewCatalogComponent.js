import React, { Component } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { TabNavigator, TabBarTop } from "react-navigation"
import { TAB_CONTAINER_STRINGS } from "../../languages/index"
import { FontFamily, FontWeight, BackgroundColor } from "../../theme/Theme"
import NewCatalogListComponent from "./NewCatalogListComponent"
import { ExternalMethods } from "../../native/Functions"
import { FirebaseActions } from "../../utils"

export default class NewCatalogComponent extends Component {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            backgroundColor: "rgb(239,239,239)",
            paddingTop: 16
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            listCategory: !!props.listCategory ? props.listCategory : [],
            listOffers: !!props.listOffers ? props.listOffers : [],
            listTabs: [],
            currentIndex: 0,
            isFirstTime: true
        }
    }

    componentDidMount() {
        this._mountListsForTab()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.listCategory.length != this.state.listCategory.length || nextProps.listOffers.length != this.state.listOffers.length) {
            this.setState({
                listCategory: !!nextProps.listCategory ? nextProps.listCategory : [],
                listOffers: !!nextProps.listOffers ? nextProps.listOffers : [],
                listTabs: []
            }, () => this._mountListsForTab())
        }
    }

    shouldComponentUpdate() {
        return this.state.isFirstTime
    }

    _mountListsForTab() {
        var lists = []
        if (this.state.listOffers.length > 0) {
            var tabOffers = {}

            tabOffers.list = [{
                data: this.state.listOffers,
                title: "",
                index: 0
            }]
            tabOffers.title = TAB_CONTAINER_STRINGS.offersTab
            tabOffers.id = 1

            lists.push(tabOffers)
        }
        if (this.state.listCategory.length > 0) {
            var tabCategory = {}

            tabCategory.list = this.state.listCategory
            tabCategory.title = TAB_CONTAINER_STRINGS.catalogTab
            tabCategory.id = 2

            lists.push(tabCategory)
        }

        this.setState({
            listTabs: lists
        })
    }

    _renderTabs() {
        let tabWidth = 100

        const Tabs = TabNavigator(this.tabs(this.state.listTabs), {
            tabBarComponent: TabBarTop,
            tabBarPosition: "top",
            swipeEnabled: false,
            animationEnabled: Platform.OS === "ios",
            lazy: true,
            scrollEnabled: false,
            navigationOptions: ({ navigation }) => ({
                tabBarOnPress: (scene, jumpToIndex) => {
                    ExternalMethods.registerFirebaseEvent(scene.scene.index === 0 ? FirebaseActions.UNITY_DETAIL.actions.OFFERS_TAB : FirebaseActions.UNITY_DETAIL.actions.CATALOG_TAB, {})

                    scene.jumpToIndex(scene.scene.index)
                    this.props.onShouldShowFloatButton(scene.scene.index == 1)
                },
            }),
            tabBarOptions: {
                style: {
                    backgroundColor: "transparent",
                    marginLeft: 18
                },
                tabStyle: {
                    width: tabWidth,
                    backgroundColor: "white",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    marginHorizontal: 2
                },
                labelStyle: {
                    fontFamily: FontFamily.font,
                    fontSize: 12,
                    fontWeight: FontWeight.semibold,
                    color: BackgroundColor.primary
                },
                indicatorStyle : {
                    backgroundColor: "transparent",
                }
            }
        })

        this.state.isFirstTime = false

        return (<Tabs/>)
    }

    tabs(listTabs) {
        return listTabs.reduce((routes, list) => {
            routes[list.id] = this.tab(list)

            return routes
        }, {})
    }

    tab(list) {
        const screen = this.getTabForList(list)

        return {
            screen: screen,
            navigationOptions: {
                title: list.title,
            }
        }
    }

    getTabForList (list) {
        if (!!list) {
            return () => (<NewCatalogListComponent sectionList = { list.list }
                                                   onSelectProduct = { this.props.onSelectProduct }
                                                   addProduct = { this.props.addProduct }
                                                   removeProduct = { this.props.removeProduct }
                            />)
        } else {
            return () => (<View/>)
        }
    }

    render() {
        if (this.state.listTabs.length == 1) {
            return (
                <View style = { this.stylesView.general }>
                    <NewCatalogListComponent sectionList = { this.state.listTabs[0].list }
                                             onSelectProduct = { this.props.onSelectProduct }
                                             addProduct = { this.props.addProduct }
                                             removeProduct = { this.props.removeProduct }
                    />
                </View>
            )
        } else if (this.state.listTabs.length > 1) {
            return (
                <View style = { this.stylesView.general }>
                    { this._renderTabs() }
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }

    }
}