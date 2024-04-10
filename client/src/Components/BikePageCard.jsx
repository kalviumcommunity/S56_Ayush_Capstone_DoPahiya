import React from 'react'
import R15 from "../assets/r15.png"
import "../Pages/Bikes.css"
import { Link } from 'react-router-dom'

const BikePageCard = ({cardWidth , cardHeight , border , animation}) => {
  return (
    <Link to={'/bike'} className='links'>
      <div className="card" style={{width:cardWidth , height:cardHeight , border:border , animation:animation}}>
        <div className='visible-content'>
          <img src={R15} />
          <h4 className="card-text">Yamaha R15 V3</h4>
        </div>
        <div className="hidden-content">
            <p className="hidden-text">Price : 1.9 Lakh</p>
            <p className="hidden-text">BodyType : Sports</p>
            <p className="hidden-text">Mileage : 45 KMPL</p>
        </div>
      </div>
    </Link>
  )
}

export default BikePageCard
