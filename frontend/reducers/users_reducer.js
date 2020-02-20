import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions'
import { RECEIVE_UPDATED_USER } from '../actions/user_actions';
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser ;
        case RECEIVE_UPDATED_USER:
            return action.updatedUser ;
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_TRANSACTION:
            const newState = merge({}, state);
                newState.balance -= (action.transactionData.quantity * parseFloat(action.transactionData.price));
            return newState;
        default:
            return state;
    }
};

export default usersReducer;
