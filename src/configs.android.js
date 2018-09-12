import { ExternalMethods } from "./native/Functions"
import { BackgroundColor, FontColor, FontFamily } from "./theme/Theme"

const BASE_URL_IMAGE = "https://s3-sa-east-1.amazonaws.com/marketplace-img/"
const RESPONSE_TYPE = "json"

const API_DATA_MKTP = {
    urlBaseHomolog: "https://marketplace.test.4all.com/mktplace/v1",
    urlBaseProd: "https://marketplace.api.4all.com/mktplace/v1"
}

const API_DATA_ACCOUNT = {
    urlBaseHomolog: "https://conta.homolog-interna.4all.com",
    urlBaseProd: "https://conta.api.4all.com",
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

const API_DATA_GOOGLE_APIS = {
    urlBase: "https://maps.googleapis.com/maps/api/",
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

function API_WALLET_ACCOUNT(sessionToken) {
    let urlBaseHomolog = "https://test.api.4all.com/customer/"
    let urlBaseProd = "https://api.4all.com/customer/"
    let headers = {
        "Authorization": "sessionToken " + sessionToken,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    return ({urlBaseHomolog, urlBaseProd, headers})
}

const LANGUAGE = "pt-BR"

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

    ExternalMethods.setup(isHomolog ? ENVIRONMENTS.Homologation : ENVIRONMENTS.Production, "ANDROID_GASTRONOMY-MODULE_1", "1.0.0", newDictionary)
}

module.exports = {
    BASE_URL_IMAGE,
    RESPONSE_TYPE,
    LANGUAGE,
    ENVIRONMENTS,
    setupModule,
    API_DATA_MKTP,
    API_DATA_ACCOUNT,
    API_DATA_GOOGLE_APIS,
    API_WALLET_ACCOUNT
}