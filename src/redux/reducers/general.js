import { SET_SHOW_UNITY_HEADER, SET_UNITY_ID, SET_IS_CHECK_MODE, SET_IS_OFFERS_MODE, SET_IS_ORDER_TYPE_SELECTION_MODE } from "../actions"

/*Sets general properties that are used through the app*/

const initialState = {
    unityId: 0,
    shouldShowUnityHeaderWithInfo: true,
    // shouldCloseModule: false
    isCheckMode: false,
    isOffersMode: false,
    isOrderTypeSelectionMode: false
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
        case SET_IS_OFFERS_MODE:
            return {
                ...state,
                isOffersMode: action.isOffersMode
            }
        case SET_IS_ORDER_TYPE_SELECTION_MODE:
            return {
                ...state,
                isOrderTypeSelectionMode: action.isOrderTypeSelectionMode
            }
        default:
            return state
    }
}