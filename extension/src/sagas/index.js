import { takeEvery } from 'redux-saga/effects';
import * as types from '../redux/actionTypes';
import 'regenerator-runtime/runtime';

const sendAction = function* sendAction(params) {
  yield takeEvery(types.SET_PIXEL, (action) => {
    if (params.socket.readyState === 1) {
      params.socket.send(JSON.stringify(action))
    } else {
      params.socket.onopen = () => {
        params.socket.send(JSON.stringify(action))
      }
    }
  });
  yield takeEvery(types.AUTHENTICATE, (action) => {
    if (params.socket.readyState === 1) {
      params.socket.send(JSON.stringify(action))
    } else {
      params.socket.onopen = () => {
        params.socket.send(JSON.stringify(action))
      }
    }
  });
  yield takeEvery(types.PURCHASE, (action) => {
    if (params.socket.readyState === 1) {
      params.socket.send(JSON.stringify(action))
    } else {
      params.socket.onopen = () => {
        params.socket.send(JSON.stringify(action))
      }
    }
  })
};

export default sendAction;
