import { SET_PIXEL, RECIEVED_PIXEL, LOAD_CANVAS } from './actionTypes'

export const setPixel = (x, y, color) => ({
    type: SET_PIXEL,
    payload: {
        x: x,
        y: y,
        color: color
    }
});

export const recievedPixel = (x, y, color) => ({
    type: RECIEVED_PIXEL,
    payload: {
        x: x,
        y: y,
        color: color
    }
});

export const loadCanvas = (x, y, canvas) => ({
    type: LOAD_CANVAS,
    payload: {
        x: x,
        y: y,
        canvas: canvas
    }
});
