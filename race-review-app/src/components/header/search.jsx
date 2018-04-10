import React from 'react';

export default (props) => {
    const filters = (props.filtersOpen) ? (
        <div className="row">
                    <input type="text" placeholder="Location" className="location"/>
                    <select name="" id="">
                        <option selected disabled>Bike Type</option>
                    </select>
                    <select name="" id="">
                        <option selected disabled>Race Category</option>
                    </select>
        </div>
    ) : (
        <span></span>
    );
    return (
        <div className="search-container">
                    <input type="text" placeholder="Seach keywords (race name, type, etc)" className="search-bar"/>
                    <button onClick={() => props.openFilter()}>Filters</button>
                    <button type="submit"><img src={require('../../assets/img/search-icon-white.png')} alt="search"/></button>
                    {filters}
         </div>
    );
}
