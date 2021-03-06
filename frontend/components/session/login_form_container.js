import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import LoginForm from "./login_form";

const mapState = (state, ownprops) => {
    const formType = "login";
    const errors = state.errors.session
    return {
        formType,
        errors
    }
}

const mapDispatch = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()),

    }
}

export default connect(mapState, mapDispatch)(LoginForm);