import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {signUpUser} from '../../actions';
import './auth.scss';
import {imgSrc} from './signin';


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
            <div className="container main-container sign-up">
                <div className="col"></div>
                <div className="col">
                    <h1>Sign Up</h1>
                    <h4>Already have an account? <Link to="/signin">Sign In</Link></h4>
                    <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
                        <fieldset>
                            <Field name="username" placeholder="Username" component="input"  type="text" />
                        </fieldset>
                        <fieldset>
                            <Field name="email" placeholder="Email" component="input"  type="text" />
                        </fieldset>
                        <fieldset>
                            <Field name="password" placeholder="Password" component="input"  type="password"/>
                        </fieldset>
                        <fieldset>
                            <Field name="confirmPassword" placeholder="Confirm Password" component="input"  type="password"/>
                        </fieldset>
                        {this.renderAlert()}
                        <button type="submit">Sign Up</button>
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