import React from 'react'
import R15 from "../assets/r15.png"
import "../Pages/fmpb.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const FmpbComp = ({el , setshowFav}) => {

  const handleFavoriteClick = (event , id) => {
    event.stopPropagation();
    console.log(id)
    handleAddFav(id)
  }

  let handleAddFav = async (id) =>{
    await axios.post(`https://s56-ayush-capstone-dopahiya.onrender.com/handlefav` , {id : id , user: sessionStorage.getItem("curruser")})
      .then((res)=>{
        console.log(res.data)
        sessionStorage.setItem("fav" , JSON.stringify(res.data.arr))
      })
      .catch((err)=>{
        console.log(err)
        toast.error("Error occurred while adding to favorites. Please try again later.")
      })
  }

  return (
    <div className='bikelist-card flex align-cen jus-cen'>
        <div>
            <img src={el.banner}/>
        </div>
        <div>
            <h4>{el.name}</h4>
            <h6>{el.bodyType[0] + " Bike"}</h6>
            <p>{el.gearBox + " Gearbox | " + el.cityMileage + " Mileage | " + el.exShowroomPrice/100000 + " Lakh"}</p>
        </div>
        <div>
            <Link to={`/bike/${el.name}`}><button>Explore</button></Link><br />
            <button className='fav-btn' onClick={(e)=>handleFavoriteClick(e , el._id)}>Remove from Fav</button>
        </div>
    </div>
  )
}

export default FmpbComp
