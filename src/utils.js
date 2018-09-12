import { Dimensions, Platform, Linking, Alert, NetInfo } from "react-native"
import DeviceInfo from "react-native-device-info"
import Geolocation from "react-native-geolocation-service"
import RNANAndroidSettingsLibrary from "react-native-android-settings-library"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./redux/reducers/index"
import rootSaga from "./redux/sagas"
import CacheStore from "./api/base/Cache"
import axios from "axios"
import Numeral from "numeral"
import Moment from "moment"
import "moment/locale/pt-br"
import "numeral/locales/pt-br"
import { UNITY_SHIFTS_COMPONENT_STRINGS as UnityShiftsStrings, LOCATION_SETTINGS_STRINGS, GENERAL_STRINGS, ORDER_STATUS_COMPONENT_STRINGS as OrderStrings, ORDER_TYPE_STRINGS as OrderTypeStrings, CART_CONTAINER_STRINGS as CartStrings } from "./languages"
import { BASE_URL_IMAGE, LANGUAGE } from "./configs"
import Images from "./assets/index"
import { FontColor } from "./theme/Theme"
import * as Errors from "./errors"

var ErrorGeneric = {
    InternetConnection: 1,
    NoData: 2
}

const PriceType = {
    SUM_TOTAL: 0,
    AVERAGE: 1,
    LOWEST_PRICE: 2,
    BIGGEST_PRICE: 3
}

const MediaTypes = {
    THUMB: "thumb",
    LOGO: "logo"
}

const AnimationTypes = {
    BOUNCE: "bounce",
    PULSE: "pulse",
    FADE_IN: "fadeIn"
}

const DeliveryDistance = "20000" //Distance in meters (20000 = 20KM))

const paymentMethod = {
    CREDITCARD: {
        id: 1,
        name: "creditCard"
    },
    DEBIT: {
        id: 2,
        name: "Débito"
    },
    MONEY: {
        id: 3,
        name: "Dinheiro"
    },
    FOODTICKET: {
        id: 4,
        name: "Vale Refeição"
    },
    WALLET: {
        id: 5,
        name: "wallet",
        cardIdName: "CHECKING_ACCOUNT"
    }
}

const LOCATION_SETTINGS = {
    0: {
        enableHighAccuracy: false,
        timeout: 5000
    },
    1: {
        enableHighAccuracy: true,
        timeout: 5000
    },
    2: {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    },
    3: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
}

const OrderStatus = {
    SENT: 20, //Outdoor Indoor
    PAYMENT_DECLINED: 24,
    PAYMENT_CONFIRMED: 27,
    CONFIRMED: 30,
    IN_PRODUCTION: 50, //Outdoor Indoor
    READY: 60, //Indoor
    TO_DELIVERY: 70, //Outdoor
    DELIVERED: 80, //Outdoor Indoor
    CANCELLED: 200 //Outdoor Indoor
}

const LocationError = {
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3
}

const UsedOutdoorDeliveryOrderStatus = [
    OrderStatus.SENT,
    OrderStatus.IN_PRODUCTION,
    OrderStatus.TO_DELIVERY,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED
]

const UsedIndoorDeliveryOrderStatus = [
    OrderStatus.SENT,
    OrderStatus.IN_PRODUCTION,
    OrderStatus.READY,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED
]

function isOrderStatusBeingUsed(orderStatus, isOutdoor = true) {
    if (isOutdoor) {
        if (UsedOutdoorDeliveryOrderStatus.includes(orderStatus)) {
            return true
        } else {
            return false
        }
    } else {
        if (UsedIndoorDeliveryOrderStatus.includes(orderStatus)) {
            return true
        } else {
            return false
        }
    }
}

function getOrderStatusMessage(orderStatus) {
    switch(orderStatus) {
        case OrderStatus.SENT:
            return OrderStrings.orderReceived
            break
        case OrderStatus.PAYMENT_DECLINED:
            return OrderStrings.paymentDeclined
            break
        case OrderStatus.PAYMENT_CONFIRMED:
            return OrderStrings.paymentConfirmed
            break
        case OrderStatus.CONFIRMED:
            return OrderStrings.confirmed
            break
        case OrderStatus.IN_PRODUCTION:
            return OrderStrings.orderInProduction
            break
        case OrderStatus.READY:
            return OrderStrings.orderReady
            break
        case OrderStatus.TO_DELIVERY:
            return OrderStrings.orderInDelivery
            break
        case OrderStatus.DELIVERED:
            return OrderStrings.orderDelivered
            break
        case OrderStatus.CANCELLED:
            return OrderStrings.orderCanceled
            break
    }
}

function getOrderTypeMessageForCells(orderTypeId, isSingleCell = false) {
    for (orderType of UsedIdOrderType) {
        if (orderType.id == orderTypeId) {
            if (isSingleCell) {
                return { firstMessage: orderType.singleCellFirstMessage, secondMessage: orderType.singleCellSecondMessage }
            } else {
                return { firstMessage: orderType.multipleCellFirstMessage, secondMessage: orderType.multipleCellSecondMessage }
            }
        }
    }
}

function getOrderTypeMessageForBottom(orderTypeId) {
    for (orderType of UsedIdOrderType) {
        if (orderType.id == orderTypeId) {
            return orderType.singleCellBottomMessage
        }
    }
}

const IdOrderType = {
    TAKEAWAY: {
        id: 1,
        name: OrderTypeStrings.takeAway,
        key: "Takeaway",
        multipleCellFirstMessage: CartStrings.indoorDeliveryComponent.takeaway.multipleCellFirstMessage,
        multipleCellSecondMessage: CartStrings.indoorDeliveryComponent.takeaway.multipleCellSecondMessage,
        singleCellFirstMessage: CartStrings.indoorDeliveryComponent.takeaway.singleCellFirstMessage,
        singleCellSecondMessage: CartStrings.indoorDeliveryComponent.takeaway.singleCellSecondMessage,
        singleCellBottomMessage: {
            firstMessage: CartStrings.indoorDeliveryComponent.takeaway.singleCellBottomMessage.firstMessage,
            secondMessage: CartStrings.indoorDeliveryComponent.takeaway.singleCellBottomMessage.secondMessage,
            thirdMessage: CartStrings.indoorDeliveryComponent.takeaway.singleCellBottomMessage.thirdMessage
        }
    },
    DELIVERY: {
        id: 2,
        name: OrderTypeStrings.delivery,
        key: "Delivery"
    },
    SHORTDELIVERY: {
        id: 3,
        name: OrderTypeStrings.shortDelivery,
        key: "ShortDelivery",
        multipleCellFirstMessage: CartStrings.indoorDeliveryComponent.shortDelivery.multipleCellFirstMessage,
        multipleCellSecondMessage: CartStrings.indoorDeliveryComponent.shortDelivery.multipleCellSecondMessage,
        singleCellFirstMessage: CartStrings.indoorDeliveryComponent.shortDelivery.singleCellFirstMessage,
        singleCellSecondMessage: CartStrings.indoorDeliveryComponent.shortDelivery.singleCellSecondMessage,
        singleCellBottomMessage: {
            firstMessage: CartStrings.indoorDeliveryComponent.shortDelivery.singleCellBottomMessage.firstMessage,
            secondMessage: CartStrings.indoorDeliveryComponent.shortDelivery.singleCellBottomMessage.secondMessage,
            thirdMessage: CartStrings.indoorDeliveryComponent.shortDelivery.singleCellBottomMessage.thirdMessage
        }
    },
    VOUCHER: {
        id: 4,
        name: OrderTypeStrings.voucher,
        key: "Voucher",
        multipleCellFirstMessage: CartStrings.indoorDeliveryComponent.voucher.multipleCellFirstMessage,
        multipleCellSecondMessage: CartStrings.indoorDeliveryComponent.voucher.multipleCellSecondMessage,
        singleCellFirstMessage: CartStrings.indoorDeliveryComponent.voucher.singleCellFirstMessage,
        singleCellSecondMessage: CartStrings.indoorDeliveryComponent.voucher.singleCellSecondMessage,
        singleCellBottomMessage: {
            firstMessage: CartStrings.indoorDeliveryComponent.voucher.singleCellBottomMessage.firstMessage,
            secondMessage: CartStrings.indoorDeliveryComponent.voucher.singleCellBottomMessage.secondMessage,
            thirdMessage: CartStrings.indoorDeliveryComponent.voucher.singleCellBottomMessage.thirdMessage
        }
    },
    CHECK: {
        id: 5,
        name: OrderTypeStrings.check,
        key: "Check",
    },
    INSTORE: {
        id: 6,
        name: OrderTypeStrings.inStore,
        key: "InStore",
    },
    SHORTTAKEAWAY: {
        id: 7,
        name: OrderTypeStrings.shortTakeAway,
        key: "SHortTakeaway",
    },
    APPTOAPP: {
        id: 8,
        name: OrderTypeStrings.appToApp,
        key: "AppToApp",
    }
}

const UsedIdOrderType = [
    IdOrderType.DELIVERY,
    IdOrderType.VOUCHER,
    IdOrderType.SHORTDELIVERY,
    IdOrderType.TAKEAWAY,
    IdOrderType.INSTORE,
    IdOrderType.CHECK,
    IdOrderType.APPTOAPP
]

function getOrderTypeIcon(type) {
    switch(type) {
        case IdOrderType.DELIVERY.id:
            return Images.icons.delivery
            break
        case IdOrderType.VOUCHER.id:
            return Images.icons.voucher
            break
        case IdOrderType.TAKEAWAY.id:
            return Images.icons.takeaway
            break
        case IdOrderType.SHORTDELIVERY.id:
            return Images.icons.table
            break
    }
}

function getOrderTypeName(type) {
    for (orderType of UsedIdOrderType) {
        if (orderType.id == type) {
            return orderType.name
            break
        }
    }
}

function formatDeliveryTime(time, idUnitTime) {
    if (idUnitTime == 1) {
        return time + " " + GENERAL_STRINGS.min
    } else if (idUnitTime == 2) {
        return time + " " + GENERAL_STRINGS.hours
    } else {
        return time + " " + GENERAL_STRINGS.days
    }
}

function formatTime(time, pattern) {
    return Moment(time).locale(LANGUAGE.toLowerCase()).format(pattern)
}

function formatPrice(item, hasSpace = false) {
    Numeral.locale(LANGUAGE.toLowerCase())
    if (hasSpace) {
        return GENERAL_STRINGS.monetary + " " + Numeral(item/100).format(GENERAL_STRINGS.currencyFormat)
    } else {
        return GENERAL_STRINGS.monetary + Numeral(item/100).format(GENERAL_STRINGS.currencyFormat)
    }
}

function formatDistance(distance) {
    return distance >= 1000 ? (distance/1000).toFixed(1) + "km" : distance.toFixed(0) + "m"
}


function getStatusBarStyle() {
    return FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"
}

const DaysOfWeek = {
    SUNDAY: {
        bitNumber: 1,
        name: UnityShiftsStrings.sunday
    },
    MONDAY: {
        bitNumber: 2,
        name: UnityShiftsStrings.monday
    },
    TUESDAY: {
        bitNumber: 4,
        name: UnityShiftsStrings.tuesday
    },
    WEDNESDAY: {
        bitNumber: 8,
        name: UnityShiftsStrings.wednesday
    },
    THURSDAY: {
        bitNumber: 16,
        name: UnityShiftsStrings.thursday
    },
    FRIDAY: {
        bitNumber: 32,
        name: UnityShiftsStrings.friday
    },
    SATURDAY: {
        bitNumber: 64,
        name: UnityShiftsStrings.saturday
    }
}

const UsedDaysOfWeek = [
    DaysOfWeek.SUNDAY,
    DaysOfWeek.MONDAY,
    DaysOfWeek.TUESDAY,
    DaysOfWeek.WEDNESDAY,
    DaysOfWeek.THURSDAY,
    DaysOfWeek.FRIDAY,
    DaysOfWeek.SATURDAY
]

function getUnityMedia(type, arrayMedia) {
    let imageUrl = ""

    for (media of arrayMedia) {
        if (media.mediaContextName == type) {
            imageUrl = BASE_URL_IMAGE + media.value
            break
        }
    }

    return imageUrl
}

// ex.: vw(80) (ocupa 80% da view na horizontal)
const screenWidthPercentage = (value) => {
    const viewport = Dimensions.get("window")
    return (viewport.width / 100) * value
}

// ex.: vw(80) (ocupa 80% da view na vertical)
const screenHeightPercentage = (value) => {
    const viewport = Dimensions.get("window")
    return (viewport.height / 100) * value
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1)  // deg2rad below
    var dLon = deg2rad(lon2-lon1)
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    var d = R * c // Distance in km
    return d.toFixed(2)
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function getCurrentLocation(parametersIndex = 0) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position => {
                return resolve(position)
            }),
            (error => {
                if (parametersIndex === 3) {
                    return reject(new Errors.LocationException())
                } else if (error.code !== LocationError.TIMEOUT) {
                    return reject(new Errors.LocationSettingsException())
                } else {
                    resolve(getCurrentLocation(parametersIndex + 1))
                }
            }), LOCATION_SETTINGS[parametersIndex]
        )
    })
}

function callNativeLocationSettings(){
    if (Platform.OS === "ios"){
        Linking.canOpenURL("prefs:root=LOCATION_SERVICES").then(supported => {
            if (supported){
                Linking.openURL("prefs:root=LOCATION_SERVICES")
            } else {
                Linking.openURL("app-settings:")
            }
        }).catch(error => {
            Linking.openURL("app-settings:")
        })
    } else {
        RNANAndroidSettingsLibrary.open('ACTION_LOCATION_SOURCE_SETTINGS')
    }
}

function callPhoneNumber(phoneNumber){
    let phoneNumberToCall = ""
    if (Platform.OS === "ios"){
        phoneNumberToCall = "telprompt:" + phoneNumber
    } else {
        phoneNumberToCall = "tel:" + phoneNumber
    }
    Linking.canOpenURL(phoneNumberToCall).then(supported => {
        if (supported) {
            Linking.openURL(phoneNumberToCall);
        }
    })
}

function openWebsite(website){
    var websiteToOpen = website

    if (!website.startsWith("http://") && !website.startsWith("https://")) {
        websiteToOpen = "http://" + website
    }

    Linking.canOpenURL(websiteToOpen).then(supported => {
        if (supported) {
            Linking.openURL(websiteToOpen);
        }
    })
}

function getUserAgent(apiHeader, latitude, longitude, callback: (newApiHeader) => void) {
    let uuid = DeviceInfo.getUniqueID()
    let appVersion = DeviceInfo.getVersion()
    let appBuild = DeviceInfo.getBuildNumber()
    let systemName = DeviceInfo.getSystemName()
    let systemVersion = DeviceInfo.getSystemVersion()
    let timestamp = Date.now()

    if (latitude == null || longitude == null){
        apiHeader["User-Agent"] = "GASTRONOMY+"+appVersion+"+("+appBuild+";"+uuid+";"+systemName+";"+systemVersion+";"+"0"+";"+"0"+";"+timestamp+")"

        callback(apiHeader)
    } else {
        apiHeader["User-Agent"] = "GASTRONOMY+"+appVersion+"+("+appBuild+";"+uuid+";"+systemName+";"+systemVersion+";"+latitude+";"+longitude+";"+timestamp+")"

        callback(apiHeader)
    }
}

function isDeviceConnected(callback: (isConnected) => void) {
    axios({
        method: "GET",
        url: "https://google.com",
        params: null,
        timeout: 15000
    }).then((response) => {
        setTimeout( () => {
            callback(true), 500
        })
    }).catch((error) => {
        setTimeout( () => {
            callback(false), 500
        })
    })
}

const NavigationBackground = {
    PRIMARYCOLOR: "PRIMARYCOLOR",
    TRANSPARENT: "TRANSPARENT"
}

const NavigationTitleView = {
    CUSTOMTITLE: "CUSTOMTITLE"
}

const NavigationLeftButton = {
    BACK: "BACK",
    CLOSE: "CLOSE"
}

const NavigationRightButton = {
    CHECK: "CHECK",
    ORDERHISTORYANDCART: "ORDERHISTORYANDCART",
    NONE: "NONE"
}

function isPhoneX() {
    return Platform.OS === "ios" && Dimensions.get("window").height === 812
}

function getNavigationHeaderHeight(withStatusBar = false) {
    if (Platform.OS === "android") {
        return 57
    } else {
        return withStatusBar ? isPhoneX() ? 88 : 64 : 44
    }
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)

    return store
}

module.exports = {
    ErrorGeneric,
    DeliveryDistance,
    AnimationTypes,
    paymentMethod,
    getOrderTypeName,
    UsedDaysOfWeek,
    formatPrice,
    formatTime,
    formatDeliveryTime,
    formatDistance,
    getStatusBarStyle,
    getUnityMedia,
    screenWidthPercentage,
    screenHeightPercentage,
    getDistanceFromLatLonInKm,
    getCurrentLocation,
    callNativeLocationSettings,
    callPhoneNumber,
    openWebsite,
    PriceType,
    MediaTypes,
    getUserAgent,
    isDeviceConnected,
    OrderStatus,
    UsedOutdoorDeliveryOrderStatus,
    UsedIndoorDeliveryOrderStatus,
    IdOrderType,
    isOrderStatusBeingUsed,
    getOrderStatusMessage,
    getOrderTypeMessageForCells,
    getOrderTypeMessageForBottom,
    getOrderTypeIcon,
    NavigationBackground,
    NavigationTitleView,
    NavigationLeftButton,
    NavigationRightButton,
    getNavigationHeaderHeight,
    configureStore
}