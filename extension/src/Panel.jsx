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

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App readyState={socket.readyState} />
    </Provider>,
    document.getElementById('root'),
  );
}

const socket = setupSocket(store.dispatch);

socket.onopen = () => {
  render();
};

socket.onclose = () => {
  render();
};

socket.onerror = () => {
  render();
};

sagaMiddleware.run(sendAction, { socket });
