import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import createRootReducer from './reducers'
import { fetchCosts, fetchUsers } from '../Model'

const middlewares = applyMiddleware(thunk, createLogger())

export function injectAsyncActionHandler(store, name, asyncHandler) {
    store.asyncReducers[name] = asyncHandler.reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));
    store.dispatch(asyncHandler.dispatcher)
}

export default function configureStore(preloadedState = {}) {
    const asyncHandlers = {
        users: createAsyncActionHandler('FETCH_USERS', fetchUsers(), []),
        costs: createAsyncActionHandler('FETCH_COSTS', fetchCosts(), [])
    } 

    const store = createStore(createRootReducer(), preloadedState, middlewares)
    store.asyncReducers = {};
    store.update = () => {
        for (const handler in asyncHandlers) {
            store.dispatch(handler.dispatcher)
        }
    }

    for (let key in asyncHandlers) {
        injectAsyncActionHandler(store, key, asyncHandlers[key])
    }
    
    return store
}

function createAsyncActionHandler(actionType, promise, defaultValue = {}) {

    function asyncState() {
        return {
            pending: false,
            fetched: false,
            error: null,
            value: defaultValue
        }
    }

    function dispatcher(dispatch) {
        dispatch({ type: actionType + '.start' })
        promise
            .then(response =>
                dispatch({ type: actionType + '.fulfilled', payload: response }))
            .catch(err =>
                dispatch({ type: actionType + '.error', payload: err }))
    }

    function onStart(currentState) {
        return { ...currentState, pending: true }
    }

    function onError(currentState, payload) {
        return { ...currentState, pending: false, error: payload }
    }

    function onFulfilled(currentState, payload) {
        return {
            ...currentState,
            pending: false,
            fetched: true,
            value: payload
        }
    }

    function reducer(state = asyncState(), action) {
        if (action.type.substring(0, actionType.length) !== actionType)
            return state

        const phase = action.type.substring(action.type.lastIndexOf(".") + 1)

        const actionHandlers = {
            'start': () => onStart(state),
            'error': () => onError(state, action.payload),
            'fulfilled': () => onFulfilled(state, action.payload)
        }

        return (actionHandlers[phase] || (() => state))()
    }

    return {
        reducer,
        dispatcher
    }

}
