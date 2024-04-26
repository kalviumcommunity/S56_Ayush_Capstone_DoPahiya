import React , {useEffect , useState} from 'react'
import Navbar from '../Components/Navbar'
import "./Explore.css"
import Footer from '../Components/Footer.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader.jsx'

const Explore = () => {

  const [BikeBrandLogo , setBikeBrandLogo] = useState([])  
  const navigate = useNavigate()
  const [isLoading , setIsLoading] = useState(true)

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:3200/getbrands")
      .then((res)=>{
        setBikeBrandLogo(res.data)
        setIsLoading(false)
      })
  })

  let handleClick = (brand_id) =>{
    navigate(`/brand/${brand_id}`)
  }

  console.log(BikeBrandLogo)

  return (
    <div className='explore-main-div '>
      <Navbar />
      <div>
        {isLoading ? <Loader /> : 
          <div className='explore-main flex jus-cen align-cen'>
          <h1>Explore Bike Brands</h1>
          <div className='explore-grid-cont'>
              {BikeBrandLogo.map((el,i)=>{
                  return <div onClick={()=>handleClick(el.brand_id)} className='explore-card flex jus-cen align-cen' key={i}><img src={el.logo} alt={el.name} /></div>
              })}
          </div>
  
        </div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Explore
