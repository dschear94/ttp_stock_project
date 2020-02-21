import { RECEIVE_LAST_PRICE, CLEAR_PRICE } from "../actions/latest_price_actions";

const latestPriceReducer = (state = 0, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LAST_PRICE:
            return action.stockInfo[0].latestPrice;
        case CLEAR_PRICE:
            return 0;
        default:
            return state;
    }
};

export default latestPriceReducer;
