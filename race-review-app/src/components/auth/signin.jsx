import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {signinUser} from '../../actions';

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
            <div>
                <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <label htmlFor="">Username:</label>
                    <Field name="username" component="input"  type="text" />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Password:</label>
                    <Field name="password" component="input"  type="password"/>
                </fieldset>
                {this.renderAlert()}
                <button type="submit">Sign In</button>
            </form>
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