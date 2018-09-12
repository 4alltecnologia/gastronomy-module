import React, { Component } from "react"
import UnityInfoController from "../components/unityInfo/UnityInfoController"

export default class UnityInfoContainer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <UnityInfoController detailsUnity = { this.props.detailsUnity }/>
        )
    }
}