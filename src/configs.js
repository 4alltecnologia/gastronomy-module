import { Platform } from "react-native"
import { ExternalMethods } from "./native/Functions"
import { BackgroundColor, FontColor, FontFamily } from "./theme/Theme"

const LANGUAGE = "pt-BR"

const CACHE_LOCATION_GASTRONOMY = "CACHE_LOCATION_GASTRONOMY"

const ENVIRONMENTS = {
    Homologation: 2,
    Production: 3
}

function setupModule(dictionary, isHomolog) {
    let newDictionary = {
        backgroundColor: {
            primary: BackgroundColor.primary,
            secondary: BackgroundColor.secondary,
            gradient: BackgroundColor.gradient
        },
        fontColor: {
            primary: FontColor.primary,
            secondary: FontColor.secondary
        },
        fontFamily: {
            font: FontFamily.font
        }
    }

    if (!!dictionary["backgroundColor"]) {
        let backgroundDictionary = dictionary["backgroundColor"]

        newDictionary.backgroundColor.primary = backgroundDictionary["primary"] ? backgroundDictionary["primary"] : BackgroundColor.primary
        newDictionary.backgroundColor.secondary = backgroundDictionary["secondary"] ? backgroundDictionary["secondary"] : BackgroundColor.secondary
        newDictionary.backgroundColor.gradient = backgroundDictionary["gradient"] ? backgroundDictionary["gradient"] : BackgroundColor.gradient
    }
    if (!!dictionary["fontColor"]) {
        let fontColorDictionary = dictionary["fontColor"]

        newDictionary.fontColor.primary = fontColorDictionary["primary"] ? fontColorDictionary["primary"] : FontColor.primary
        newDictionary.fontColor.secondary = fontColorDictionary["secondary"] ? fontColorDictionary["secondary"] : FontColor.secondary
    }
    if (!!dictionary["fontFamily"]) {
        let fontDictionary = dictionary["fontFamily"]

        newDictionary.fontFamily.font = fontDictionary["font"] ? fontDictionary["font"] : FontFamily.font
    }

    ExternalMethods.setup(isHomolog ? ENVIRONMENTS.Homologation : ENVIRONMENTS.Production, Platform.OS === "ios" ? "IOS" : "ANDROID" + "_GASTRONOMY-MODULE_1", "1.0.0", newDictionary)
}

module.exports = {
    CACHE_LOCATION_GASTRONOMY,
    LANGUAGE,
    ENVIRONMENTS,
    setupModule
}