import React, { Component } from 'react';
import RaceItem from './race-item';
import {connect} from 'react-redux';
import { getRaces } from '../actions/index';
class Home extends Component {
    componentWillMount() {
        this.props.getRaces();
    }
    renderList() {
        if (this.props.races.raceList) {
            console.log(this.props.races);
            return this.props.races.raceList.map(race => <RaceItem key={race._id} race={race}/>);
        }
    }
    render() {
        return(
            <div>
                <h1>All Races</h1>
                <div className="col">
                    <ul className="race-item-list">
                        {this.renderList()}
                    </ul>
                </div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
        );
    }

}
function mapDispatchToProps(dispatch) {
    return {
        getRaces: () => dispatch(getRaces())
    }
}

function mapStateToProps(state) {
    return {
        races: state.races
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);