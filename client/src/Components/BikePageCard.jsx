import React from 'react'
import R15 from "../assets/r15.png"
import "../Pages/Bikes.css"

const BikePageCard = () => {
  return (
    <div className="card">
      <div className='visible-content'>
        <img src={R15} />
        <h4 className="card-text">Yamaha R15 V3</h4>
      </div>
      <div className="hidden-content">
          <p class="hidden-text">Price : 1.9 Lakh</p>
          <p class="hidden-text">BodyType : Sports</p>
          <p class="hidden-text">Mileage : 45 KMPL</p>
      </div>
    </div>
  )
}

export default BikePageCard
