import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import DiscountsClubBannerComponent from "./DiscountsClubBannerComponent"

export default class DiscountsClubBannerController extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <DiscountsClubBannerComponent bannerList = { this.props.bannerList }
                                          onSelectItem = { this.props.onSelectItem }
            />
        )
    }
}

DiscountsClubBannerController.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}