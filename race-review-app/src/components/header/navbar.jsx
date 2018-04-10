import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const authNavItems = (props.authed) ? [
        <li key="addRaceLink" ><Link to="/add-race">Add Race</Link></li>, 
        <li key="profileLink" ><Link to="/profile">Profile</Link></li>,   
        <li key="signoutLink" ><a href="#" onClick={() => props.signOut()}>Sign Out</a></li> 
    ] : [
        <li key="signinLink"><Link to="/signin">Sign In</Link></li>, 
        <li key="signupLink"><Link to="/signup">Sign up</Link></li>
    ];

    const navItems = (props.showLinks) ? (
        <ul>
            <li><span className="logo"><Link to="/">Race Review</Link></span></li>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/resources">Protected</Link></li>
            {authNavItems}
        </ul>
    ) : (
        <ul>
            <li><span className="logo"><Link to="/">Race Review</Link></span></li>
        </ul>
    )

    return navItems;
}