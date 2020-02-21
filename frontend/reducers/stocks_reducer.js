import { merge } from 'lodash';
import { RECEIVE_LAST_PRICES } from "../actions/stock_actions";

const stocksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LAST_PRICES:
            let newState = {};
            action.stockInfo.forEach(stock => {
                let ticker = stock.symbol;
                newState[ticker] = stock;
            })
            return merge({}, state, newState);
        default:
            return state;
    }
};

export default stocksReducer;
