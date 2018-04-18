import {
    AUTH_ERROR,
    AUTH_USER,
    GET_RACES,
    GET_RACES_ERROR,
    GET_RACE_PARAMS,
    RES_ERROR,
    GET_RACE,
    GET_RACE_ERROR,
    GET_COMMENTS,
    GET_COMMENTS_ERR
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

export function getRaceParams() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/race/params`)
        .then(res => {
            return dispatch(raceParamsData(res.data.params));
        })
        .catch(err => {
            return dispatch(resError(err));
        });
    }
}
export function submitRace(race) {
    return function(dispatch) {
        console.log(localStorage.getItem('token'));
        axios.post(`${ROOT_URL}/race`, 
                    race, 
                    {
                        headers: {
                        authorization: localStorage.getItem('token')
                        }
                    })
        .then(res => {
            console.log(res);
            dispatch({type: 'idk', payload: res});
        })
        .catch(err => {
            console.log(err);
            return dispatch({type: 'errrrr', payload: err});
        })
    }
}
function raceParamsData(data) {
    return {
        type: GET_RACE_PARAMS,
        payload: data
    }
}
export function resError(err) {
    return {
        type: RES_ERROR,
        payload: err
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

export function getRace(id) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/race/${id}`)
        .then(res => dispatch({type: GET_RACE, payload: res.data}))
        .catch(err => dispatch({type: GET_RACE_ERROR, payload: {error: true, body: err}}));
    }
}

export function rateRace(rateObj) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/race/rate`, 
                    rateObj,  {
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    }
                )
            .then(res => {
                console.log(res.data);
                dispatch(getRace(rateObj.raceId))
            })
            .catch(err => dispatch({type: 'RATE_ERROR', payload: err}));
    }
}

export function getComments(id) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/comment/${id}`)
        .then(res => dispatch({type: GET_COMMENTS, payload: res.data}))
        .catch(err => dispatch({type: GET_COMMENTS_ERR, err: err}));
    }
}

export function submitComment(body) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/comment/new`, 
                    body,  {
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    }
                )
            .then(res => {
                console.log(res.data);
                dispatch(getComments(body.race._id));
            })
            .catch(err => dispatch({type: 'COMMENT_ERROR', payload: err}));
    }
}