import {
    AUTH_ERROR,
    AUTH_USER,
    GET_RACES,
    GET_RACES_ERROR
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

export function signUpUser({username, email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {username, email, password})
        .then((res) => {
            console.log(res.data);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                dispatch({type: AUTH_USER});
            }
        })
        .catch((err) => {
            console.log((err.response.data.error));
            err.page = "signup";
            return dispatch(authError(err));
        });
    }
}

export function authError(err) {
    return {
        type: AUTH_ERROR,
        payload: err
    }
}

export function getRaces() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/race`)
        .then((res) => {
            if (res.data)
                return dispatch({type: GET_RACES, payload: res.data});
        })
        .catch(err => dispatch({type: GET_RACES_ERROR, payload: err}));
    }
}