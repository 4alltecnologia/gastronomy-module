
let BackgroundColor = {
    primary: "#4FA444",
    secondary: "#4FA444",
    gradient: "#4FA444"
}

let FontColor = {
    primary: "#FFFFFF",
    secondary: "#000000"
}

let FontFamily = {
    font: "System"
}

let FontWeight = {
    light: "100",
    medium: "400",
    semibold: "600",
    bold: "900"
}

/**
 * The gradient color will be setted to primary color if it"s not setted by the client
 * @param dictionary
 * @private
 */
function _setBackgroundColor(dictionary) {
    BackgroundColor.primary = dictionary["primary"] ? dictionary["primary"] : BackgroundColor.primary
    BackgroundColor.secondary = dictionary["secondary"] ? dictionary["secondary"] : BackgroundColor.secondary
    BackgroundColor.gradient = dictionary["gradient"] ? dictionary["gradient"] : dictionary["primary"] ? dictionary["primary"] : BackgroundColor.gradient
}

/**
 * This method verifies if the font colors are white (#FFFFFF) or black (#000000), if doesn"t set the primary to white and the secondary to black
 * @param dictionary
 * @private
 */
function _setFontColor(dictionary) {
    FontColor.primary = dictionary["primary"] ? dictionary["primary"] == "#FFFFFF" || dictionary["primary"] == "#000000" ? dictionary["primary"] : FontColor.primary : FontColor.primary
    FontColor.secondary = dictionary["secondary"] ? dictionary["secondary"] == "#FFFFFF" || dictionary["secondary"] == "#000000" ? dictionary["secondary"] : FontColor.secondary : FontColor.secondary
}

function _setFontFamily(dictionary) {
    FontFamily.font = dictionary["font"] ? dictionary["font"] : FontFamily.font
}

function setStyleWithDictionary(dictionary) {
    dictionary["backgroundColor"] ? _setBackgroundColor(dictionary["backgroundColor"]) : null
    dictionary["fontColor"] ? _setFontColor(dictionary["fontColor"]) : null
    dictionary["fontFamily"] ? _setFontFamily(dictionary["fontFamily"]) : null
}

module.exports = {
    setStyleWithDictionary,
    BackgroundColor,
    FontColor,
    FontFamily,
    FontWeight
}