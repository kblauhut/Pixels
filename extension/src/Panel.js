import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from 'redux-saga'

import { App } from "./components/App/App"
import rootReducer from "./redux/reducers"
import setupSocket from './util/websocket'
import sendAction from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(sendAction, { socket })


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)