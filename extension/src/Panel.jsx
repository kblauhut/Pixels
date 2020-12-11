import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { App } from './components/App/App';
import rootReducer from './redux/reducers';
import setupSocket from './util/websocket';
import sendAction from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

let socket;

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App readyState={socket.readyState} retry={connect} />
    </Provider>,
    document.getElementById('root'),
  );
}

function connect() {
  socket = setupSocket(store.dispatch);
  sagaMiddleware.run(sendAction, { socket });

  socket.onopen = () => {
    render();
  };

  socket.onclose = () => {
    render();
  };

  socket.onerror = () => {
    render();
  };
}

connect();
