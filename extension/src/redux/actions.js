import { ADD_PIXEL } from './actionTypes'

export const setPixel = (x, y, color) => ({
    type: ADD_PIXEL,
    payload: {
        x: x,
        y: y,
        color: color
    }
});