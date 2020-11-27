import { SET_PIXEL, RECIEVED_PIXEL, PIXEL_DOWNLOAD } from './actionTypes'

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

export const pixelDownload = (pixelArray) => ({
    type: PIXEL_DOWNLOAD,
    payload: {
        pixelArray: pixelArray
    }
});