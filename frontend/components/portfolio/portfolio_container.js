import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { getLastPrices } from '../../actions/stock_actions';

const mapState = (state, ownprops) => {
    let errors;
    const price = state.entities.stocks.latestPrice;
    debugger
    const balance = state.entities.user.balance;

    return {
        latestPrice: price,
        balance: balance,
        errors
    }

}

const mapDispatch = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
        checkPrice: ticker => dispatch(getLastPrices([ticker]))
    }
}

export default connect(mapState, mapDispatch)(Portfolio);