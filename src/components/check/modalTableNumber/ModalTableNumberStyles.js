import { StyleSheet } from "react-native"
import { FontFamily, BackgroundColor, FontWeight } from "../../../theme/Theme"
import { screenWidthPercentage, screenHeightPercentage } from "../../../utils"

let stylesView = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    mainViewModal: {
        backgroundColor:"#ffffff",
        flexGrow: 1,
        marginTop: screenHeightPercentage(15),
        marginHorizontal: screenWidthPercentage(5),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "white",
        padding: 15
    },
    viewTop: {
        flex: 0.1,
        flexDirection: "row"
    },
    viewTopDummy: {
        flex: 0.9
    },
    viewTopClose: {
        flex: 0.1,
        alignItems: "center",
        justifyContent: "center"
    },
    viewTexts: {
        flex: 0.4,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    viewInputTableNumber: {
        width: 128,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    viewButton: {
        flex: 0.25,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    }
})

let stylesText = StyleSheet.create({
    textTitle: {
        textAlign: "center",
        flex: 0.3,
        fontSize: 13,
        color: BackgroundColor.primary
    },
    textDescription: {
        textAlign: "center",
        flex: 0.7,
        fontSize: 24,
        color: "black"
    },
    textInputTableNumber: {
        textAlign: "center",
        width: 128,
        minHeight: 60,
        fontSize: 34,
        fontWeight: FontWeight.bold,
        alignItems: "center",
        justifyContent: "center",
        color: "black"
    }
})

let stylesButton = StyleSheet.create({
    button: {
        flex: 0.8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: BackgroundColor.primary,
        backgroundColor: BackgroundColor.primary,
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    buttonDisabled: {
        flex: 0.8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: BackgroundColor.primary + "50",
        backgroundColor: BackgroundColor.primary + "50",
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    labelButton: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        backgroundColor: "transparent",
        fontFamily: FontFamily.font,
        fontWeight: FontWeight.semibold
    },
    labelButtonDisabled: {
        color: "#ffffff" + "50",
        textAlign: "center",
        fontSize: 18,
        backgroundColor: "transparent",
        fontFamily: FontFamily.font,
        fontWeight: FontWeight.semibold
    }
})

let stylesImage = StyleSheet.create({
    cancel: {
        flex: 1,
        resizeMode: "contain",
        height: 32,
        width: 32,
        tintColor: "rgb(51,51,51)"
    }
})

module.exports = {
    stylesView,
    stylesText,
    stylesButton,
    stylesImage
}