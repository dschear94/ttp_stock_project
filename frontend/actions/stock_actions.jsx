import * as StocksAPIUtil from "../util/stocks_api_util";
export const RECEIVE_LAST_PRICES = "RECEIVE_LAST_PRICES";
export const RECEIVE_HISTORICAL_PRICES = "RECEIVE_HISTORICAL_PRICES";
export const CLEAR_PRICES = "CLEAR_PRICES";


const receiveLastPrices = stockInfo => {
    return {
        type: RECEIVE_LAST_PRICES,
        stockInfo
    }
}

export const clearPrices = () => {
    return {
        type: CLEAR_PRICES,
    }
}


export const getLastPrices = arrayOfTickers => dispatch => {
    return Promise.all(arrayOfTickers.map(ticker => StocksAPIUtil.getLastPrice(ticker)))
        .then(response => dispatch(receiveLastPrices(response)))
}