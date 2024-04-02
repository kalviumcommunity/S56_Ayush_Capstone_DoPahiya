import React from 'react'
import Pulsar from "../assets/Pulsar.webp"
import "../Pages/Bikes.css"

const BikePageCard = () => {
  return (
    <div className="card">
        <img src={Pulsar} />
        <div className="card-body">
            <h4 className="card-text">Pulsar NS160</h4>
        </div>
    </div>
  )
}

export default BikePageCard
