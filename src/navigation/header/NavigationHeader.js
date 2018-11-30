import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Animated, Platform } from "react-native"
import { SafeAreaView } from "react-navigation"
import PropTypes from "prop-types"
import { BackgroundColor, FontColor, FontFamily, FontWeight } from "../../theme/Theme"
import { NavigationBackground, NavigationLeftButton, NavigationRightButton, NavigationTitleView, getNavigationHeaderHeight } from "../../utils"
import { GENERAL_STRINGS } from "../../languages/index"
import NavigationHeaderLeft from "./NavigationHeaderLeft"
import NavigationHeaderRight from "./NavigationHeaderRight"

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

export default class NavigationHeader extends PureComponent {

    stylesView = StyleSheet.create({
        header: {
            backgroundColor: BackgroundColor.primary
        },
        headerTransparent: {
            ...Platform.select({
                android: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0
                }
            })
        },
        content: {
            flexDirection: "row",
            height: getNavigationHeaderHeight(),
            alignItems: "center",
            justifyContent: "center",
            borderColor: BackgroundColor.primary
        },
        viewTitle: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
        }
    })

    stylesText = StyleSheet.create({
        title: {
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.semibold,
            fontSize: 16,
            color: FontColor.primary,
            alignSelf: "center"
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        const opacity = !!this.props.navigation.state.params && !!this.props.navigation.state.params.animatedValue ? this.props.navigation.state.params.animatedValue : 1

        const backgroundColor = !!this.props.navigation.state.params && !!this.props.navigation.state.params.animatedValue ? this.props.navigation.state.params.animatedValue.interpolate({
                inputRange: [0, 0, 1],
                outputRange: ["transparent", "transparent", BackgroundColor.primary],
                extrapolate: "clamp"
            }) : "transparent"

        return (
            <AnimatedSafeAreaView elevation = { 4 } style = { this.props.navigationBackground === NavigationBackground.PRIMARYCOLOR ? this.stylesView.header :
                [ this.stylesView.headerTransparent, { backgroundColor: backgroundColor } ]}>
                <Animated.View style = { this.stylesView.content } accessibilityLabel = "viewHeader">
                    <NavigationHeaderLeft navigation = { this.props.navigation }
                                          shouldCloseModule = { this.props.shouldCloseModule }
                                          hideMainBackButton = { this.props.hideMainBackButton }
                                          shouldResetStackTo = { this.props.shouldResetStackTo }
                    />
                    <Animated.View style = { this.stylesView.viewTitle } accessibilityLabel = "viewImageHeader">
                        <Animated.Text style = {[ this.stylesText.title, { opacity: opacity } ]}
                                       numberOfLines = { 1 }
                                       accessibilityLabel = { "textTitle" + this.props.customTitle }>
                            { this.props.customTitle }
                        </Animated.Text>
                    </Animated.View>
                    { this.props.rightButton === NavigationRightButton.NONE ?
                        <View style = {{ marginRight: 84 }}/> //WORKAROUND, WE NEED TO FIND A BETTER ALTERNATIVE
                        :
                        <NavigationHeaderRight navigation = { this.props.navigation }/>
                    }
                </Animated.View>
            </AnimatedSafeAreaView>
        )
    }
}

NavigationHeader.propTypes = {
    leftButton: PropTypes.oneOf([NavigationLeftButton.BACK, NavigationHeaderLeft.CLOSE]).isRequired,
    rightButton: PropTypes.oneOf([NavigationRightButton.CHECK, NavigationRightButton.ORDERHISTORYANDCART, NavigationRightButton.NONE]).isRequired,
    titleView: PropTypes.oneOf([NavigationTitleView.CUSTOMTITLE]).isRequired,
    navigationBackground: PropTypes.oneOf([NavigationBackground.PRIMARYCOLOR, NavigationBackground.TRANSPARENT]),
    customTitle: PropTypes.string,
    shouldCloseModule: PropTypes.bool,
    shouldResetStackTo: PropTypes.string,
    hideMainBackButton: PropTypes.bool
}

NavigationHeader.defaultProps = {
    leftButton: NavigationLeftButton.BACK,
    rightButton: NavigationRightButton.NONE,
    titleView: NavigationTitleView.CUSTOMTITLE,
    navigationBackground: NavigationBackground.PRIMARYCOLOR,
    customTitle: null,
    shouldCloseModule: false,
    shouldResetStackTo: null,
    hideMainBackButton: false
}