import React , {useEffect} from 'react'
import Navbar from '../Components/Navbar'
import "./Explore.css"
import BikeBrandLogo from "../BrandLogo.js"
import Footer from '../Components/Footer.jsx'

const Explore = () => {

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
  },[])

  console.log(BikeBrandLogo)

  return (
    <div className='explore-main-div '>
      <Navbar />

      <div className='explore-main flex jus-cen align-cen'>
        <h1>Explore Bike Brands</h1>
        <div className='explore-grid-cont'>
            {BikeBrandLogo.map((el)=>{
                return <div className='explore-card flex jus-cen align-cen' key={el.name}><img src={el.logo} alt={el.name} /></div>
            })}
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Explore
