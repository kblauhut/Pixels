import { USER_DATA } from '../actionTypes'

const initialState = {
    userData: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                userData: {
                    signedIn: action.payload.signedIn,
                    userId: action.payload.signedIn,
                    cooldown: action.payload.cooldown,
                    purchasedPixels: action.payload.purchasedPixels
                }
            }
        default:
            return state
    }
}

export default user