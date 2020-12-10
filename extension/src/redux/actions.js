import {
  SET_PIXEL,
  RECIEVED_PIXEL,
  LOAD_CANVAS,
  UPDATE_COLOR,
  AUTHENTICATE,
  USER_DATA,
  PURCHASE,
  CAN_PLACE,
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

export const authenticate = (token) => ({
  type: AUTHENTICATE,
  payload: {
    token,
  },
});

export const userData = (signedIn, userId, cooldown, purchasedPixels) => ({
  type: USER_DATA,
  payload: {
    signedIn,
    userId,
    cooldown,
    purchasedPixels,
  },
});

export const purchase = (transaction) => ({
  type: PURCHASE,
  payload: {
    transaction,
  },
});

export const canPlace = (placeable) => ({
  type: CAN_PLACE,
  payload: {
    canPlace: placeable,
  },
});
