export const SET_SHOW_UNITY_HEADER = "SET_SHOW_UNITY_HEADER"
export const SET_UNITY_ID = "SET_UNITY_ID"
export const TOTAL_CART = "TOTAL_CART"
export const SET_CURRENT_CART = "SET_CURRENT_CART"
export const UPDATE_ITEM_CURRENT_CART = "UPDATE_ITEM_CURRENT_CART"
export const SET_CHECK_NAME = "SET_CHECK_NAME"
export const SET_CHECK_NUMBER = "SET_CHECK_NUMBER"
export const SET_CHECK_ORDER_ID = "SET_CHECK_ORDER_ID"
export const SET_TABLE_NUMBER = "SET_TABLE_NUMBER"
export const SET_CHECK_UNITY = "SET_CHECK_UNITY"
// export const SET_SHOULD_CLOSE_MODULE = "SET_SHOULD_CLOSE_MODULE"
export const SET_IS_CHECK_MODE = "SET_IS_CHECK_MODE"
export const SET_IS_DISCOUNTS_CLUB_MODE = "SET_IS_DISCOUNTS_CLUB_MODE"
export const SET_IS_OFFERS_MODE = "SET_IS_OFFERS_MODE"
export const SET_IS_ORDER_TYPE_SELECTION_MODE = "SET_IS_ORDER_TYPE_SELECTION_MODE"
export const SET_CURRENT_ADDRESS = "SET_CURRENT_ADDRESS"
export const SET_CURRENT_OPEN_ORDERS = "SET_CURRENT_OPEN_ORDERS"

export const setUnityId = (unityId) => {
    return {
        type: SET_UNITY_ID,
        unityId
    }
}

export const setShowUnityHeaderWithInfo = (shouldShow) => {
    return {
        type: SET_SHOW_UNITY_HEADER,
        shouldShow
    }
}

export const totalCart = (quantity) => {
    return {
        type: TOTAL_CART,
        quantity
    }
}

export const setCurrentCartCheck = (currentListCart) => {
    return {
        type: SET_CURRENT_CART,
        currentListCart
    }
}

export const updateItemCurrentCartCheck = (product, fromList) => {
    return {
        type: UPDATE_ITEM_CURRENT_CART,
        product,
        fromList
    }
}

export const setCheckName = (checkName) => {
    return {
        type: SET_CHECK_NAME,
        checkName
    }
}

export const setCheckNumber = (checkNumber) => {
    return {
        type: SET_CHECK_NUMBER,
        checkNumber
    }
}

export const setCheckOrderId = (orderId) => {
    return {
        type: SET_CHECK_ORDER_ID,
        orderId
    }
}

export const setTableNumber = (tableNumber) => {
    return {
        type: SET_TABLE_NUMBER,
        tableNumber
    }
}

export const setCheckUnity = (checkUnity) => {
    return {
        type: SET_CHECK_UNITY,
        checkUnity
    }
}

//export const setShouldCloseModule = (shouldClose) => {
//    return {
//        type: SET_SHOULD_CLOSE_MODULE,
//        shouldClose
//    }
//}

export const setIsCheckMode = (isCheckMode) => {
    return {
        type: SET_IS_CHECK_MODE,
        isCheckMode
    }
}

export const setIsDiscountsClubMode = (isDiscountsClubMode) => {
    return {
        type: SET_IS_DISCOUNTS_CLUB_MODE,
        isDiscountsClubMode
    }
}

export const setIsOrderTypeSelectionMode = (isOrderTypeSelectionMode) => {
    return {
        type: SET_IS_ORDER_TYPE_SELECTION_MODE,
        isOrderTypeSelectionMode
    }
}

export const setCurrentAddress = (currentAddress) => {
    return {
        type: SET_CURRENT_ADDRESS,
        currentAddress
    }
}

export const setCurrentOpenOrders = (currentOpenOrders) => {
    return {
        type: SET_CURRENT_OPEN_ORDERS,
        currentOpenOrders
    }
}

