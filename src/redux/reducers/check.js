import {
    SET_CHECK_NAME,
    SET_CHECK_NUMBER,
    SET_CHECK_ORDER_ID,
    SET_TABLE_NUMBER,
    SET_CHECK_UNITY,
    SET_CURRENT_CART,
    UPDATE_ITEM_CURRENT_CART
} from "../actions"

/*Sets the check properties*/

const initialState = {
    checkName: "",
    orderId: 0,
    checkNumber: 0,
    tableNumber: 0,
    checkUnity: 0,
    currentCart: [],
    currentCartItemCount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECK_NUMBER:
        return {
          ...state,
            checkNumber: action.checkNumber
        }
    case SET_CHECK_NAME:
        return {
          ...state,
            checkName: action.checkName
        }
    case SET_CHECK_ORDER_ID:
        return {
          ...state,
            orderId: action.orderId
        }
    case SET_TABLE_NUMBER:
        return {
          ...state,
            tableNumber: action.tableNumber
        }
    case SET_CHECK_UNITY:
        return {
          ...state,
            checkUnity: action.checkUnity
        }
    case SET_CURRENT_CART:
        var count = action.currentListCart.length == 0 ? 0 : state.currentCartItemCount
        return {
          ...state,
            currentCart: action.currentListCart,
            currentCartItemCount: count
        }
      case UPDATE_ITEM_CURRENT_CART:
          var newCurrentCart = state.currentCart
          var count = 0

          var productAlreadyAdded = []

          if (!!action.product.idOnCart) {
              productAlreadyAdded = newCurrentCart.filter(listProduct => (listProduct.id == action.product.id && listProduct.idOnCart == action.product.idOnCart))
          } else {
              productAlreadyAdded = newCurrentCart.filter(listProduct => (listProduct.id == action.product.id))
          }

          if (action.fromList && productAlreadyAdded.length > 0) {
              if (action.product.quantity > 0) {
                  newCurrentCart[newCurrentCart.indexOf(productAlreadyAdded[0])] = action.product
              } else {
                  newCurrentCart.splice(newCurrentCart.indexOf(productAlreadyAdded[0]), 1)
              }
          } else {
              action.product.idOnCart = newCurrentCart.length
              newCurrentCart.push(action.product)
          }

          newCurrentCart.map(product => {
              count = count + product.quantity
          })

          return {
              ...state,
              currentCart: newCurrentCart,
              currentCartItemCount: count
          }
    default:
      return state
  }
}