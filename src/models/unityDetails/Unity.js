import OfflinePaymentType from "./OfflinePaymentType"
import OnlinePaymentType from "./OnlinePaymentType"

export default class Unity {

    constructor(unityDictionary) {
        this.id = unityDictionary.id
        this.name = unityDictionary.name
        this.desc = unityDictionary.desc
        this.distance = !!unityDictionary.distance ? unityDictionary.distance : ""
        this.address = unityDictionary.address
        this.indoorOpened = unityDictionary.indoorOpened
        this.outdoorOpened = unityDictionary.outdoorOpened
        this.deliveryEstimatedTime = unityDictionary.deliveryEstimatedTime
        this.deliveryEstimatedIdUnitTime = unityDictionary.deliveryEstimatedIdUnitTime
        this.takeAwayEstimatedTime = unityDictionary.takeAwayEstimatedTime
        this.takeAwayEstimatedIdUnitTime = unityDictionary.takeAwayEstimatedIdUnitTime
        this.media = unityDictionary.media
        this.paymentMethods = unityDictionary.paymentMethods
        this.onlinePaymentType = new OnlinePaymentType(unityDictionary.paymentMethods)
        this.offlinePaymentType = new OfflinePaymentType(unityDictionary.paymentMethods)
        this.unityOperatingHourGroups = unityDictionary.unityOperatingHourGroups
        this.latitude = unityDictionary.latitude
        this.longitude = unityDictionary.longitude
        this.email = !!unityDictionary.email ? unityDictionary.email : ""
        this.phoneNumber = unityDictionary.phoneNumber
        this.mobileNumber = !!unityDictionary.mobileNumber ? unityDictionary.mobileNumber : ""
        this.siteUrl = !!unityDictionary.siteUrl ? unityDictionary.siteUrl : ""
        this.facebookUrl = !!unityDictionary.facebookUrl ? unityDictionary.facebookUrl : ""
        this.twitterUrl = !!unityDictionary.twitterUrl ? unityDictionary.twitterUrl : ""
        this.instagramUrl = !!unityDictionary.instagramUrl ? unityDictionary.instagramUrl : ""
        this.orderDeliveryEnabled = unityDictionary.orderDeliveryEnabled
        this.orderInStoreEnabled = unityDictionary.orderInStoreEnabled
        this.orderShortDeliveryEnabled = unityDictionary.orderShortDeliveryEnabled
        this.orderShortTakeAwayEnabled = unityDictionary.orderShortTakeAwayEnabled
        this.orderTakeAwayEnabled = unityDictionary.orderTakeAwayEnabled
        this.orderVoucherEnabled = unityDictionary.orderVoucherEnabled
        this.hasMenuDelivery = unityDictionary.hasMenuDelivery
        this.hasMenuShortDelivery = unityDictionary.hasMenuShortDelivery
        this.hasMenuTakeAway = unityDictionary.hasMenuTakeAway
        this.hasMenuVoucher = unityDictionary.hasMenuVoucher
    }

    //TODO: - Parse hours groups
    _parseOperatingHourGroups(operatingHoursGroups) {
        return ""
    }

}