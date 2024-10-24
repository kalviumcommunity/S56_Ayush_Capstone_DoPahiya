import React, { useEffect, useState , useContext} from 'react'
import Navbar from '../Components/Navbar'
import "./Explore.css"
import Footer from '../Components/Footer.jsx'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader.jsx'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Context} from "../App"

const Explore2 = () => {

  const [Bikes, setBikes] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [favList , setfavList] = useState(sessionStorage.getItem("fav"))
  const {completeData} = useContext(Context)


  useEffect(() => {
    window.scrollTo({
      top: 0
    })
  }, [])

  useEffect(()=>{
    let filteredData = completeData.filter((el , i)=>{
      if (el.brand_id == id) {
        return el
      }
    })

    setBikes(filteredData)
    setIsLoading(false)
  },[completeData])


  let handleClick = (name) => {
    navigate(`/bike/${name}`)
  }

  const handleFavoriteClick = (event , id) => {
    event.stopPropagation();
    console.log(id)
    handleAddFav(id)
  }

  let handleAddFav = (id) =>{
    axios.post(`${API_URL}/handlefav` , {id : id} , {
        headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
      })
        .then((res)=>{
            setfavList(res.data.arr)
            sessionStorage.setItem("fav" , JSON.stringify(res.data.arr))
        })
        .catch((err)=>{
            console.log(err)
            return toast.error(err.response.data , {autoClose: 1000 , position: "top-center", hideProgressBar: true , theme: "colored"})
        })
}


  return (
    <div className='explore-main-div'>
      <Navbar />
      <div>
        {isLoading ? <Loader /> :
          <div className='explore-main flex jus-cen align-cen'>
            <h1>Explore Bike Brands</h1>
            <div className='explore-grid-cont'>
              {Bikes.map((el, i) => {
                return <div className='explore-card flex jus-cen align-cen' key={i} style={
                  { 
                    flexDirection: "column", 
                    gap: "10px",
                    position: "relative" 
                  }
                  } onClick={() => handleClick(el.name)}>
                    <div className="flex jus-cen">
                      <img src={el.banner} alt={el.name} />
                      {favList.includes(el._id) ? <MdFavorite style={{position: "absolute" , right:"5%" , top:"8%", zIndex:10, color:"red"}} onClick={(event) => handleFavoriteClick(event , el._id)}/> : <MdFavoriteBorder  style={{position: "absolute", right:"5%" , top:"8%", zIndex:10}} onClick={(event) => handleFavoriteClick(event , el._id)}/>}
                    </div>
                  <h6>{el.name}</h6>
                </div>
              })}
            </div>

          </div>
        }
      </div>

      <Footer />

      <ToastContainer />
    </div>
  )
}

export default Explore2
