import { Dimensions, Platform, Linking, Alert, NetInfo } from "react-native"
import DeviceInfo from "react-native-device-info"
import RNANAndroidSettingsLibrary from "react-native-android-settings-library"
import Permissions from "react-native-permissions"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./redux/reducers/index"
import rootSaga from "./redux/sagas"
import CacheStore from "./api/base/Cache"
import axios from "axios"
import Numeral from "numeral"
import Moment from "moment"
import mask from "vanilla-masker"
import "moment/locale/pt-br"
import "numeral/locales/pt-br"
import { UNITY_SHIFTS_COMPONENT_STRINGS as UnityShiftsStrings, GENERAL_STRINGS, ORDER_STATUS_COMPONENT_STRINGS as OrderStrings, ORDER_TYPE_STRINGS as OrderTypeStrings, CART_CONTAINER_STRINGS as CartStrings } from "./languages"
import { LANGUAGE, CACHE_LOCATION_GASTRONOMY } from "./configs"
import { BASE_URL_IMAGE } from "./api/APIConfiguration"
import Images from "./assets/index"
import { FontColor } from "./theme/Theme"
import * as Errors from "./errors"
import { saveHeaders } from "./database/specialization/StorageGeneral"

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

const AddressType = {
    STREET_NEIGHBORHOOD_CITY: 0,
    STREET_NUMBER: 1,
    NEIGHBORHOOD_CITY_PROVINCE: 2,
    NUMBER_COMPLEMENT: 3,
    QUERY: 4,
    QUERY_NO_NEIGHBORHOOD: 5,
}

const UserAddressType = {
    GPS: "gps",
    HOME: "home",
    WORK: "work",
    CUSTOM: "custom"
}

const MediaTypes = {
    THUMB: "thumb",
    LOGO: "logo"
}

const AnimationTypes = {
    BOUNCE: "bounce",
    PULSE: "pulse",
    FADE_IN: "fadeIn",
    FADE_IN_DOWN: "fadeInDown",
}

const DeliveryDistance = "20000" //Distance in meters (20000 = 20KM))

const PAYMENT_METHOD = {
    CREDITCARD: {
        id: 1,
        key: "creditCard",
        name: "creditCard"
    },
    DEBIT: {
        id: 2,
        key: "debit",
        name: "Débito"
    },
    MONEY: {
        id: 3,
        key: "money",
        name: "Dinheiro"
    },
    FOODTICKET: {
        id: 4,
        key: "foodTicket",
        name: "Vale Refeição"
    },
    WALLET: {
        id: 5,
        key: "wallet",
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

const FirebaseActions = {
    ORDER_TYPE: {
        screen: "gm_order_type",
        actions: {
            SELECT_TYPE: "gm_order_type_select_type"
        }
    },
    HEADER: {
        screen: "gm_header",
        actions: {
            ORDER_HISTORY: "gm_header_order_history",
            CART: "gm_header_cart",
            CHECKLIST: "gm_header_checklist",
        }
    },
    UNITY_LIST: {
        screen: "gm_unity_list",
        actions: {
            CHANGE_ADDRESS: "gm_unity_list_change_address",
            UNTIY_DETAIL: "gm_unity_list_unity_detail"
        }
    },
    ADDRESS_LIST: {
        screen: "gm_address_list",
        actions: {
            NEW_ADDRESS: "gm_address_list_new_address",
            SELECT_ADDRESS: "gm_address_list_select_address",
            DELETE_ADDRESS: "gm_address_list_delete_address"
        }
    },
    ADDRESS_SEARCH: {
        screen: "gm_address_search",
        actions: {
            SELECTED: "gm_address_search_selected"
        }
    },
    ADDRESS_DETAIL: {
        screen: "gm_address_detail",
        actions: {
            SAVE: "gm_address_detail_save"
        }
    },
    ORDER_HISTORY: {
        screen: "gm_order_history",
        actions: {
            EXPANDED: "gm_order_history_expanded"
        }
    },
    UNITY_DETAIL: {
        screen: "gm_unity_detail",
        actions: {
            SHOW_INFO: "gm_unity_detail_show_info",
            OFFERS_CATALOG: "gm_unity_detail_offers_catalog",
            OFFERS_TAB: "gm_unity_detail_offers_tab",
            CATALOG_TAB: "gm_unity_detail_catalog_tab",
            OFFER_PRODUCT: "gm_unity_detail_offer_product",
            CATALOG_PRODUCT: "gm_unity_detail_catalog_product",
            FLOAT_BUTTON: "gm_unity_detail_float_button",
            FLOAT_BUTTON_CATEGORY: "gm_unity_detail_float_button_category",
            INFO_PHONE: "gm_unity_detail_info_phone",
            INFO_SITE: "gm_unity_detail_info_site",
            CHECK_PRODUCT_ADD: "gm_unity_detail_check_product_add",
            CHECK_PRODUCT_REMOVE: "gm_unity_detail_check_product_remove",
            CHECK_BAR_LOGIN: "gm_unity_detail_check_bar_login",
            CHECK_BAR_TABLE_NUMBER: "gm_unity_detail_check_bar_table_number",
            CHECK_BAR_EXPAND: "gm_unity_detail_check_bar_expand",
            CHECK_BAR_RETRACT: "gm_unity_detail_check_bar_retract",
            CHECK_BAR_ORDER: "gm_unity_detail_check_bar_order",
        }
    },
    PRODUCT_DETAIL: {
        screen: "gm_product_detail",
        actions: {
            ADD: "gm_product_detail_add",
            REMOVE: "gm_product_detail_remove",
            ADD_CART: "gm_product_detail_add_cart"
        }
    },
    MODIFIERS: {
        screen: "gm_modifiers",
        actions: {
            SEE_MORE: "gm_modifiers_see_more",
            SINGLE_ADD: "gm_modifiers_single_add",
            SINGLE_REMOVE: "gm_modifiers_single_remove",
            MULTIPLE_ADD: "gm_modifiers_multiple_add",
            MULTIPLE_REMOVE: "gm_modifiers_multiple_remove",
            MODIFIERS_ADDED: "gm_modifiers_modifiers_added"
        }
    },
    CART: {
        screen: "gm_cart",
        actions: {
            ADD: "gm_cart_plus",
            REMOVE: "gm_cart_minus",
            LOGIN: "gm_cart_login",
            CHANGE_ADDRESS: "gm_cart_change_address",
            CHOOSE_INDOOR_METHOD: "gm_cart_choose_indoor_method",
            CHOOSE_PAYMENT: "gm_cart_choose_payment"
        }
    },
    PAYMENT: {
        screen: "gm_payment",
        actions: {
            CHANGED_PAYMENT_METHOD: "gm_payment_changed_payment_method",
            PAY: "gm_payment_pay",
            PAY_SUCCESS: "gm_payment_pay_success"
        }
    },
    SUCCESS: {
        screen: "gm_success",
        actions: {
            CLOSE: "gm_success_close"
        }
    },
    DISCOUNTS_CLUB_HOME: {
        screen: "gm_discounts_club_home",
        actions: {
            BANNER: "gm_home_discounts_club_banner",
            LOGIN: "gm_home_discounts_club_login",
            STATEMENT: "gm_home_discounts_club_statement",
            CATEGORY: "gm_home_discounts_club_category",
            FEATURED: "gm_home_discounts_club_featured",
            CHANGE_ADDRESS: "gm_home_discounts_club_change_address",
        }
    },
    DISCOUNTS_CLUB_TRADESMAN_LIST: {
        screen: "gm_discounts_club_tradesman_list",
        actions: {
            TRADESMAN_TAPPED: "gm_discounts_club_tradesman_list_tapped"
        }
    },
    DISCOUNTS_CLUB_TRADESMAN_DETAILS: {
        screen: "gm_discounts_club_tradesman_details"
    },
    OFFERS_LIST: {
        screen: "gm_offers_list",
        actions: {
            OFFER_TAPPED: "gm_offers_list_offer_tapped",
            CATEGORY_TAPPED: "gm_offers_list_category_tapped",
        }
    },
    OFFER_DETAILS: {
        screen: "gm_offers_details",
        actions: {
            BUY: "gm_offers_details_buy",
        }
    },
    CHECK_CART: {
        screen: "gm_check_cart",
        actions: {
            PAY: "gm_check_cart_pay",
            CATALOG: "gm_check_cart_catalog",
        }
    },
    CHECK_PAYMENT: {
        screen: "gm_check_payment",
        actions: {
            CHANGED_PAYMENT_METHOD: "gm_check_payment_changed_payment_method",
            PAY: "gm_check_payment_pay",
            PAY_SUCCESS: "gm_check_payment_pay_success"
        }
    },
    CHECK_SUCCESS: {
        screen: "gm_check_success",
        actions: {
            CLOSE: "gm_check_success_close"
        }
    }
}

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

function formatPrice(item, hasSpace = false, hasMonetarySymbol = true) {
    Numeral.locale(LANGUAGE.toLowerCase())
    if (hasSpace) {
        return (hasMonetarySymbol ? GENERAL_STRINGS.monetary : "") + " " + Numeral(item/100).format(GENERAL_STRINGS.currencyFormat)
    } else {
        return (hasMonetarySymbol ? GENERAL_STRINGS.monetary : "") + Numeral(item/100).format(GENERAL_STRINGS.currencyFormat)
    }
}

function formatDistance(distance) {
    return distance >= 1000 ? (distance/1000).toFixed(1) + "km" : distance.toFixed(0) + "m"
}

function formatCpf(cpf) {
    if (!!cpf){
        return mask.toPattern(cpf, "999.999.999-99")
    } else {
        return null
    }
}

function getStatusBarStyle() {
    return FontColor.primary == "#FFFFFF" ? "light-content" : "dark-content"
}


function formatZipCode(zipCode) {
    return mask.toPattern(zipCode, "99999-999")
}

function formatDate(dateString) {
    if (!!dateString) {
        var dateArray = dateString.split("-")

        if (dateArray.length == 3) {
            return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]
        } else {
            return dateString
        }
    } else {
        return null
    }
}

function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
        return null
    }

    switch (phoneNumber.length) {
        case 13:
            return mask.toPattern(phoneNumber, "+99 (99) 99999-9999")
        case 12:
            return mask.toPattern(phoneNumber, "+99 (99) 9999-9999")
        case 11:
            return mask.toPattern(phoneNumber, "(99) 99999-9999")
        case 10:
            return mask.toPattern(phoneNumber, "(99) 9999-9999")
        case 9:
            return mask.toPattern(phoneNumber, "99999-9999")
        case 8:
            return mask.toPattern(phoneNumber, "9999-9999")
        default:
            return null
    }
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
        CacheStore.get(CACHE_LOCATION_GASTRONOMY).then(value => {
            return resolve(value)
        }).catch(error => {
            Permissions.request("location", {type: "whenInUse"}).then(response => {
                if (response === "authorized") {
                    navigator.geolocation.getCurrentPosition(
                        (position => {
                            CacheStore.set(CACHE_LOCATION_GASTRONOMY, position, 2)
                            saveHeaders(position.coords.latitude, position.coords.longitude)
                            return resolve(position)
                        }),
                        (error => {
                            if (parametersIndex === 3) {
                                return reject(new Errors.LocationException())
                            } else if (error.code !== LocationError.TIMEOUT) {
                                return reject(new Errors.LocationSettingsException())
                            } else {
                                return resolve(getCurrentLocation(parametersIndex + 1))
                            }
                        }), LOCATION_SETTINGS[parametersIndex]
                    )
                } else {
                    return reject(new Errors.LocationSettingsException())
                }
            })
        })
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

function openExternalLink(value, app, shouldTryURL = false) {
    let url = (!!app.urlApp ? app.urlApp : app.url) + value

    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url)
        } else {
            if (shouldTryURL) {
                let url = app.url + value

                if (!url.startsWith("http://") && !url.startsWith("https://")) {
                    url = "http://" + url
                }

                Linking.canOpenURL(url).then(supported => {
                    if (supported) {
                        Linking.openURL(url)
                    }
                })
            }
        }
    })
}

const ExternalLink = {
    TELEPHONE: {
        url: Platform.OS === "ios" ? "telprompt:" : "tel:"
    },
    EMAIL: {
        url: "mailto:"
    },
    WEBSITE: {
        url: ""
    },
    FACEBOOK: {
        url: "https://www.facebook.com/",
        urlApp: Platform.OS === "ios" ? ""/*fb://profile/"*/ : "fb://facewebmodal/f?href=https://www.facebook.com/" //TODO: - NOT WORKING ON IOS
    },
    INSTAGRAM: {
        url: "https://www.instagram.com/",
        urlApp: "instagram://user?username="
    },
    WHATSAPP: {
        url: "https://api.whatsapp.com/send?phone="
    },
    TWITTER: {
        url: "https://www.twitter.com/",
        urlApp: "twitter://user?screen_name="
    },
    MAPS: {
        url: "",
        urlApp: Platform.OS === "ios" ? "maps://app?daddr=" : "google.navigation:q="
    }
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
    PAYMENT_METHOD,
    getOrderTypeName,
    UsedDaysOfWeek,
    formatPrice,
    formatTime,
    formatDeliveryTime,
    formatDistance,
    formatCpf,
    formatDate,
    formatPhoneNumber,
    getStatusBarStyle,
    formatZipCode,
    getUnityMedia,
    screenWidthPercentage,
    screenHeightPercentage,
    getDistanceFromLatLonInKm,
    getCurrentLocation,
    callNativeLocationSettings,
    openExternalLink,
    ExternalLink,
    PriceType,
    AddressType,
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
    configureStore,
    FirebaseActions,
    UserAddressType
}