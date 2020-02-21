import * as StocksAPIUtil from "../util/stocks_api_util";

export const RECEIVE_LAST_PRICE = "RECEIVE_LAST_PRICE";
export const CLEAR_PRICE = "CLEAR_PRICE";
export const RECEIVE_LATEST_PRICE_ERRORS = 'RECEIVE_LATEST_PRICE_ERRORS';


const receiveLastPrice = stockInfo => {
    return {
        type: RECEIVE_LAST_PRICE,
        stockInfo
    }
}

export const clearPrice = () => {
    return {
        type: CLEAR_PRICE,
    }
}

export const receiveErrors = errors => ({
    type: RECEIVE_LATEST_PRICE_ERRORS,
    errors
});


export const getLastPrice = arrayOfTicker => dispatch => {
    return Promise.all(arrayOfTicker.map(ticker => StocksAPIUtil.getLastPrice(ticker)))
        .then(response => dispatch(receiveLastPrice(response)
        ), err => (
            dispatch(receiveErrors(err.responseText))
        ))
}