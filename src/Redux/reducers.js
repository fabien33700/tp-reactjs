import { ADD_COST, FILTER_BY_PAYER, RENAME_LIST } from '../Redux/actions'
import { costs, users } from '../Services/mock'

function reduceCosts(state = [...costs], action) {
    switch (action.type) {
        case ADD_COST:
            return [...state, action.cost]

        default:
            return state
    }
}

function reduceUsers(state = [...users] /* , action */) {
    return state
}

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

export default function rootReducer(state = {}, action) {
    return {
        costs: reduceCosts(state.costs, action),
        users: reduceUsers(state.users, action),
        title: reduceTitle(state.title, action),
        payer: reduceFilterByPayer(state.payer, action)
        // ... other reducers
    }
}
