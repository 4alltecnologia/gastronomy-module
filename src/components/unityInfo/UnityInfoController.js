import React, { PureComponent } from "react"
import { connect } from "react-redux"
import * as Errors from "../../errors"
import UnityService from "../../api/services/UnityService"
import UnityInfoComponent from "./UnityInfoComponent"

class UnityInfoController extends PureComponent {

    constructor(props) {
        super(props)

        //TODO: - We need a better way to add the categories
        let unity = this.props.navigation.getParam("unity")
        unity.categories = ["Descrição", "Endereço", "Horários de Atendimento", "Entre em Contato", "Pagamentos"]

        this.state = {
            unity: unity
        }
    }

    render() {
        return (
            <UnityInfoComponent unity = { this.state.unity }/>
        )
    }
}

export default connect(
    state => ({
        unityId: state.general.unityId
    }),
    { }
) ( UnityInfoController )