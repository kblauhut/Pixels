import { USER_DATA, CAN_PLACE } from '../actionTypes'

const initialState = {
    userData: {},
    canPlace: true
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                userData: {
                    signedIn: action.payload.signedIn,
                    userId: action.payload.userId,
                    cooldown: action.payload.cooldown,
                    purchasedPixels: action.payload.purchasedPixels
                }
            }
        case CAN_PLACE:
            return {
                ...state,
                canPlace: action.payload.canPlace
            }
        default:
            return state
    }
}

export default user