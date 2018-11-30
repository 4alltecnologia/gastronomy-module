import { SET_SHOW_UNITY_HEADER, SET_UNITY_ID, SET_IS_CHECK_MODE, SET_IS_DISCOUNTS_CLUB_MODE, SET_IS_ORDER_TYPE_SELECTION_MODE, SET_CURRENT_ADDRESS, SET_CURRENT_OPEN_ORDERS } from "../actions"

/*Sets general properties that are used through the app*/
const initialState = {
    unityId: 0,
    shouldShowUnityHeaderWithInfo: true,
    // shouldCloseModule: false
    isCheckMode: false,
    isDiscountsClubMode: false,
    isOrderTypeSelectionMode: false,
    currentAddress: null,
    currentOpenOrders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_UNITY_ID:
            return {
                ...state,
                unityId: action.unityId
            }
        case SET_SHOW_UNITY_HEADER:
            return {
                ...state,
                shouldShowUnityHeaderWithInfo: action.shouldShow
            }
        case SET_IS_CHECK_MODE:
            return {
                ...state,
                isCheckMode: action.isCheckMode
            }
        case SET_IS_DISCOUNTS_CLUB_MODE:
            return {
                ...state,
                isDiscountsClubMode: action.isDiscountsClubMode
            }
        case SET_IS_ORDER_TYPE_SELECTION_MODE:
            return {
                ...state,
                isOrderTypeSelectionMode: action.isOrderTypeSelectionMode
            }
        case SET_CURRENT_ADDRESS:
            return {
                ...state,
                currentAddress: action.currentAddress
            }
        case SET_CURRENT_OPEN_ORDERS:
            return {
                ...state,
                currentOpenOrders: action.currentOpenOrders
            }
        default:
            return state
    }
}