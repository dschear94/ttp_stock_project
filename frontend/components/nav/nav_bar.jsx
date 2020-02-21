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

        const logout = currentUser.id ? (
            <button onClick={this.handleLogout}>
                logout
            </button>
        ) : null;

            return (
                <div className="nav-container">
                    <div className="nav-container-left">
                        <Link to="/">TTP Stock App</Link>
                    </div>
                    <div className="nav-container-right">
                        <NavLink to="/portfolio">Portfolio</NavLink>
                        <NavLink to="/transactions">Transactions</NavLink>
                        {logout}
                    </div>
                </div>
            )
        }
};


export default withRouter(Navbar);
