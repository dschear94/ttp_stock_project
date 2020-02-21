import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import NavBarContainer from "./nav/nav_bar_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import Splash from "./splash/splash";
import PortfolioContainer from "./portfolio/portfolio_container";
import TransactionsContainer from "./transactions/transactions_container";

import {
    AuthRoute,
    ProtectedRoute
} from "../util/route_util"

const App = () => {
    return (
    <div>
        <NavBarContainer />
        <AuthRoute exact path='/' component={Splash} />
        <AuthRoute exact path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />
        <Switch>
            <ProtectedRoute path='/portfolio' component= {PortfolioContainer}/>
            <ProtectedRoute exact path='/transactions' component= {TransactionsContainer}/>
        </Switch>
    </div>
)};

export default App;