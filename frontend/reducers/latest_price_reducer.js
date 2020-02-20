import { RECEIVE_LAST_PRICES, CLEAR_PRICES } from "../actions/stock_actions";

const latestPriceReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LAST_PRICES:
            return action.prices[0];
        case CLEAR_PRICES:
            return {};
        default:
            return state;
    }
};

export default latestPriceReducer;
