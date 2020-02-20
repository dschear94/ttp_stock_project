import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { getLastPrices } from '../../actions/stock_actions';

const mapState = (state, ownprops) => {
    let errors;
    const price = state.entities.stocks.latestPrice;
    const balance = state.entities.user.balance;

    console.log(price);

    return {
        latestPrice: price,
        balance: balance,
        errors
    }

}

const mapDispatch = dispatch => {
    return {
        processForm: formData => dispatch(login(formData)),
        checkPrice: ticker => dispatch(getLastPrices([ticker]))
    }
}

export default connect(mapState, mapDispatch)(Portfolio);