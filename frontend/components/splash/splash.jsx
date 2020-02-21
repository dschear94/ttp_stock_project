import React from 'react';
import { Link } from 'react-router-dom';


const Splash = () => {

    return (
        <div className="splash-container">
            <h1 className="splash-header">
                Welcome
            </h1>
            <br/>
            <div className="splash-links">
                <div className="signup-link-container">
                    <Link to="/signup" className="signup-link">Sign up</Link>
                </div>
                <br/>
                <div className="login-link-container">
                    <Link to="/login" className="login-link">Log In</Link>
                </div>
            </div>
        </div>
)}
export default Splash;