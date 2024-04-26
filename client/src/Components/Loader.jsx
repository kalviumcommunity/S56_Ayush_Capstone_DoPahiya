import React from 'react'
import "./Loader.css"

const Loader = () => {
  return (
    <div className='flex jus-cen align-cen loader-div-main'>
        <div id="loop" className="center"></div>
        <div id="bike-wrapper" className="center">
            <div id="bike" className="centerBike"></div>
        </div>
    </div>
  )
}

export default Loader
