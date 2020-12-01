import { AUTHENTICATE } from '../actionTypes'

const initialState = {
    token: ""
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.payload.token
            }
        default:
            return state
    }
}

export default auth