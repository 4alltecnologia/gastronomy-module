import { BASE_URL_IMAGE } from "../../api/APIConfiguration"

export default class Card {

    constructor(cardDictionary) {
        this.id = cardDictionary.id
        this.name = !!cardDictionary.name ? cardDictionary.name : null
        this.codename = !!cardDictionary.codename ? cardDictionary.codename : null
        this.thumb = !!cardDictionary.thumb ? BASE_URL_IMAGE + cardDictionary.thumb : null
    }

}