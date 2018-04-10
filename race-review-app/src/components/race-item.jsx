import React from 'react';
import {formatDate} from '../utilities/date'
const RaceItem = ({race}) => {
    const date = formatDate(new Date(race.currentRaceDate));
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
                <p>{date}</p>
                <p>{race.bikeType} - {race.raceType}</p>
            </div>
            </div>
        </div>
    );
}

export default RaceItem;