import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {signUpUser} from '../../actions';


class Signup extends Component {
    handleFormSubmit({username, email, password}) {
        this.props.signUpUser({username, email, password});
    }

    componentWillReceiveProps(newProps) {
        if(newProps.authenticated === true) {
            this.props.history.push('/resources');
        }
        console.log(newProps.authenticated);
    }

    renderAlert() {
        if(this.props.error && this.props.error.page === 'signup') {
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
            <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <Field name="username" component="input"  type="text" />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email:</label>
                    <Field name="email" component="input"  type="text" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <Field name="password" component="input"  type="password"/>
                </fieldset>
                {this.renderAlert()}
                <button type="submit">Sign Up</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpUser: (obj) => {
            dispatch(signUpUser(obj))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated.authenticated,
        error: state.authenticated.error
    }
}

Signup = withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
export default reduxForm({
    form: 'signin',
})(Signup);