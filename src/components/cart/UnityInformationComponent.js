import React, { PureComponent } from "react"
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"
import Images from "../../assets"
import { formatDeliveryTime, IdOrderType } from "../../utils"
import { FontFamily, FontColor, FontWeight, BackgroundColor } from "../../theme/Theme"
import { CART_CONTAINER_STRINGS } from "../../languages/index"
import { CachedImage } from "react-native-cached-image"

export default class UnityInformationComponent extends PureComponent {

    stylesView = StyleSheet.create({
        content:{
            width:"100%",
            height:110,
            backgroundColor:"rgb(242,242,242)",
            flexDirection:"row"
        },
        logoUnity:{
            flex:0.2,
            alignItems:"center",
            justifyContent:"center"
        },
        detailUnity:{
            flex:0.8,
            justifyContent:"center"
        },
        nameUnity:{
            flex:0.5,
            justifyContent:"flex-end",
            marginBottom:3
        },
        timeContent:{
            flex:0.5,
            justifyContent:"flex-start"
        },
        subTimeContent:{
            flexDirection:"row",
            marginTop:3
        },
        time:{
            justifyContent:"center",
            alignItems:"center"
        },
        informTime:{
            justifyContent:"flex-start",
            alignItems:"flex-start"
        }
    })

    stylesImage = StyleSheet.create({
        logoUnity:{
            width:52,
            height:52,
            borderRadius:8
        },
        logoUnityTinted:{
            width:52,
            height:52,
            borderRadius:8,
            tintColor: BackgroundColor.primary
        },
        time:{
            width:12,
            height:12,
            tintColor:BackgroundColor.primary
        }
    })

    stylesText = StyleSheet.create({
        nameUnity:{
            fontSize: 18,
            fontWeight: FontWeight.medium
        },
        informDelivery:{
            marginLeft:5,
            color:"rgb(128,128,128)",
            fontSize: 16,
            fontWeight: FontWeight.medium
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={this.stylesView.content} accessibilityLabel="viewContent">
                <View style={this.stylesView.logoUnity} accessibilityLabel="viewLogoUnity">
                    <CachedImage
                        style = { this.props.unityImage ? this.stylesImage.logoUnity : this.stylesImage.logoUnityTinted }
                        source = { this.props.unityImage ? { uri: this.props.unityImage } : Images.icons.placeholderStore }
                        resizeMode={"contain"}
                        accessibilityLabel="imageLogoUnity"/>
                </View>
                <View style={this.stylesView.detailUnity} accessibilityLabel="viewDetailUnity">
                    <View style={this.stylesView.nameUnity} accessibilityLabel="viewNameUnity">
                        <Text style={this.stylesText.nameUnity} accessibilityLabel="textNameUnity">
                            {this.props.unityName}
                        </Text>
                    </View>
                    <View style={this.stylesView.timeContent} accessibilityLabel="viewTimeContent">
                        { !!this.props.deliveryMethod && (this.props.deliveryMethod == IdOrderType.DELIVERY.id || this.props.deliveryMethod == IdOrderType.TAKEAWAY.id) ?
                        <View style={this.stylesView.subTimeContent} accessibilityLabel="viewSubTimeContent">
                            <View style={this.stylesView.time} accessibilityLabel="viewTime">
                                <Image
                                    source={Images.icons.clock}
                                    style={this.stylesImage.time}
                                    accessibilityLabel="imageTime"/>
                            </View>
                            <View style={this.stylesView.informTime} accessibilityLabel="viewInformTime">
                                <Text
                                    style={this.stylesText.informDelivery}
                                    accessibilityLabel="textInformDelivery">
                                    { this.props.deliveryMethod == IdOrderType.DELIVERY.id ? formatDeliveryTime(this.props.deliveryEstimatedTime, this.props.deliveryEstimatedIdUnitTime) + " " + CART_CONTAINER_STRINGS.unityInformationComponent.delivery :
                                         this.props.deliveryMethod == IdOrderType.TAKEAWAY.id ? formatDeliveryTime(this.props.takeAwayEstimatedTime, this.props.takeAwayEstimatedIdUnitTime) + " " + CART_CONTAINER_STRINGS.unityInformationComponent.takeAway : null
                                    }
                                </Text>
                            </View>
                        </View>
                            : null }
                    </View>
                </View>
            </View>
        )
    }
}


