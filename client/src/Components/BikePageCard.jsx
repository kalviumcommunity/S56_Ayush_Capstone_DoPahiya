import React , { useState } from 'react'
import "../Pages/Bikes.css"
import { useNavigate } from 'react-router-dom'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from 'axios';

const BikePageCard = ({el}) => {

  const [favList , setfavList] = useState(sessionStorage.getItem("fav"))
  const navigate = useNavigate()

  const handleFavoriteClick = (event , id) => {
    event.stopPropagation();
    handleAddFav(id)
  }

  let handleAddFav = async (id) =>{
    await axios.post(`https://s56-ayush-capstone-dopahiya.onrender.com/handlefav` , {id : id , user: sessionStorage.getItem("curruser")})
      .then((res)=>{
        console.log(res.data)
        setfavList(res.data.arr)
        sessionStorage.setItem("fav" , JSON.stringify(res.data.arr))
      })
      .catch((err)=>{
        console.log(err)
        toast.error("Error occurred while adding to favorites. Please try again later.")
      })
  }

  return (
    
      <div className="card" onClick={() => navigate(`/bike/${el.name}`)}>
        {favList.includes(el._id) ? <MdFavorite style={{position: "absolute" , right:"5%" , top:"8%", zIndex:"100", color:"red"}} onClick={(event) => handleFavoriteClick(event , el._id)}/> : <MdFavoriteBorder  style={{position: "absolute", right:"5%" , top:"8%", zIndex:"100"}} onClick={(event) => handleFavoriteClick(event , el._id)}/>}
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
  )
}

export default BikePageCard
