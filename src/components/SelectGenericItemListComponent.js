import React from "react"
import {TouchableOpacity, View, Text, Modal, ScrollView, TouchableWithoutFeedback, Image, StyleSheet, Dimensions} from "react-native"
import { screenWidthPercentage, screenHeightPercentage } from "../utils"

export function OptionsModal(props: Props) {

    const optionText = {
        textAlign: "left",
        flex: 1
    }

    type Option = {
        value: string | number | Object | Function,
        label: string
    }

    type Props = {
        onSelect: (option: Option, isShow: boolean) => void,
        label?: string,
        onShow: (isShow: boolean) => void,
        isShowingOptions: boolean,
        selectedOption: Option,
        options: Array<Option>,
        animationType: "none" | "fade" | "slide",
        itemListStyle: Object,
        itemStyle: Object
    }

    let stylesView = StyleSheet.create({
        container: {
            margin: 0
        },
        backdrop: {
            flex: 1,
            backgroundColor: "rgba(32, 32, 32, 0.8)",
            alignItems: "center",
            justifyContent: "center"
        },
        scrollViewOption: {
            maxHeight: screenHeightPercentage(50)
        },
    })

    let stylesText = StyleSheet.create({
        itemList: {
            marginTop: 10,
            marginLeft: 10,
            width: screenWidthPercentage(80),
        }
    })

    let stylesButton = StyleSheet.create({
        optionItem: {
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#a8a7a4",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff"
        },
    })

    return (
        <Modal accessibilityLabel = "modalOptionsDropdown"
               animationType = { props.animationType }
               visible = { props.isShowingOptions }
               onRequestClose = { () => props.onShow(false) }
               transparent = { true }
               supportedOrientations = { ["portrait"] }
        >
            <TouchableWithoutFeedback onPress = { () => props.onShow(false) } accessibilityLabel = "touchableTapModal">
                <View style = { stylesView.backdrop } accessibilityLabel = "viewScrollView">
                    <ScrollView style = { stylesView.scrollViewOption } accessibilityLabel = "scrollViewModal">
                        { props.options.map((item, index) => {
                            return (
                                <TouchableOpacity key = { index }
                                                  style = { stylesButton.optionItem }
                                                  activeOpacity = { 0.75 }
                                                  onPress = { () => props.onSelect(item, index) }
                                                  accessibilityLabel = "touchableSelectModal">
                                    <Text style={[stylesText.itemList, props.itemListStyle]} accessibilityLabel = "textItemModal">
                                        { !!item.name ? item.name : !!item.title ? item.title : null }
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
