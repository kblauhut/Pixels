import { UPDATE_COLOR } from '../actionTypes'

const initialState = {
    color: 0
};

const color = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_COLOR:
            return {
                color: action.payload.color
            }
        default:
            return state
    }
}

export default color