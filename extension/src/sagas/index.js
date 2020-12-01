import { takeEvery } from 'redux-saga/effects';
import * as types from '../redux/actionTypes';
import 'regenerator-runtime/runtime';

const handleNewPixel = function* handleNewPixel(params) {
  yield takeEvery(types.SET_PIXEL, (action) => {
    params.socket.send(JSON.stringify(action));
  });
  yield takeEvery(types.AUTHENTICATE, (action) => {
    params.socket.send(JSON.stringify(action));
  });
};

export default handleNewPixel;
