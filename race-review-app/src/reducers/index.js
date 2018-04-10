import { combineReducers } from 'redux';
import authenticatedReducer from './authentication';
import raceReducer from './race';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
    authenticated: authenticatedReducer,
    form: form,
    races: raceReducer
});

export default rootReducer;