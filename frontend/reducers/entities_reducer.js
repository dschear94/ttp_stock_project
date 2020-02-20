import { combineReducers } from 'redux';

import user from './users_reducer';
import stocks from './stocks_reducer';

export default combineReducers({
    user,
    stocks
});
