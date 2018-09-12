import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"
import UnityDetailsController from "../components/unityDetail/UnityDetailsController"
import { BackgroundColor } from "../theme/Theme"

const HEADER_MAX_HEIGHT = 160;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class NewUnityDetailContainer extends PureComponent {

    stylesView = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: "white"
        }
    })

    constructor(props){
        super(props)

        this.state = {
            distanceKm: props.navigation.state.params && props.navigation.state.params.distanceKm ? props.navigation.state.params.distanceKm : null,
            userLatitude: props.latitude,
            userLongitude: props.longitude
        }

        this.setUnityName = this._setUnityName.bind(this)
        this.navigateTo = this._navigateTo.bind(this)
    }

    _setUnityName(unityName) {
        this.props.navigation.setParams({title: unityName})
    }

    _navigateTo(screen, product, unity) {
        if (screen == "ProductDetailContainer") {
            this.props.navigation.navigate("ProductDetailContainer", { product: product, unity: unity, catalogNavigationKey: null })
        } else if (screen == "ModifierContainerEven") {
            this.props.navigation.navigate("ModifierContainerEven", { product: product, unity: unity, catalogNavigationKey: null, nextScreen: "Odd" })
        }
    }

    render() {
        return(
            <SafeAreaView forceInset = {{ bottom: "never" }} style = { this.stylesView.safeArea }>
                <UnityDetailsController distanceKm = { this.state.distanceKm }
                                        userLatitude = { this.state.userLatitude }
                                        userLongitude = { this.state.userLongitude }
                                        setUnityName = { this.setUnityName }
                                        navigateTo = { this.navigateTo }
                />
            </SafeAreaView>
        )
    }
}