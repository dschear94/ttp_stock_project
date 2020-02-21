import {
    RECEIVE_LATEST_PRICE_ERRORS,
} from '../actions/latest_price_actions';
import { CLEAR_ERRORS } from '../actions/session_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LATEST_PRICE_ERRORS:
            return action.errors || state;
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};

