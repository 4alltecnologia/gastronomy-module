import { formatDistance, formatDeliveryTime } from "../utils"

export default class ShortUnity {

    constructor(shortUnityDictionary) {
        this.id = shortUnityDictionary.id
        this.name = shortUnityDictionary.name
        this.logo = shortUnityDictionary.logo
        this.indoorOpened = shortUnityDictionary.indoorOpened
        this.outdoorOpened = shortUnityDictionary.outdoorOpened
        this.distance = formatDistance(shortUnityDictionary.distance)
        this.deliveryTime = formatDeliveryTime(shortUnityDictionary.deliveryEstimatedTime, shortUnityDictionary.deliveryEstimatedIdUnitTime)
    }

}