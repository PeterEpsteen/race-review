import { combineReducers } from 'redux';
import authenticatedReducer from './authentication';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
    authenticated: authenticatedReducer,
    form: form
});

export default rootReducer;