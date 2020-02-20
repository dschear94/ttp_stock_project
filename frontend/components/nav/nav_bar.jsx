import React from 'react';
import {
    Link,
    NavLink
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';



class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        let { currentUser } = this.props;
        
        const logout = currentUser ? (
            <button onClick={this.handleLogout}>
                logout
            </button>
        ) : null;

            return (
                <div>
                    <Link to="/">nav placeholder</Link>
                    {logout}
                </div>
            )
        }
};


export default withRouter(Navbar);
