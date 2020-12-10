import { PURCHASE } from '../actionTypes';

const initialState = [];

const purchase = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE:
      return [
        ...state,
        action.payload.transaction,
      ];
    default:
      return state;
  }
};

export default purchase;
