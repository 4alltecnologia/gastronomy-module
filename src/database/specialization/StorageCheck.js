import * as Database from "../StorageBase"
import DefaultPreference from "react-native-default-preference"
import { STORAGE_CHECK_STRINGS } from "../../languages/index"
import { getHeadersMktp } from "../specialization/StorageGeneral"

export function getCheckList(callback:(error, data) => void) {
    Database.getData("checkList", (error, checkListStorage) => {
        return callback(error, !!checkListStorage ? JSON.parse(checkListStorage) : checkListStorage)
    })
}

export function addCheck(checkNumber, checkName, unityId, orderId, callback:(error, data) => void) {
    getCheckList((errorGetCheckList, checkListStorage) => {
        if (!!errorGetCheckList) {
            return callback(errorGetCheckList, checkListStorage)
        } else {
            var checkList = []

            if (!!checkListStorage) {
                checkList = checkListStorage.filter(check => check.checkNumber == checkNumber && check.unityId == unityId )
            }

            if (checkList.length == 1) {
                return callback(null, checkList[0])
            } else {
                getHeadersMktp((error, headers) => {
                    if (error) {
                        return callback(error, null)
                    }

                    var newCheck = {
                        // checkName: !!checkListStorage ? STORAGE_CHECK_STRINGS.myCheck + (checkListStorage.length + 1) : STORAGE_CHECK_STRINGS.myCheck + "1", //PROVISORY
                        checkName: STORAGE_CHECK_STRINGS.check + checkNumber,
                        checkNumber: checkNumber,
                        orderId: orderId,
                        unityId: unityId,
                        tableNumber: null,
                        marketplaceAuthorization: headers.Authorization
                    }

                    checkList = !!checkListStorage ? checkListStorage : []
                    checkList.push(newCheck)

                    Database.setData("checkList", checkList, (errorSetCheckList, data) => {
                        DefaultPreference.set('gastronomy_checkList', JSON.stringify(data)).then(function() {
                            return callback(errorSetCheckList, !!errorSetCheckList ? null : newCheck)
                        }).catch(error => {
                            return callback(errorSetCheckList, !!errorSetCheckList ? null : newCheck)
                        })
                    })
                })
            }
        }
    })
}

export function getCheck(checkNumber, callback:(error, data) => void) {
    getCheckList((errorGetCheckList, checkListStorage) => {
        if (!!errorGetCheckList || !checkListStorage) {
            return callback(errorGetCheckList, null)
        } else {
            var newCheckList = checkListStorage.filter(check => {
                return check.checkNumber == checkNumber
            })

            if (newCheckList.length == 1) {
                return callback(null, newCheckList[0])
            } else {
                return callback(null, null)
            }
        }
    })
}

export function updateCheck(checkNumber, tableNumber, unityId, callback:(error, data) => void) {
    getCheckList((errorGetCheckList, checkListStorage) => {
        if (!!errorGetCheckList || !checkListStorage) {
            return callback(errorGetCheckList, null)
        } else {
            checkListStorage.filter((check) => check.checkNumber == checkNumber && check.unityId == unityId)[0].tableNumber = tableNumber

            Database.setData("checkList", checkListStorage, (errorSetCheckList, newCheckListStorage) => {
                DefaultPreference.set('gastronomy_checkList', JSON.stringify(newCheckListStorage)).then(function() {
                    return callback(errorSetCheckList, !!newCheckListStorage ? newCheckListStorage.filter(check => check.checkNumber == checkNumber && check.unityId == unityId )[0] : newCheckListStorage)
                }).catch(error => {
                    return callback(errorSetCheckList, !!newCheckListStorage ? newCheckListStorage.filter(check => check.checkNumber == checkNumber && check.unityId == unityId )[0] : newCheckListStorage)
                })
            })
        }
    })
}

export function removeCheck(checkNumber, unityId, callback:(error, data) => void ) {
    getCheckList((errorGetCheckList, checkListStorage) => {
        if (!!errorGetCheckList || !checkListStorage) {
            return callback(errorGetCheckList, null)
        } else {
            var currentCheck = checkListStorage.filter(check => check.checkNumber == checkNumber && check.unityId == unityId)

            var newCheckList = checkListStorage
            if (currentCheck.length > 0) {
                newCheckList = checkListStorage.filter(check => check.orderId != currentCheck[0].orderId)
            }

            Database.setData("checkList", newCheckList, (errorSetCheckList, newCheckListStorage) => {
                DefaultPreference.set('gastronomy_checkList', JSON.stringify(newCheckListStorage)).then(function() {
                    return callback(errorSetCheckList, newCheckListStorage)
                }).catch(error => {
                    return callback(errorSetCheckList, newCheckListStorage)
                })
            })
        }
    })
}

export function removeAllCheck(checkNumber, callback:(error, result) => void ) {
    Database.removeData("checkList", (error) => {
        DefaultPreference.set('gastronomy_checkList', "").then(function() {
            return callback(error, !!error ? false : true)
        }).catch(error => {
            return callback(error, !!error ? false : true)
        })
    })
}