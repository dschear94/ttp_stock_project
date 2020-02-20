import { RECEIVE_LAST_PRICES } from "../actions/stock_actions";

const stocksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LAST_PRICES:
            return action;
        default:
            return state;
    }
};

export default stocksReducer;
