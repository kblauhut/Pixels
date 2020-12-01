import {
  SET_PIXEL, RECIEVED_PIXEL, LOAD_CANVAS, UPDATE_COLOR,
} from './actionTypes';

export const setPixel = (x, y, color) => ({
  type: SET_PIXEL,
  payload: {
    x,
    y,
    color,
  },
});

export const recievedPixel = (x, y, color) => ({
  type: RECIEVED_PIXEL,
  payload: {
    x,
    y,
    color,
  },
});

export const loadCanvas = (x, y, canvas) => ({
  type: LOAD_CANVAS,
  payload: {
    x,
    y,
    canvas,
  },
});

export const updateColor = (color) => ({
  type: UPDATE_COLOR,
  payload: {
    color,
  },
});
