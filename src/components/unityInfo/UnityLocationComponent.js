import React, { PureComponent } from "react"
import { Image, View, ScrollView, Text, StyleSheet } from "react-native"
import MapView from "react-native-maps"
import { FontFamily, FontColor, BackgroundColor, FontWeight } from "../../theme/Theme"
import Images from "../../assets/index"
import UnityHeaderSectionComponent from "../unityInfo/UnityHeaderSectionComponent"
import { UNITY_HEADER_SECTION_COMPONENT_STRINGS as UnityHeaderStrings } from "../../languages/index"

export default class UnityLocationComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            margin: 0,
            backgroundColor: "rgb(242,242,242)"
        },
        mapView: {
            marginTop: 24,
            marginRight: 0,
            marginLeft: 0,
            height: 200
        },
        map: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        locationItems: {
            marginTop: 16,
            marginRight: 0,
            marginLeft: 0,
            flexGrow: 1
        },
        locationItem: {
            marginTop: 2,
            marginRight: 18,
            marginLeft: 18,
            flexGrow: 1
        }
    })

    stylesText = StyleSheet.create({
        locationAddress: {
            fontFamily: FontFamily.font,
            fontSize: 16,
            fontWeight: FontWeight.light,
            textAlign: "left",
            color: "rgb(61,61,61)"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            mapSnapshot: null,
            coordinate: {
                latitude: this.props.latitude,
                longitude: this.props.longitude,
            },
            isShowingMap: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isShowingMap: true
            })
        }, 250)
    }

    render() {
        return (
            <View style = { this.stylesView.general } accessibilityLabel="viewGeneral">
                <UnityHeaderSectionComponent title = { UnityHeaderStrings.location } icon = { Images.icons.location }/>
                <View style = { this.stylesView.locationItems } accessibilityLabel="viewLocationItems">
                    <View style = { this.stylesView.locationItem } accessibilityLabel="viewLocationItem">
                        <Text style = { this.stylesText.locationAddress } accessibilityLabel="textLocationAddress">
                            { this.props.address }
                        </Text>
                    </View>
                </View>
                <View style = { this.stylesView.mapView } accessibilityLabel="viewMapView">
                    { this.state.isShowingMap ?
                    <MapView style = { this.stylesView.map }
                             scrollEnabled = { false }
                             zoomEnabled = { false }
                             initialRegion = {{
                                latitude: this.props.latitude,
                                longitude: this.props.longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002,
                             }}
                             accessibilityLabel="mapViewUnity">
                        <MapView.Marker image = { Images.icons.pinGastronomy } coordinate = { this.state.coordinate } accessibilityLabel="mapViewMarker"/>
                    </MapView>
                        : null }
                </View>
            </View>
        )
    }
}
