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
            <button onClick={this.handleLogout}
            className="logout-button">
                logout
            </button>
        ) : null;

            return (
                <div className="nav-container">
                    <div className="nav-container-left">
                        <div className="nav-link-wrapper">
                            <Link className="nav-link-home" to="/">TTP Stock App</Link>
                        </div>
                    </div>
                    <div className="nav-container-right">
                        <div className="nav-link-wrapper">
                            {currentUser.id ? <NavLink className="nav-link" activeStyle={{ backgroundColor: "rgb(32, 32, 32)" }} to="/portfolio">Portfolio</NavLink> : null}
                        </div>
                        <div className="nav-link-wrapper">
                            {currentUser.id ? <NavLink className="nav-link" activeStyle={{ backgroundColor: "rgb(32, 32, 32)" }} to="/transactions">Transactions</NavLink> : null}
                        </div>                       
                        <div className="nav-link-wrapper">
                            {logout}
                        </div> 
                        
                    </div>
                </div>
            )
        }
};


export default withRouter(Navbar);
