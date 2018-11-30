import React, { PureComponent } from "react"
import { StyleSheet, View, AppState } from "react-native"
import PropTypes from "prop-types"
import * as Errors from "../../../../errors"
import { BackgroundColor } from "../../../../theme/Theme"
import DiscountsClubBannerController from "../banner/DiscountsClubBannerController"
import DiscountsClubStatementController from "../statement/DiscountsClubStatementController"
import DiscountsClubCategoryController from "../category/DiscountsClubCategoryController"
import DiscountsClubFeaturedController from "../featured/DiscountsClubFeaturedController"

export default class DiscountsClubHomeHeaderController extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1
        }
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <DiscountsClubBannerController bannerList = { this.props.headerData.bannerList }
                                               onSelectItem = { this.props.onSelectItem }
                />
                <DiscountsClubStatementController userSavings = { this.props.userSavings }
                                                  isUserLoggedIn = { this.props.isUserLoggedIn }
                                                  onSelectItem = { this.props.onSelectItem }
                />
                <DiscountsClubCategoryController categoryList = { this.props.headerData.categoryList }
                                                 onSelectItem = { this.props.onSelectItem }
                />
                <DiscountsClubFeaturedController featuredList = { this.props.headerData.featuredList}
                                                 onSelectItem = { this.props.onSelectItem }
                />
            </View>
        )
    }
}

DiscountsClubHomeHeaderController.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}