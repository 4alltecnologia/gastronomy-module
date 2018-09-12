import { StyleSheet } from "react-native"
import { getAddressByQueryAndLatLong, getAddressByPlaceId, addAddress } from "../../api/ApiRequests"
import { screenWidthPercentage } from "../../utils"
import { FontFamily, FontColor, BackgroundColor, FontWeight } from "../../theme/Theme"

let stylesView = StyleSheet.create({
    mainScroll: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column"
    },
    viewTitle: {
        flex: 0.2,
        paddingLeft: 20,
        paddingTop: 25,
        paddingBottom: 25,
        flexDirection: "row"
    },
    viewInput: {
        flex: 0.3,
        backgroundColor: "#f2f2f2",
        padding: 22
    },
    viewTitleIdentifyAddress: {
        flex: 0.15,
        padding: 15
    },
    viewAddressNameOptions: {
        flex: 0.25,
        backgroundColor: "#f2f2f2",
        padding: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
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
    addressViewInfo: {
        flex: 1
    },
    addressViewIcon: {
        flex: 0.1,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingTop: 2,
        paddingRight: 2
    },
    addressItem: {
        flex: 0.9,
        flexDirection: "column",
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
    viewButton: {
        flex: 0.15,
        justifyContent: "center",
        alignItems:"center"

    },
    overlay:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)"
    }
})

let stylesText = StyleSheet.create({
    titleText: {
        fontSize: 14,
        fontWeight: FontWeight.bold
    },
    inputText: {
        fontSize: 15,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: 15,
        marginBottom: 5
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
    addressTitle: {
        fontFamily: FontFamily.font,
        fontSize: 16,
        fontWeight: FontWeight.bold,
        fontStyle: "normal",
        textAlign: "left",
        color: BackgroundColor.primary
    }
})

let stylesRadio = StyleSheet.create({
    segmentedControlsCells: {
        fontFamily: FontFamily.font,
        overflow: "hidden"
    },
    segmentedControlsContainer: {
        overflow: "hidden",
        backgroundColor: BackgroundColor.primary
    }
})

let stylesButton = StyleSheet.create({
    buttonSaveAddress: {
        borderRadius: 8,
        height: 55,
        marginHorizontal: 60,
        marginTop: 12
    },
    buttonSaveGradient: {
        backgroundColor: "#eeeeee",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        height: 55
    },
    labelSaveLogin: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        backgroundColor: "transparent",
        fontFamily: FontFamily.font,
        width: screenWidthPercentage(90)
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
    stylesRadio,
    stylesButton,
    stylesImage
}