import { TOTAL_CART } from "../actions"

/*Sets the cart quantity on the NavigationHeaderRight*/

const initialState = {
  quantity: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOTAL_CART:
        return {
          ...state,
          quantity: action.quantity
        }
    default:
      return state
  }
}