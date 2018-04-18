import { combineReducers } from 'redux';
import authenticatedReducer from './authentication';
import raceReducer from './race';
import paramsReducer from './params';
import currentRaceReducer from './currentRace';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
    authenticated: authenticatedReducer,
    form: form,
    races: raceReducer,
    params: paramsReducer,
    race: currentRaceReducer
});

export default rootReducer;