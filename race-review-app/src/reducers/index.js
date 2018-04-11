import { combineReducers } from 'redux';
import authenticatedReducer from './authentication';
import raceReducer from './race';
import paramsReducer from './params';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
    authenticated: authenticatedReducer,
    form: form,
    races: raceReducer,
    params: paramsReducer
});

export default rootReducer;