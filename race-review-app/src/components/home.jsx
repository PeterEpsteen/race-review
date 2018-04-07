import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Resources from './resources';
import {connect} from 'react-redux';

class Home extends Component {
    renderList() {
        if (this.props.races) {
            return this.props.races.map(race => <li>race.name</li>);
        }
    }
    render() {
        return(
            <div>
                <h1>Home</h1>
                <ul>
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        races: state.races
    };
}

export default connect(mapStateToProps)(Home);