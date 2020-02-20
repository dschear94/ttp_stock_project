import { connect } from 'react-redux';
import Portfolio from './portfolio';

const mapState = (state, ownprops) => {
    return {
        state
    }
}

const mapDispatch = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
    }
}

export default connect(mapState, mapDispatch)(Portfolio);