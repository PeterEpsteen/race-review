import {
    AUTH_ERROR,
    AUTH_USER,
    UNAUTH_USER
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            console.log('authing...');
            return {...state, authenticated: true};
        case UNAUTH_USER:
            localStorage.removeItem('token');
            return {...state, authenticated: false};
        case AUTH_ERROR:
            return {...state, authenticated: false, error: action.payload};
        default:
            return state;
    }
}