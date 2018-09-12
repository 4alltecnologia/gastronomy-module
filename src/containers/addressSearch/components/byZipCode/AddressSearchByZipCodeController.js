import React, { PureComponent } from "react"
import { ADDRESS_SEARCH_ZIPCODE_CONTAINER_STRINGS } from "../../../../languages"
import { getAddressByZipCode } from "../../../../api/ApiRequests"
import AddressSearchByZipCodeView from "./AddressSearchByZipCodeView"

export default class AddressSearchByZipCodeController extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            sessionToken: props.sessionToken,
            zipCode: "",
            searchResults: [],
            refreshingList: true
        }
    }

    _searchResults = (text) => {
        this.setState({
            searchResult: null,
            refreshingList: true,
            zipCode: text
        })

        if (text.length < 9){
            this.setState({
                searchResult: null,
                refreshingList: false
            })
        } else {
            getAddressByZipCode(text.split("-").join("")).then(data => {
                var fullAddress = null
                if (data.address != ""){
                    fullAddress = {
                        street: data.address,
                        addressFormatted: data.neighborhood + ", " + data.city + " - " + data.uf,
                        zip: data.cep,
                        neighborhood: data.neighborhood,
                        city: data.city,
                        uf: data.uf,
                        country: ADDRESS_SEARCH_ZIPCODE_CONTAINER_STRINGS.defaultCountry
                    }
                }

                this.setState({
                    searchResult: fullAddress,
                    refreshingList: false,
                    zipCode: text
                })
            }).catch(error => {
                this.setState({
                    searchResult: null,
                    refreshingList: false,
                    zipCode: text
                })
            })
        }
    }

    openDetailAddress = (fullAddress) => {
        this.props.navigation.navigate("AddressDetails", {navigation: this.props.navigation, fullAddress: fullAddress, sessionToken: this.state.sessionToken})
    }

    render() {
        return (
            <AddressSearchByZipCodeView
                stateController={this.state}
                openDetailAddress={this.openDetailAddress.bind()}
                _searchResults={this._searchResults.bind()}/>
        )
    }
}