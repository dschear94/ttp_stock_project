import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import latestPrice from './latest_price_errors_reducer';
import transactions from './transaction_errors_reducer'

export default combineReducers({
    session,
    latestPrice,
    transactions
});
