import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import DiscountsClubCategoryComponent from "./DiscountsClubCategoryComponent"

export default class DiscountsClubCategoryController extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <DiscountsClubCategoryComponent categoryList = { this.props.categoryList }
                                            onSelectItem = { this.props.onSelectItem }
            />
        )
    }
}

DiscountsClubCategoryController.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}