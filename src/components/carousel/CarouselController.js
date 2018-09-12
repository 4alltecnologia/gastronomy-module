import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import PropTypes from "prop-types"
import { screenWidthPercentage, screenHeightPercentage } from "../../utils"
import { BackgroundColor } from "../../theme/Theme"
import CarouselItemCellComponent from "./CarouselItemCellComponent"
import CarouselItem from "./model/CarouselItem"

export default class CarouselController extends Component {

    stylesView = StyleSheet.create({
        general: {
            flexGrow: 1,
            marginVertical: 8,
            paddingTop: 8,
        },
        carousel: {
            height: screenHeightPercentage(40)
        }
    })

    stylesCarousel = StyleSheet.create({
        carousel: {
            height: screenHeightPercentage(40)
        },
        container: {
            height: 80,
            marginTop: -24,
            marginBottom: -32,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: "transparent",
        },
        activeDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: BackgroundColor.secondary
        },
        inactiveDot: {
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
            carouselItemList: props.carouselItemList,
            activeSlide: 0
        }

        this.onPressCarousel = this._onPressCarousel.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            carouselItemList: nextProps.carouselItemList
        })
    }

    _onPressCarousel(carouselItem) {
        this.props.onPressCarousel(carouselItem)
    }

    _renderPagination() {
        const { carouselItemList, activeSlide } = this.state
        return (
            <Pagination dotsLength = { carouselItemList.length }
                        activeDotIndex = { activeSlide }
                        containerStyle = { [this.stylesCarousel.container, { width: 32 * carouselItemList.length }] }
                        dotStyle = { this.stylesCarousel.activeDot }
                        inactiveDotStyle = { this.stylesCarousel.inactiveDot }
                        inactiveDotOpacity = { 0.4 }
                        inactiveDotScale = { 0.6 }
            />
        )
    }

    _renderItem = ({ item, index }) => {
        return (
            <CarouselItemCellComponent carouselItem = { item }
                                       onPressCarousel = { this.onPressCarousel }
            />
        )
    }

    render() {
        return (
            <View style = { this.stylesView.general }  accessibilityLabel = "viewCarouselGeneral">
                <Carousel ref = { (carousel) => { this.carousel = carousel } }
                          data = { this.state.carouselItemList }
                          renderItem = { this._renderItem }
                          sliderWidth = { screenWidthPercentage(100) }
                          itemWidth = { screenWidthPercentage(100) - 48 }
                          contentContainerCustomStyle = { this.stylesView.carousel }
                          onSnapToItem = { (index) => this.setState({ activeSlide: index }) }
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

CarouselController.propTypes = {
    carouselItemList: PropTypes.arrayOf(PropTypes.instanceOf(CarouselItem)).isRequired,
    onPressCarousel: PropTypes.func.isRequired,
}