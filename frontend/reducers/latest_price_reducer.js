import { RECEIVE_LAST_PRICE, CLEAR_PRICE } from "../actions/latest_price_actions";

const latestPriceReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LAST_PRICE:
            return {
                ticker: action.stockInfo[0].symbol,
                price: action.stockInfo[0].latestPrice 
            };
        case CLEAR_PRICE:
            return {};
        default:
            return state;
    }
};

export default latestPriceReducer;
