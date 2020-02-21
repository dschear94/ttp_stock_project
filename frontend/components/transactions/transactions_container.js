import { connect } from 'react-redux';
import Transactions from './transactions';
import { getLastPrices, clearPrices } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { getUpdatedUser } from '../../actions/user_actions'

const mapState = (state, ownprops) => {
    const transactions = state.entities.user.transactions;

    return {
        transactions: transactions,
    }

}

export default connect(mapState, null)(Transactions);