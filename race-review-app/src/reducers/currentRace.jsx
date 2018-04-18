import {
    GET_RACE,
    GET_RACE_ERROR,
    GET_COMMENTS,
    GET_COMMENTS_ERR
} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_RACE:
            return action.payload;
        case 'RATE_ERROR':
            return {...state, rateError: action.payload};
        case GET_COMMENTS: 
            return {...state, comments: action.payload.comments}
        case GET_COMMENTS_ERR:
            return {...state, commentsError: action.payload};
        case 'COMMENT_ERROR':
            return {...state, commentError: action.payload};
        default: 
            return state;
    }
}