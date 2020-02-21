import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { getLastPrices, clearPrices } from '../../actions/stock_actions';
import { getLastPrice } from '../../actions/latest_price_actions'
import { createTransaction } from '../../actions/transaction_actions';
import { getUpdatedUser } from '../../actions/user_actions';
import { clearErrors } from '../../actions/session_actions'

const mapState = (state, ownprops) => {
    const latestPriceErrors = state.errors.latestPrice;
    const transactionErrors = state.errors.transactions;
    const errors = latestPriceErrors.concat(transactionErrors);
    const stockInfo = state.entities.stocks;
    const balance = state.entities.user.balance;
    const userId = state.entities.user.id;
    const transactions = state.entities.user.transactions;
    const latestPrice = state.entities.latestPrice;

    return {
        userId: userId,
        transactions: transactions,
        stockInfo: stockInfo,
        balance: balance,
        latestPrice: latestPrice,
        errors: errors
    }

}

const mapDispatch = dispatch => {
    return {
        processForm: formData => dispatch(createTransaction(formData)),
        checkPrices: tickers => dispatch(getLastPrices(tickers)),
        checkPrice: ticker => dispatch(getLastPrice(ticker)),
        clearPrices: () => dispatch(clearPrices()),
        clearErrors: () => dispatch(clearErrors()),
        getUpdatedUser: () => dispatch(getUpdatedUser())
    }
}

export default connect(mapState, mapDispatch)(Portfolio);