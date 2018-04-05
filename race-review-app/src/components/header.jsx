import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {authenticate} from '../actions';
import {bindActionCreators} from 'redux';
import {AUTH_USER, UNAUTH_USER} from '../actions/types';

class Header extends Component {
    authButton() {
        const isAuthenticated = this.props.authenticated;
        if(isAuthenticated) {
            return <button onClick={() => {this.props.dispatch({type: UNAUTH_USER})}}>Sign Out</button>;            
        }
        return <button>Sign in</button>;
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.authenticated);
    }

    renderNavItems() {
        if(this.props.authenticated) {
            return [
                <li>
                    <Link to="/resources">Protected</Link>
                </li>,
                <li>
                    {this.authButton()}
                </li>
            ];
        }

        return [
            <li>
                <Link to="/signin">Sign In</Link>
            </li>,
            <li>
                <Link to="/resources">Protected</Link>
            </li>,
            <li>
                {this.authButton()}
            </li>
        ];
    }

    render() {
        return(
            <nav className="header">
                <ul>
                   {this.renderNavItems()}
                </ul>
            </nav>
        );
    }
}


function mapStateToProps(state) {
    return {authenticated: state.authenticated.authenticated};
}
function mapDispatchToProps(dispatch) {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);