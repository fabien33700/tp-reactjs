import { FILTER_BY_PAYER, RENAME_LIST } from '../Redux/actions'
import { combineReducers } from 'redux'

function reduceTitle(state = 'Integration Week end', action) {
    switch (action.type) {
        case RENAME_LIST:
            return action.title
        default:
            return state
    }
}

function reduceFilterByPayer(state = '', action) {
    switch (action.type) {
        case FILTER_BY_PAYER:
            return action.payer

        default:
            return state
    }
}


export default function createRootReducer(asyncReducers) {
    return combineReducers({
        title: reduceTitle,
        payer: reduceFilterByPayer,
        ...asyncReducers
    });
}
