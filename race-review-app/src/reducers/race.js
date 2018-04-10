import { GET_RACES, GET_RACES_ERROR } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_RACES:
            return {...state, raceList: action.payload};
        case GET_RACES_ERROR:
            return {...state, error: action.payload}
        default:
            return state;
    }
}