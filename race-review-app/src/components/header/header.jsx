import React, { Component } from 'react';
import NavBar from './navbar';
import SearchContainer from './search';
import {withRouter} from 'react-router-dom' 
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {UNAUTH_USER} from '../../actions/types';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerOpen: false,
            showLinks: (this.props.location.pathname !== '/signin')
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.onRouteChange();
        }
    }

    onRouteChange() {
        this.setState({showLinks: (this.props.location.pathname !== '/signin' && 
            this.props.location.pathname !== '/signup' )});
    }

    renderSearch() {
        if(this.props.location.pathname === "/") {
            return (
                <SearchContainer 
                    filtersOpen={this.state.containerOpen}
                    openFilter={() => this.setState({containerOpen: !this.state.containerOpen})}
                />
            );
        }
    }

    render() {
        console.log(this.props.location.pathname);
        const loc = this.props.location.pathname;
        const headerClass = (loc === '/signin' || loc === '/signup') ? "header sign-in-header" : "header";
        return(
            <nav className={headerClass}>
                <NavBar 
                    signOut={() => {this.props.dispatch({type: UNAUTH_USER})}} 
                    authed = {this.props.authenticated}
                    showLinks = {this.state.showLinks}
                />
                {this.renderSearch()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));