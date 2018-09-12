import { StyleSheet } from "react-native"
import { FontFamily, BackgroundColor, FontWeight, FontColor } from "../../theme/Theme"
import { screenHeightPercentage } from "../../utils"

let stylesView = StyleSheet.create({
    mainScroll: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column"
    },
    titleContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20
    },
    viewTitleGeolocation: {
        height: screenHeightPercentage(7),
        padding: 20
    },
    viewTitle: {
        height: screenHeightPercentage(9),
        padding: 20
    },
    viewInput: {
        height: screenHeightPercentage(16),
        backgroundColor: "#f2f2f2",
        padding: 22
    },
    viewList: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    addressContainer: {
        flex: 1,
        flexDirection:"row"
    },
    addressViewIcon: {
        height: 14,
        marginTop: 10,
        marginRight: 2,
        paddingVertical: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    addressViewInfo: {
        flex: 0.9
    },
    addressItem: {
        flex: 1,
        flexDirection: "column",
        marginVertical: 10,
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    viewActivityIndicator: {
        justifyContent: "center",
        flex: 1
    },
    activityIndicator: {
        marginLeft: 10,
        flex: 0.0
    },
    sectionSeparator: {
        height: 0.75,
        marginHorizontal: 19,
        backgroundColor: "#d1d1d1"
    }
})

let stylesText = StyleSheet.create({
    label: {
        color: "#4e4e4e",
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: "center",
        fontSize: 13,
        fontFamily: FontFamily.font
    },
    labelSelected: {
        color: "#3d3d3d",
        paddingTop: 6,
        paddingBottom: 6,
        fontWeight: FontWeight.bold,
        textAlign: "center",
        fontSize: 13,
        fontFamily: FontFamily.font
    },
    titleText: {
        fontSize: 14,
        fontWeight: FontWeight.bold
    },
    addressStreet: {
        fontFamily: FontFamily.font,
        fontSize: 14,
        fontWeight: FontWeight.bold,
        fontStyle: "normal",
        textAlign: "left",
        color: FontColor.secondary
    },
    addressInfo: {
        fontFamily: FontFamily.font,
        fontSize: 14,
        fontWeight: FontWeight.medium,
        fontStyle: "normal",
        textAlign: "left",
        color: FontColor.secondary
    },
    inputSearch: {
        fontSize: 15,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: 15
    }
})

let stylesTab = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBar: {
        backgroundColor: "#f2f2f2"
    },
    indicator: {
        backgroundColor: BackgroundColor.primary
    }
})

let stylesImage = StyleSheet.create({
    pin: {
        height: 14,
        width: 14,
        resizeMode: "contain",
        tintColor: BackgroundColor.primary
    }
})

module.exports = {
    stylesView,
    stylesText,
    stylesTab,
    stylesImage
}