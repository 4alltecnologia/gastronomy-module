import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import DiscountsClubFeaturedComponent from "./DiscountsClubFeaturedComponent"

export default class DiscountsClubFeaturedController extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <DiscountsClubFeaturedComponent featuredList = { this.props.featuredList }
                                            onSelectItem = { this.props.onSelectItem }
            />
        )
    }
}

DiscountsClubFeaturedController.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}