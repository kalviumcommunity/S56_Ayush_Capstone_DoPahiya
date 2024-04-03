import React from 'react'
import R15 from "../assets/r15.png"
import "../Pages/Bikes.css"

const BikePageCard = () => {
  return (
    <div className="card">
        <img src={R15} />
        <div className="card-body">
            <h4 className="card-text">Yamaha R15 V3</h4>
        </div>
    </div>
  )
}

export default BikePageCard
