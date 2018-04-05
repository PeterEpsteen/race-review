import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Resources from './resources';
class Home extends Component {
    render() {
        return(
            <div>
                <h1>Home</h1>
                {this.props.children}
            </div>
        );
    }
}

export default Home;