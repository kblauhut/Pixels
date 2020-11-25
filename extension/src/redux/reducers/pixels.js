const initialState = {
    allPixels: {},
};

const pixels = (state = initialState, action) => {
    console.log(action);
    return {
        ...state,
        allPixels: {
            ...state.allPixels,
            [action.id]: { color: action.color }
        },
    };
}

export default pixels