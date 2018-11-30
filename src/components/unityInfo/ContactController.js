import React, { PureComponent } from "react"
import { openExternalLink, ExternalLink, FirebaseActions } from "../../utils"
import { ExternalMethods } from "../../native/Functions"
import ContactComponent from "./ContactComponent"

export default class ContactController extends PureComponent {

    constructor(props) {
        super(props)

        this.onPressContact = this._onPressContact.bind(this)
    }

    _onPressContact(contactType, value, shouldTryURL) {
        ExternalMethods.registerFirebaseEvent(FirebaseActions.UNITY_DETAIL.actions.INFO_PHONE, {})

        openExternalLink(value, contactType, shouldTryURL)
    }

    render() {
        return (
            <ContactComponent email = { this.props.email }
                              website = { this.props.website }
                              phoneNumber = { this.props.phoneNumber }
                              mobilePhoneNumber = { this.props.mobilePhoneNumber }
                              facebook = { this.props.facebook }
                              instagram = { this.props.instagram }
                              twitter = { this.props.twitter }
                              onPressContact = { this.onPressContact }
            />
        )
    }
}