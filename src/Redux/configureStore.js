import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const middlewares = applyMiddleware(thunk, createLogger())

export default function configureStore(preloadedState = {}) {
    return createStore(rootReducer, preloadedState, middlewares)
}
