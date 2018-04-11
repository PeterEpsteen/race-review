import { GET_RACE_PARAMS } from '../actions/types'

export default function(state = {}, action) {
    switch (action.type) {
        case GET_RACE_PARAMS:
            return action.payload;
        default:
            return state;
    }
}