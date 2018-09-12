import { StyleSheet } from "react-native"
import { FontFamily, FontColor, BackgroundColor, FontWeight } from "../../theme/Theme"
import { screenWidthPercentage } from "../../utils"

let stylesView = StyleSheet.create({
    addressContainer: {
        flex: 1,
        flexDirection:"row"
    },
    addressViewIcon: {
        width: 14,
        marginTop: 10,
        marginRight: 4,
        paddingVertical: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    addressViewInfo: {
        flex: 0.8
    },
    addressViewDelete: {
        flex: 0.2
    },
    container: {
        backgroundColor: "white",
        flex: 1
    },
    list: {
        flex: 0.85,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5
    },
    button: {
        flex: 0.15,
        justifyContent: "center",
        alignItems:"center",
        marginBottom: 10

    },
    titleContainer : {
        marginHorizontal: 20,
        justifyContent: "flex-start",
        alignItems:"flex-start",
    },
    addressItem: {
        flex: 1,
        flexDirection: "column",
        marginVertical: 10,
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    addressDelete: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    viewIconText: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    sectionSeparator: {
        height: 0.75,
        marginHorizontal: 19,
        backgroundColor: "#d1d1d1"
    },
    viewActivityIndicator: {
        justifyContent: "center",
        flex: 1
    },
    activityIndicator: {
        marginLeft: 10,
        flex: 0.0
    }
})

let stylesText = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex:1,
        justifyContent: "flex-start"
    },
    subTitle: {
        fontFamily: FontFamily.font,
        fontSize: 12,
        fontWeight: FontWeight.medium,
        fontStyle: "normal",
        textAlign: "left",
        color: FontColor.secondary
    },
    addressTitle: {
        fontFamily: FontFamily.font,
        fontSize: 16,
        fontWeight: FontWeight.bold,
        fontStyle: "normal",
        textAlign: "left",
        color: BackgroundColor.primary
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
    title: {
        fontFamily: FontFamily.font,
        fontSize: 14,
        fontWeight: FontWeight.medium,
        fontStyle: "normal",
        textAlign: "left",
        color: FontColor.secondary
    }
})

let stylesImage = StyleSheet.create({
    check: {
        resizeMode: "contain",
        height: 20,
        width: 20
    },
    pin: {
        height: 14,
        width: 14,
        resizeMode: "contain",
        tintColor: BackgroundColor.primary
    },
    cancel: {
        flex: 1,
        resizeMode: "contain",
        tintColor: BackgroundColor.primary
    }
})

let stylesButton = StyleSheet.create({
    buttonLogin: {
        borderRadius: 8,
        height: 55,
        marginHorizontal: 60,
        marginTop: 12
    },
    buttonLoginGradient: {
        backgroundColor: "#eeeeee",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        height: 55
    },
    labelButtonLogin: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        backgroundColor: "transparent",
        fontFamily: FontFamily.font,
        width: screenWidthPercentage(90)
    }
})

module.exports = {
    stylesView,
    stylesText,
    stylesImage,
    stylesButton
}