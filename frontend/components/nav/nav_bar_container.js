import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import Navbar from './nav_bar';

const mapStateToProps = (state) => {
    let { entities: { user } } = state;
    return {
        currentUser: user
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);