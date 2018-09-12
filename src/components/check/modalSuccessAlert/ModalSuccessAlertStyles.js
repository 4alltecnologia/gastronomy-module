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
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16,
        paddingBottom: 10
    },
    viewTexts: {
        flex: 0.20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    viewDescription: {
        flex: 0.55,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    viewButton: {
        flex: 0.20,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    }
})

let stylesText = StyleSheet.create({
    textTitle: {
        fontSize: 14,
        color: BackgroundColor.primary
    },
    textSubtitle: {
        textAlign: "center",
        fontSize: 24,
        color: "black"
    },
    textDescription: {
        fontSize: 16,
        marginHorizontal: 30,
        color: "black",
        textAlign: "center"
    }
})

let stylesButton = StyleSheet.create({
    button: {
        flex: 0.8,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: BackgroundColor.primary,
        backgroundColor: BackgroundColor.primary,
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