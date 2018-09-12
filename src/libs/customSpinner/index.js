import React from "react"
import PropTypes from "prop-types"
import { StyleSheet, View, Text, Modal, ActivityIndicator, Image } from "react-native"
import { BackgroundColor, FontFamily, FontColor, FontWeight } from "../../theme/Theme"
import Images from "../../assets/index"

const ANIMATION = ["none", "slide", "fade"]

var timeoutSpinner = null

export default class Spinner extends React.Component {

    stylesView = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        background: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center"
        },
        textContainer: {
            flex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute"
        },
        textContent: {
            top: 0,
            fontSize: 16,
            color: BackgroundColor.primary,
            fontFamily: FontFamily.font,
            fontWeight: FontWeight.bold
        },
        loading: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    stylesImage = StyleSheet.create({
        loading: {
            height: 100,
            width: 100,
            position: "absolute",
            tintColor: BackgroundColor.primary,
            zIndex: 100
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            visible: this.props.visible,
            index: 0
        }

        this.next = this.next.bind(this)
    }

    componentDidMount() {
        if (this.state.visible) {
            this.next()
        }
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps

        if (visible == false){
            this.close()
        } else if (timeoutSpinner == null){
            this.next()
        }

        this.setState({ visible })
    }

    componentWillUnmount() {
        if (this.state.visible) {
            clearTimeout(timeoutSpinner)
            timeoutSpinner = null
        }
    }

    close() {
        this.setState({
            visible: false
        })
    }

    next() {
        timeoutSpinner = setTimeout(() => {
            this.setState({index: (this.state.index+1)%12})
            this.next()
        }, 125)
    }

    _handleOnRequestClose() {
        if (this.props.cancelable) {
            clearTimeout(timeoutSpinner)
            timeoutSpinner = null
            this.close()
        }
    }

    render() {
        if (!this.state.visible) {
            clearTimeout(timeoutSpinner)
            timeoutSpinner = null
            return null
        }

        return (
            <Modal animationType = { this.props.animation }
                    onRequestClose = { () => this._handleOnRequestClose() }
                    supportedOrientations = { ["landscape", "portrait"] }
                    transparent
                    visible={this.state.visible}>
                    <View style={[this.stylesView.container,{ backgroundColor: "rgba(0, 0, 0, 0.20)" }]}>
                        <View style={this.stylesView.background}>
                            <Image source = { Images.icons.loader1 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 0 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader2 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 1 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader3 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 2 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader4 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 3 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader5 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 4 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader6 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 5 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader7 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 6 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader8 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 7 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader9 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 8 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader10 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 9 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader11 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 10 ? 1 : 0 } ] }/>
                            <Image source = { Images.icons.loader12 } style = {[ this.stylesImage.loading, { opacity: this.state.index == 11 ? 1 : 0 } ] }/>
                        </View>
                    </View>
            </Modal>
        )
    }
}