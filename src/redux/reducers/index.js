import { combineReducers } from "redux"
import CartReducer from "./cart"
import CheckReducer from "./check"
import GeneralReducer from "./general"

export function getCheckData(state) {
    return state.check
}

export default combineReducers({
    cart: CartReducer,
    check: CheckReducer,
    general: GeneralReducer
})