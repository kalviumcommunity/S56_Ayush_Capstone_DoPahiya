import React from 'react'
import R15 from "../assets/r15.png"
import "../Pages/fmpb.css"


const FmpbComp = () => {
  return (
    <div className='bikelist-card flex align-cen jus-spBet'>
        <div>
            <img src={R15}/>
        </div>
        <div>
            <h4>Yamaha R15 V3</h4>
            <h6>Sports Bike</h6>
            <p>6 Speed Gearbox | 40 KMPL Mileage | 1.9 Lakh</p>
        </div>
        <div>
            <button>Explore</button><br />
            <button>Add to Fav</button>
        </div>
    </div>
  )
}

export default FmpbComp
