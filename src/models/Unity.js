export default class Unity {

    constructor(unityDictionary) {
        this.id = unityDictionary.id
        this.name = unityDictionary.name
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
        this.unityOperatingHourGroups = unityDictionary.unityOperatingHourGroups
        this.latitude = unityDictionary.latitude
        this.longitude = unityDictionary.longitude
        this.phoneNumber = unityDictionary.phoneNumber
        this.siteUrl = unityDictionary.siteUrl
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

}