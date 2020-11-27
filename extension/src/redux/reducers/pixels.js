import { RECIEVED_PIXEL, SET_PIXEL, PIXEL_DOWNLOAD } from '../actionTypes'

const initialState = {
    pixelArray: [],
};

const pixels = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIXEL:
        case RECIEVED_PIXEL:
            const id = action.payload.x + "," + action.payload.y
            return {
                ...state,
                pixelArray: [
                    ...state.pixelArray,
                    {
                        x: action.payload.x,
                        y: action.payload.y,
                        color: action.payload.color
                    }]
            };
        case PIXEL_DOWNLOAD:
            let newPixelArray = [
                ...state.pixelArray,
            ]
            newPixelArray.push(...action.payload.pixelArray)
            return {
                ...state,
                pixelArray: newPixelArray
            };
        default:
            return state;
    }

}

export default pixels