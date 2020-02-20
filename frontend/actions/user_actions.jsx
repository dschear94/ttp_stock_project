import * as APIUtil from '../util/user_api_util';

export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER';

export const receiveUpdatedUser = updatedUser => ({
    type: RECEIVE_UPDATED_USER,
    updatedUser
});

export const getUpdatedUser = () => dispatch => (
    APIUtil.getUpdatedUser().then(user => (
        dispatch(receiveUpdatedUser(user))
    ))
);