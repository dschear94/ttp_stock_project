import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { getLastPrices, clearPrices } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { getUpdatedUser } from '../../actions/user_actions'

const mapState = (state, ownprops) => {
    let errors;
    const stockInfo = state.entities.latestPrice;
    const balance = state.entities.user.balance;
    const userId = state.entities.user.id;
    const transactions = state.entities.user.transactions;

    return {
        userId: userId,
        transactions: transactions,
        stockInfo: stockInfo,
        balance: balance,
        errors
    }

}

const mapDispatch = dispatch => {
    return {
        processForm: formData => dispatch(createTransaction(formData)),
        checkPrice: ticker => dispatch(getLastPrices([ticker])),
        clearPrices: () => dispatch(clearPrices()),
        getUpdatedUser: () => dispatch(getUpdatedUser())
    }
}

export default connect(mapState, mapDispatch)(Portfolio);