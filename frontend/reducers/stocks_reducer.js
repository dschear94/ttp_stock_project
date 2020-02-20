import { RECEIVE_LAST_PRICES } from "../actions/stock_actions";

const stocksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LAST_PRICES:
            return { latestPrice: action.prices[0] };
        default:
            return state;
    }
};

export default stocksReducer;
