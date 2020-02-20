import * as APIUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

export const receiveTransaction = (transactionData) => {
    return {
        type: RECEIVE_TRANSACTION,
        transactionData
    }
};

export const createTransaction = transaction => dispatch => {
    return APIUtil.createTransaction(transaction).then(transaction => (
        dispatch(receiveTransaction(transaction))
    ));
};