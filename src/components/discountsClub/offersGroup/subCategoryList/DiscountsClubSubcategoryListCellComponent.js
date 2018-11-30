import React, { PureComponent } from "react"
import { Image, ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { CachedImage } from "react-native-cached-image"
import LinearGradient from "react-native-linear-gradient"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../../../theme/Theme"
import { screenWidthPercentage, AnimationTypes } from "../../../../utils"
import Images from "../../../../assets/index"
import * as Animatable from "react-native-animatable"

export default class DiscountsClubSubcategoryListCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            height: 150,
            width: screenWidthPercentage(50) - 18,
            borderRadius: 4,
            marginLeft: 12
        },
        categoryName: {
            position: "absolute",
            right: 12,
            left: 12,
            bottom: 12
        },
        gradientContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        },
        gradient: {
            flex: 1,
            borderRadius: 4
        }
    })

    stylesText = StyleSheet.create({
        categoryName: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: FontColor.primary,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            flex: 1,
            borderRadius: 4
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress = { () => { this.props.onSelectItem(this.props.category, true) } }>
                <View style = { this.stylesView.general } accessibilityLabel = "viewGeneral">
                    <CachedImage source = { !!this.props.category.image ? { uri: this.props.category.image } : Images.icons.placeholderStore }
                                 resizeMode = { "cover" }
                                 style = { this.stylesImage.image }
                                 accessibilityLabel = "imageSubcategory"
                    />
                    <View style = { this.stylesView.gradientContainer }>
                        <LinearGradient colors = {["rgba(15,15,15,0.6)", "transparent", "rgba(15,15,15,0.75)" ]} style = { this.stylesView.gradient }/>
                    </View>
                    <View style = { this.stylesView.categoryName } accessibilityLabel = "viewUnityDetails">
                        <Text style = { this.stylesText.categoryName } numberOfLines = { 3 } accessibilityLabel = { "textSubcategoryName" + this.props.category.name }>
                            { this.props.category.name }
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}