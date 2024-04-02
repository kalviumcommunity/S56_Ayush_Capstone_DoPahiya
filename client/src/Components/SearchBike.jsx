import React from 'react'
import "./SearchBike.css"

const SearchBike = ({position , background}) => {
  return (
    <div className='searchbike-body flex jus-cen align-cen' style={{position:position}}>
        <div style={{background : background}}>
            <h3>Search Bike</h3>

            <div className='searchbike-btn-div flex'>
                <select>
                    <option value="brand">Brand</option>
                </select>
                <select>
                    <option value="model">Model</option>
                </select>
                <button>SEARCH</button>
            </div>
        </div>
    </div>
  )
}

export default SearchBike
