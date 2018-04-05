import {
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_USER
} from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';


export function signinUser({username, password}) {
    // Submit info to server
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {username, password})
        .then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({type: AUTH_USER});
        })
        .catch(err => {
            dispatch(authError(err));
        });
    }
}

export function authError(err) {
    return {
        type: AUTH_ERROR,
        payload: err
    }
}