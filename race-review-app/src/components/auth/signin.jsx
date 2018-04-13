import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {signinUser} from '../../actions';
import './auth.css';
export const imgSrc = "https://us.123rf.com/450wm/kittisaktaramas/kittisaktaramas1507/kittisaktaramas150700023/43571013-stock-vector-the-group-of-cyclists-man-in-road-bicycle-racing-go-to-the-mountain-vector-illustrator-.jpg?ver=6";

class Signin extends Component {
    handleFormSubmit({username, password}) {
        this.props.signinUser({username, password});
    }

    componentWillReceiveProps(newProps) {
        if(newProps.authenticated === true) {
            this.props.history.push('/resources');
        }
    }

    renderAlert() {
        if(this.props.error && this.props.error.page === 'signin') {
            return (
                <div className="alert">
                    <strong>{this.props.error.response.data.error}</strong>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container main-container sign-in">
            <div className="col"></div>
            <div className="col">
            <h1>Sign In</h1>
            <h4>Don't have an account yet? <Link to="/signup">Sign Up</Link></h4>
            <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <Field name="username" placeholder="Username" component="input" type="text" />
                </fieldset>
                <fieldset>
                    <Field name="password" component="input" placeholder="Password" type="password"/>
                </fieldset>
                {this.renderAlert()}
                <button type="submit">Sign In</button>
            </form>
            </div>
            <div className="col">
                <img src={imgSrc} alt="Bike Race"/>
            </div>
            <div className="col"></div>
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinUser: (obj) => {
            dispatch(signinUser(obj))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated.authenticated,
        error: state.authenticated.error
    }
}

Signin = withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
export default reduxForm({
    form: 'signin',
})(Signin);