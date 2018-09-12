import { put, call, fork, select, takeEvery, all } from "redux-saga/effects"
import * as actions from "../actions"
import { getCheckData } from "../reducers"
import { getCart } from "../../database/specialization/StorageCart"
import { updateCheck } from "../../database/specialization/StorageCheck"

const updateCart = function* updateCart() {
    const check = yield select(getCheckData)
    const currentListCart = check.currentCart

    yield put({type : actions.SET_CURRENT_CART, currentListCart})
}

const watchAddToCart = function* watchAddToCart() {
    yield takeEvery(actions.UPDATE_ITEM_CURRENT_CART, updateCart)
}

const updateCheckTable = function* updateCheckTable() {
    const check = yield select(getCheckData)

    if (check.tableNumber) {
        yield call(updateCheck, check.checkNumber, check.tableNumber, check.checkUnity, (error, data) => { })
    }
}

const watchSetTableNumber = function* watchSetTableNumber() {
    yield takeEvery(actions.SET_TABLE_NUMBER, updateCheckTable)
}

const root = function* root() {
    yield all([fork(watchAddToCart), fork(watchSetTableNumber)])
}

export {
    updateCart,
    watchAddToCart,
    updateCheckTable,
    watchSetTableNumber
}

export default root