import React, { PureComponent } from "react"
import { StyleSheet, View, AppState } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import PropTypes from "prop-types"
import { BackgroundColor } from "../../../../theme/Theme"
import { screenHeightPercentage, screenWidthPercentage } from "../../../../utils"
import DiscountsClubBannerCellComponent from "./DiscountsClubBannerCellComponent"

export default class DiscountsClubBannerComponent extends PureComponent {

    stylesView = StyleSheet.create({
        general: {
            flex: 1,
            height: screenHeightPercentage(40)
        }
    })

    stylesCarousel = StyleSheet.create({
        carousel: {
            height: screenHeightPercentage(40)
        },
        paginationContainer: {
            bottom: -8,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: "transparent",
            zIndex: 20
        },
        paginationActiveDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: BackgroundColor.secondary
        },
        paginationInactiveDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "grey"
        }
    })

    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0
        }
    }

    _renderPagination() {
        return (
            <Pagination dotsLength = { this.props.bannerList.length }
                        activeDotIndex = { this.state.activeSlide }
                        containerStyle = { [this.stylesCarousel.paginationContainer, { width: 32 * this.props.bannerList.length }] }
                        dotStyle = { this.stylesCarousel.paginationActiveDot }
                        inactiveDotStyle = { this.stylesCarousel.paginationInactiveDot }
                        inactiveDotOpacity = { 1 }
                        inactiveDotScale = { 0.6 }
            />
        )
    }

    _renderItem = ({ item, index }) => {
        return (
            <DiscountsClubBannerCellComponent bannerItem = { item }
                                              onSelectItem = { this.props.onSelectItem }
            />
        )
    }

    render() {
        return (
            <View style = { this.stylesView.general }>
                <Carousel ref = { (carousel) => { this.carousel = carousel } }
                          data = { this.props.bannerList }
                          renderItem = { this._renderItem }
                          sliderWidth = { screenWidthPercentage(100) }
                          itemWidth = { screenWidthPercentage(100) }
                          contentContainerCustomStyle = { this.stylesCarousel.carousel }
                          onSnapToItem = { (index) => this.setState({ activeSlide: index }) }
                          lockScrollWhileSnapping = { true }
                          loop = { true }
                          autoplay = { true }
                          autoplayDelay = { 4000 }
                          autoplayInterval = { 4000 }
                />
                { this._renderPagination() }
            </View>
        )
    }
}

DiscountsClubBannerComponent.propTypes = {
    onSelectItem: PropTypes.func.isRequired
}