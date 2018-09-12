import React, { Component } from "react"
import { Animated, Image, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Modal } from "react-native"
import { FontFamily, FontWeight, FontColor, BackgroundColor } from "../../theme/Theme"
import Images from "../../assets/index"
import { BASE_URL_IMAGE } from "../../configs"
import NewCatalogListComponent from "../catalog/NewCatalogListComponent"
import { screenWidthPercentage, screenHeightPercentage } from "../../utils"
import { getCart } from "../../database/specialization/StorageCart"
import { connect } from "react-redux"
import { cartItens } from "../../redux/actions"
import { CHECK_BAR_STRINGS } from "../../languages/index"

class CheckBar extends Component {

    stylesView = StyleSheet.create({
        checkMainContainerOrders: {
            position: "absolute",
            zIndex: 40,
            height: screenHeightPercentage(70),
            width: screenWidthPercentage(100),
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "white",
            bottom: 59
        },
        checkContainerSeparatorOrders: {
            height: 4,
            zIndex: 80,
            width: screenWidthPercentage(100),
            alignSelf: "stretch",
            backgroundColor: BackgroundColor.primary
        },
        checkMainContainerSeparator: {
            width: screenWidthPercentage(100),
            position: "absolute",
            justifyContent: "center",
            alignItems: "center"
        },
        checkMainContainerText: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: BackgroundColor.primary,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            width: 100,
            height: 24,
            zIndex: 70,
            top: 2,
            padding: 10
        },
        checkContainerSeparator: {
            height: 4,
            zIndex: 80,
            width: screenWidthPercentage(100),
            alignSelf: "stretch",
            backgroundColor: BackgroundColor.primary
        },
        checkContainer: {
            height: 72,
            zIndex: 40,
            flexDirection: "column",
            backgroundColor: "rgb(51,51,51)"
        },
        checkContainerNotLogged: {
            height: 92,
            zIndex: 40,
            flexDirection: "column",
            backgroundColor: "rgb(51,51,51)"
        },
        checkContainerInfo: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: "rgb(51,51,51)"
        },
        checkContainerTouchableInfo: {
            flex: 0.65,
            flexDirection: "row",
            padding: 10
        },
        checkItensContainer: {
            flex: 0.30,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        checkTableContainer: {
            flex: 0.35,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        checkNumberContainer: {
            flex: 0.35,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        checkOrderContainer: {
            flex: 0.35,
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 12
        },
        orderButtonContainer: {
            backgroundColor: BackgroundColor.secondary,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 4
        },
        loggedOffContainer: {
            marginTop: 16,
            alignItems: "center",
            justifyContent: "center"
        },
        scrollView: {
            marginBottom: 10
        }
    })

    stylesText = StyleSheet.create({
        loggedOffText: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 12,
            color: "white",
            alignItems: "center",
            justifyContent: "center"
        },
        mainText: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.light,
            fontSize: 12,
            color: "rgb(155, 155, 155)",
            alignItems: "center",
            justifyContent: "center"
        },
        orderDetailsText: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: "rgb(61, 61, 61)",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 10
        },
        infoText: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: "white",
            alignItems: "center",
            justifyContent: "center"
        },
        buttonText: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: "white",
            alignItems: "center",
            justifyContent: "center"
        },
        expandText: {
            color: "white",
            fontSize: 12
        }
    })

    stylesImage = StyleSheet.create({
        iconArrow: {
            height: 10,
            width: 12,
            resizeMode: "contain",
            tintColor: "white"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            showCurrentOrder: false,
            bounceValue: new Animated.Value(screenHeightPercentage(70)),
            bounceValueExpandBar: new Animated.Value(props.isLogged ? 69 : 90),
            canTouchCheckResume: true
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.quantity == 0 && this.props.quantity == 1 && this.state.showCurrentOrder) {
            this.showCurrentOrder()
        }
        if (nextProps.isLogged != this.props.isLogged){
            this.setState({
                bounceValueExpandBar: new Animated.Value(nextProps.isLogged ? 69 : 90),
            })
        }
    }

    showCurrentOrder() {
        if (this.props.quantity > 0 || this.state.showCurrentOrder) {
            var willShow = !this.state.showCurrentOrder
            this.setState({
                showCurrentOrder: willShow,
                canTouchCheckResume: false
            }, () => {
                // this.props.showOverlay()

                var toValue = willShow ? 0 : screenHeightPercentage(70)
                var toValueExpandBar = (willShow ? (parseInt(screenHeightPercentage(70))+58) : (this.props.isLogged ? 69 : 90))

                Animated.parallel([
                    Animated.timing(this.state.bounceValue,
                    {
                        toValue: toValue,
                        duration: 500
                    }),
                    Animated.timing(this.state.bounceValueExpandBar,
                    {
                        toValue: toValueExpandBar,
                        duration: 500
                    })
                ]).start(() => {
                    this.setState({
                        canTouchCheckResume: true
                    })
                })
            })
        }
    }

    render() {
        return (
            <View>
                <Animated.View accessibilityLabel = "viewCurrentCart" style={[this.stylesView.checkMainContainerOrders, {transform: [{translateY: this.state.bounceValue}]}]}>
                    <Text style={this.stylesText.orderDetailsText} accessibilityLabel = "textOrderDetails">{CHECK_BAR_STRINGS.orderResume}</Text>
                    <ScrollView style={this.stylesView.scrollView} accessibilityLabel = "scrollViewCurrentCart">
                        <NewCatalogListComponent
                            sectionList = { this.props.currentCartList }
                            cameFromCheck = { true }
                            addProduct = { this.props.addProduct }
                            removeProduct = { this.props.removeProduct }
                        />
                    </ScrollView>
                </Animated.View>

                {this.props.quantity > 0 ?
                    <Animated.View style={[this.stylesView.checkMainContainerSeparator, {bottom: this.state.bounceValueExpandBar}]}>
                        <TouchableOpacity onPress = {() => this.state.canTouchCheckResume ? this.showCurrentOrder() : null } accessibilityLabel = "buttonShowOrder">
                            <View style={[this.stylesView.checkMainContainerText]}>
                                <Text style={this.stylesText.expandText}>{this.state.showCurrentOrder ? CHECK_BAR_STRINGS.retract : CHECK_BAR_STRINGS.expand}</Text>
                                <Image style = {this.stylesImage.iconArrow} source={this.state.showCurrentOrder ? Images.icons.arrowDown : Images.icons.arrowUp} accessibilityLabel="imageArrowUp"/>
                            </View>
                        </TouchableOpacity>
                        <View style={this.stylesView.checkContainerSeparator} accessibilityLabel="viewSeparator"/>
                    </Animated.View>
                    : null
                }

                <View style={this.props.isLogged ? this.stylesView.checkContainer : this.stylesView.checkContainerNotLogged} accessibilityLabel = "viewButtonPayCheck">
                    {!this.props.isLogged ?
                        <View style={this.stylesView.loggedOffContainer} accessibilityLabel = "viewOfflineMessage">
                            <Text style={this.stylesText.loggedOffText} accessibilityLabel = "textOfflineMessage">{CHECK_BAR_STRINGS.offlineMessage}</Text>
                        </View>
                        : null
                    }
                    <View style={this.stylesView.checkContainerInfo} accessibilityLabel = "viewContainerInfo">
                        <View style={this.stylesView.checkContainerTouchableInfo} accessibilityLabel = "viewContainerItems">
                            <View style={this.stylesView.checkItensContainer} accessibilityLabel = "viewItems">
                                <Text style={this.stylesText.mainText} accessibilityLabel = "textQuantityLabel">{CHECK_BAR_STRINGS.items}</Text>
                                <Text style={this.stylesText.infoText} accessibilityLabel = "textQuantity">{this.props.quantity}</Text>
                            </View>

                            <View style={this.stylesView.checkTableContainer} accessibilityLabel = "viewTable">
                                <Text style={this.stylesText.mainText} accessibilityLabel = "textTableLabel">{CHECK_BAR_STRINGS.table}</Text>
                                <Text style={this.stylesText.infoText} accessibilityLabel = "textTable">{this.props.tableNumber}</Text>
                            </View>

                            <View style={this.stylesView.checkNumberContainer} accessibilityLabel = "viewCheckNumber">
                                <Text style={this.stylesText.mainText} accessibilityLabel = "textCheckNumberLabel">{CHECK_BAR_STRINGS.check}</Text>
                                <Text style={this.stylesText.infoText} accessibilityLabel = "textCheckNumber">{this.props.checkNumber}</Text>
                            </View>
                        </View>

                        <View style={this.stylesView.checkOrderContainer} accessibilityLabel = "viewOrderContainer">
                            <TouchableOpacity
                                style = { this.stylesView.orderButtonContainer }
                                onPress = {() => {
                                    if (this.state.showCurrentOrder){
                                        this.showCurrentOrder()
                                    }
                                    this.props.actionCheckButton(this.props.tableNumber != "-")
                                }}
                                accessibilityLabel = "buttonCallOrder">
                                <Text style={this.stylesText.buttonText} accessibilityLabel = "textButtonLabel">{this.props.isLogged ? CHECK_BAR_STRINGS.order : CHECK_BAR_STRINGS.login}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        quantity: state.check.currentCartItemCount,
        checkNumber: state.check.checkNumber,
        tableNumber: !state.check.tableNumber || state.check.tableNumber == 0 ? "-" : state.check.tableNumber,
        currentCartList: [{
            data: state.check.currentCart,
            title: "",
            index: 0
        }]
    }),
    { cartItens }
)(CheckBar)