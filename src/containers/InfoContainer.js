import React, { PureComponent } from "react"
import { View, StyleSheet, Text } from "react-native"

export default class InfoContainer extends PureComponent {

    stylesView = StyleSheet.create({
        viewContent: {
            flex:1
        }
    })

    constructor(props){
        super(props)
        this.state = {
            detailsUnity: []
        }
    }

    componentDidMount(props){
        this.setState({
            detailsUnity: this.props.detailsUnity
        })
    }

    render() {
        return (
            <View style={ this.stylesView.viewContent } accessibilityLabel="viewContainer">
                <Text accessibilityLabel="textDescription"> { this.state.detailsUnity.desc } </Text>
            </View>
        )
    }
}
