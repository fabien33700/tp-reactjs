import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App/App'
import * as serviceWorker from './Services/serviceWorker'
import configureStore from './Redux/configureStore'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const store = configureStore()

store.updateStore = () => {
    for (let handler of store.asyncHandlers) {
        store.dispatch(handler.dispatcher)
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'))

serviceWorker.unregister()
