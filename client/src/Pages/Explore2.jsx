import React , {useEffect , useState} from 'react'
import Navbar from '../Components/Navbar'
import "./Explore.css"
import Footer from '../Components/Footer.jsx'
import axios from 'axios'
import { useParams , useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader.jsx'
<<<<<<< Updated upstream
=======
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { VITE_LocalURL , VITE_DeployedURL } = import.meta.env;


>>>>>>> Stashed changes

const Explore2 = () => {

  const [Bikes , setBikes] = useState([])  
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading , setIsLoading] = useState(true)

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
  },[])

  useEffect(()=>{
    axios.get("https://s56-ayush-capstone-dopahiya.onrender.com/getbikephotos")
      .then((res)=>{
        console.log(id)
        let filteredData = res.data.filter((el,i)=>{
            if (el.brand_id == id){
                return el
            }
        })
        setBikes(filteredData)
        setIsLoading(false)
      })
  },[])

  let handleClick = (name) =>{
    navigate(`/bike/${name}`)
  }

  console.log(Bikes)

<<<<<<< Updated upstream
=======
  const handleFavoriteClick = (event , id) => {
    event.stopPropagation();
    console.log(id)
    handleAddFav(id)
  }

  let handleAddFav = async (id) =>{
    await axios.post(`${VITE_DeployedURL}/handlefav` , {id : id , user: sessionStorage.getItem("curruser")})
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

>>>>>>> Stashed changes
  return (
    <div className='explore-main-div'>
      <Navbar />
      <div>
        {isLoading ? <Loader /> :   
        <div className='explore-main flex jus-cen align-cen'>
            <h1>Explore Bike Brands</h1>
            <div className='explore-grid-cont'>
                {Bikes.map((el,i)=>{
                    return <div className='explore-card flex jus-cen align-cen' key={i} style={{flexDirection:"column", gap:"10px"}} onClick={()=>handleClick(el.name)}><img src={el.banner} alt={el.name} /><h6>{el.name}</h6></div>
                })}
            </div>

        </div>
        }
      </div>

      <Footer />
    </div>
  )
}

export default Explore2
