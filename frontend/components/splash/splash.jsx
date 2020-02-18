import React from 'react';
import { Link } from 'react-router-dom';


const Splash = props => {


    return (
        <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
        </>
    );
}
export default Splash;