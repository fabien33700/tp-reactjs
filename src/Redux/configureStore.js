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

    // This method is supposed to dispatch async dispatchers
    // but I don't know where to call it in the component code.
    // My goal was to make the POST HTTP call and to trigger the UI update
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

/**
 * Create an asynchronous action handler, which means a couple composed of the promise
 * dispatcher and the associated reducer
 *  - dispatcher is responsible for starting the promise resolution and dispatching action corresponding
 *    to different request resolution state
 *  - reducer is the handler responsible for managing the state during the promise resolution lifecycle
 * (I tried to make more abstract the management of asynchronous action handling, it's a try and 
 * it's probably not a good and used pattern in React)
 * @param {string} actionType The action prefix used during all the async treatment lifecycle
 * @param {Promise} promise The promise that will be used to retrieve data synchronously
 * @param {mixed} defaultValue Default value if promise fail or return null value
 */
function createAsyncActionHandler(actionType, promise, defaultValue = {}) {

    /**
     * The async state wraps the value and trace the state of the promise resolution (pending, fetched, etc.)
     */
    function asyncState() {
        return {
            pending: false,
            fetched: false,
            error: null,
            value: defaultValue
        }
    }

    /**
     * Execute the promise and dispatch actions according to its state.
     * Given that reducer and dispatcher is generated in the same scope,
     *   so it ensures that they manage the same actions.     * 
     * @param {*} dispatch 
     */
    function dispatcher(dispatch) {
        dispatch({ type: actionType + '.start' })
        promise
            .then(response =>
                // Dispatch the action for fulfilled promise
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
        // Only treat action with the matching prefix
        if (action.type.substring(0, actionType.length) !== actionType)
            return state

        // Parsing the promise phase from the action name (start, error, fulfilled)
        const phase = action.type.substring(action.type.lastIndexOf(".") + 1)

        const actionHandlers = {
            'start': () => onStart(state),
            'error': () => onError(state, action.payload),
            'fulfilled': () => onFulfilled(state, action.payload)
        }

        // Executing the corresponding handler to create the state, or return the state by default
        return (actionHandlers[phase] || (() => state))()
    }

    return {
        reducer,
        dispatcher
    }

}
