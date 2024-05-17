import React from 'react'
import "../Pages/Bikes.css"
import { Link } from 'react-router-dom'

const BikePageCard = ({cardWidth , cardHeight , border ,el}) => {
  console.log(el)
  return (
    <Link to={`/bike/${el.name}`} className='links'>
      <div className="card" style={{width:cardWidth , height:cardHeight , border:border}}>
        <div className='visible-content'>
          <img src={el.banner} />
          <h4 className="card-text">{el.name}</h4>
        </div>
        <div className="hidden-content">
            <p className="hidden-text">Price : {el.exShowroomPrice}</p>
            <p className="hidden-text">BodyType : {el.bodyType[0]}</p>
            <p className="hidden-text">Mileage : {el.cityMileage}</p>
        </div>
      </div>
    </Link>
  )
}

export default BikePageCard
