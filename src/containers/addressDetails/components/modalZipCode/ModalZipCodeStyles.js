import { StyleSheet } from "react-native"
import { FontFamily, BackgroundColor, FontWeight } from "../../../../theme/Theme"
import { screenWidthPercentage, screenHeightPercentage } from "../../../../utils"

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
        height: screenHeightPercentage(40),
        marginTop: screenHeightPercentage(20),
        marginHorizontal: screenWidthPercentage(5),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 4
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
    viewInputZipCode: {
        flex: 0.25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    viewButton: {
        flex: 0.25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    },
    viewBottomDummy: {
        flex: 0.1
    }
})

let stylesText = StyleSheet.create({
    textWarningTitle: {
        textAlign: "center",
        flex: 0.3,
        fontSize: 15,
        fontWeight: FontWeight.bold
    },
    textWarningDescription: {
        textAlign: "center",
        flex: 0.7,
        fontSize: 13
    },
    textZipCode: {
        textAlign: "right",
        fontSize: 17,
        fontWeight: FontWeight.bold
    },
    textInputZipCode: {
        textAlign: "left",
        minWidth: 50,
        marginLeft: 4,
        fontSize: 15,
        fontWeight: FontWeight.medium,
        justifyContent: "flex-start"
    }
})

let stylesButton = StyleSheet.create({
    buttonLogin: {
        flex: 0.8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: BackgroundColor.primary,
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    buttonLoginDisabled: {
        flex: 0.8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: BackgroundColor.primary + "50",
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    labelButtonLogin: {
        color: BackgroundColor.primary,
        textAlign: "center",
        fontSize: 14,
        backgroundColor: "transparent",
        fontFamily: FontFamily.font
    },
    labelButtonLoginDisabled: {
        color: BackgroundColor.primary + "50",
        textAlign: "center",
        fontSize: 14,
        backgroundColor: "transparent",
        fontFamily: FontFamily.font
    }
})

let stylesImage = StyleSheet.create({
    cancel: {
        flex: 1,
        resizeMode: "contain",
        tintColor: BackgroundColor.primary
    }
})

module.exports = {
    stylesView,
    stylesText,
    stylesButton,
    stylesImage
}