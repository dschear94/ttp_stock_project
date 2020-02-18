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

const App = () => {
    return (
    <div>
        <NavBarContainer />
    </div>
)};

export default App;