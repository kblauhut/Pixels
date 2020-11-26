import { RECIEVED_PIXEL, SET_PIXEL } from '../actionTypes'

const initialState = {
    pixelData: {},
    pixelArray: []
};

const pixels = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIXEL:
        case RECIEVED_PIXEL:
            const id = action.payload.x + "," + action.payload.y
            return {
                ...state,
                pixelData: {
                    ...state.pixelData,
                    [id]: { color: action.payload.color }
                },
                pixelArray: [
                    ...state.pixelArray,
                    {
                        x: action.payload.x,
                        y: action.payload.y,
                        color: action.payload.color
                    }]
            };
        default:
            return state;
    }

}

export default pixels