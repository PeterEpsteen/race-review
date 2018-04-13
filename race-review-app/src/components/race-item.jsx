import React from 'react';
import {formatDate} from '../utilities/date'
import './race-item.css'
const RaceItem = ({race}) => {
    const date = race.currentRaceDate ? <p>{formatDate(new Date(race.currentRaceDate))}</p> :
    "";
    return (
        <div className="race-item">
            <div className="col">
                <div className="image-container">
                    {race.raceType}
                </div>
            </div>
            <div className="col">
            <div>
                <h2>{race.name}</h2>
                <p>{race.location.city}, {race.location.state}</p>
                {date}
                <p>{race.bikeType} - {race.raceType}</p>
            </div>
            </div>
        </div>
    );
}

export default RaceItem;