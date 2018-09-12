import React, { PureComponent } from "react"
import { TouchableOpacity, View, Text, Animated } from "react-native"
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerPan } from "react-native-tab-view"
import AddressSearchByNameController from "./components/byName/AddressSearchByNameController"
import AddressSearchByGeolocationController from "./components/byGeolocation/AddressSearchByGeolocationController"
import AddressSearchByZipCodeController from "./components/byZipCode/AddressSearchByZipCodeController"

export default class AddressSearchView extends PureComponent {

    Styles = require("./AddressSearchStyles")

    constructor(props){
        super(props)
    }

    _renderHeader = props => <TabBar {...props}
                                     style = { this.Styles.stylesTab.tabBar }
                                     indicatorStyle = { this.Styles.stylesTab.indicator }
                                     renderLabel = { this._renderLabel(props) }/>


    _renderLabel = props => ({ route, index }) => {
        return (
            <Animated.Text style = { this.props.stateController.index == index ? this.Styles.stylesText.labelSelected : this.Styles.stylesText.label } accessibilityLabel="textTabBar">
                {route.title}
            </Animated.Text>
        )
    }

    _renderPager = props => {
        return <TabViewPagerPan {...props} />
    }

    _renderScene = ({ route }) => {
        switch (route.key) {
            case "1":
                return <AddressSearchByGeolocationController {...this.props.stateController} sessionToken={this.props.stateController.sessionToken} latitude={this.props.stateController.latitude} longitude={this.props.stateController.longitude}/>
            case "2":
                return <AddressSearchByZipCodeController {...this.props.stateController} sessionToken={this.props.stateController.sessionToken} latitude={this.props.stateController.latitude} longitude={this.props.stateController.longitude}/>
            case "3":
                return <AddressSearchByNameController {...this.props.stateController} sessionToken={this.props.stateController.sessionToken} latitude={this.props.stateController.latitude} longitude={this.props.stateController.longitude}/>
        }
    }

    render() {
        return (
            <TabViewAnimated
                style = {this.Styles.stylesTab.container}
                navigationState = { this.props.stateController }
                renderScene = { this._renderScene }
                renderHeader = { this._renderHeader }
                onIndexChange = { this.props._handleIndexChange }
                renderPager={this._renderPager}
                accessibilityLabel="tabViewAddress"
            />
        )
    }
}