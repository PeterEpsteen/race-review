import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {AUTH_USER} from '../actions/types'
import Header from './header/header'
import AddRace from './add-race';
import Home from './home'
import Signin from './auth/signin';
import Signup from './auth/signup';
import Resources from './resources'
import './App.css';
import reducers from '../reducers';
import Aysnc from '../middlewares/async';
import requireAuth from './auth/require_auth';
import ReduxThunk from 'redux-thunk';
import RaceDetails from './raceDetails/raceDetails'

const createStoreWithMiddleware = applyMiddleware(Aysnc, ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({type: AUTH_USER});
}
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/resources" component={requireAuth(Resources)} />            
            <Route path="/signup" component={Signup} />
            <Route path="/add-race" component={AddRace} />
            <Route path="/race" component={RaceDetails} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
