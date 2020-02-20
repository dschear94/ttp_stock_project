import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { getLastPrices, clearPrices } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';

const mapState = (state, ownprops) => {
    let errors;
    const price = state.entities.latestPrice;
    const balance = state.entities.user.balance;
    const userId = state.entities.user.id;

    return {
        userId: userId,
        latestPrice: price,
        balance: balance,
        errors
    }

}

const mapDispatch = dispatch => {
    return {
        processForm: formData => dispatch(createTransaction(formData)),
        checkPrice: ticker => dispatch(getLastPrices([ticker])),
        clearPrices: () => dispatch(clearPrices()),

    }
}

export default connect(mapState, mapDispatch)(Portfolio);