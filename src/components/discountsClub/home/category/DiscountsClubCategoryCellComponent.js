import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from "react-native"
import { CachedImage } from "react-native-cached-image"
import PropTypes from "prop-types"
import { FontColor, FontWeight, FontFamily, BackgroundColor } from "../../../../theme/Theme"
import Category from "../../../../models/discountsClub/Category"
import { FirebaseActions } from "../../../../utils"

export default class DiscountsClubCategoryCellComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            width: 80,
            marginVertical: 16,
            marginHorizontal: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
        },
        iconView: {
            height: 80,
            width: 80,
            borderRadius: 40,
            marginBottom: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            shadowColor: "black",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.25,
            elevation: 2
        }
    })

    stylesImage = StyleSheet.create({
        image: {
            height: 80,
            width: 80
        }
    })

    stylesText = StyleSheet.create({
        name: {
            flex: 1,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.medium,
            fontSize: 12,
            color: FontColor.secondary,
            textAlign: "center"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress = { () => this.props.onSelectItem(this.props.categoryItem, FirebaseActions.DISCOUNTS_CLUB_HOME.actions.CATEGORY) } accessibilityLabel = "buttonGeneralCategoryItem">
                <View style = { this.stylesView.general } accessibilityLabel = { "viewGeneralCategoryItem" + this.props.categoryItem.name }>
                    <View style = { this.stylesView.iconView } accessibilityLabel = "viewIcon">
                        { Platform.OS === "ios" ?
                        <Image style = { [this.stylesImage.image, { resizeMode: "cover", tintColor: BackgroundColor.secondary }] } source = {{ uri: this.props.categoryItem.image, cache: "force-cache" }} />
                        :
                        <CachedImage style = { this.stylesImage.image }
                                     resizeMode = { "cover" }
                                     source = {{ uri: this.props.categoryItem.image }}
                                     tintColor = { BackgroundColor.secondary }
                                     accessibilityLabel = "imageCategoryItem"
                        />
                        }
                    </View>
                    <Text style = { this.stylesText.name } numberOfLines = { 2 } ellipsizeMode = { "tail" } accessibilityLabel = "textCategoryName">
                        { this.props.categoryItem.name }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

DiscountsClubCategoryCellComponent.propTypes = {
    categoryItem: PropTypes.instanceOf(Category).isRequired,
    onSelectItem: PropTypes.func.isRequired,
}