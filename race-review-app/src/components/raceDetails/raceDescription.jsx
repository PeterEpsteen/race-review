import React from 'react';
import './raceDescription.css'
const RaceDescription = ({race, rateRace}) => {
    const state = ((race.location || {}).state);
    const city = ((race.location || {}).city);
    if (race.location && race.postedBy) {
        const rateError = race.rateError ? 
            <span>{race.rateError.response.data.message}</span> : '';
        return (
            <div className="raceDescription">
            <div className="row">
            <h2>{race.name}</h2> 
            <span> Rating: {(race.rateValue || 0) / (race.ratingCount || 1)}/5
            </span>
            </div>
                <h5>{race.bikeType} - {race.raceType}</h5>
                <p>
                    <span>{city}, {state} </span>
                </p>
                {(race.organizer) ? <p>{race.organizer}</p> : ""}
                <p>Posted by: {race.postedBy.username}</p>
                Rate this race:
                <div className="row starRow">
                    <button onClick={() => rateRace(1)}>☆</button>
                    <button onClick={() => rateRace(2)}>☆</button>
                    <button onClick={() => rateRace(3)}>☆</button>
                    <button onClick={() => rateRace(4)}>☆</button>
                    <button onClick={() => rateRace(5)}>☆</button>
                </div>
                {rateError}
                <div className="row">
                Rating Count: 
                {race.ratingCount}
                </div> 
                <div className="row">
                Rating Value: 
                {race.rateValue}
                </div>
                <div className="row">
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                loading...
            </div>
        );
    }
}

export default RaceDescription;