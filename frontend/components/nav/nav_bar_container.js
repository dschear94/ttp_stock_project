import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import Navbar from './nav_bar';

const mapStateToProps = (state) => {
    let { session, entities: { users } } = state;
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);