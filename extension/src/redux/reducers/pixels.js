import { RECIEVED_PIXEL, SET_PIXEL, LOAD_CANVAS } from '../actionTypes'

const initialState = {
    pixelArray: [],
    canvas: {}
};

const pixels = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIXEL:
        case RECIEVED_PIXEL:
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
        case LOAD_CANVAS:
            return {
                ...state,
                canvas: {
                    x: action.payload.x,
                    y: action.payload.y,
                    canvas: action.payload.canvas
                }
            }

        default:
            return state;
    }

}

export default pixels