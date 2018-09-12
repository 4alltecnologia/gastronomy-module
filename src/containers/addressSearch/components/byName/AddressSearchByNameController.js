import React, { PureComponent } from "react"
import { getAddressByQueryAndLatLong } from "../../../../api/ApiRequests"
import AddressSearchByNameView from "./AddressSearchByNameView"

export default class AddressSearchByNameController extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            sessionToken: "",
            streetAddress: "",
            searchResults: [],
            refreshingList: true
        }
    }

    componentDidMount(props){
        this.setState({
            sessionToken: this.props.sessionToken
        })
    }

    _searchResults = (text) => {
        this.setState({
            searchResults: [],
            refreshingList: true,
            streetAddress: text
        })

        if (text.length < 3){
            this.setState({
                searchResults: [],
                refreshingList: false
            })
        } else {
            getAddressByQueryAndLatLong(text, this.props.latitude, this.props.longitude).then(data => {
                this.setState({
                    searchResults: data.predictions,
                    refreshingList: false
                })
            })
        }
    }

    openDetailAddress = (fullAddress) => {
        this.props.navigation.navigate("AddressDetails", {navigation: this.props.navigation, fullAddress: fullAddress, sessionToken: this.state.sessionToken})
    }

    render() {
        return (
            <AddressSearchByNameView
                stateController={this.state}
                openDetailAddress={this.openDetailAddress.bind()}
                _searchResults={this._searchResults.bind()}/>
        )
    }
}