import React , {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginPage from './LoginPage'
import Register from './Register.jsx'
import Navbar from '../Components/Navbar'
import { Context } from "../App.jsx"
import SearchBike from '../Components/SearchBike.jsx'
import Section1Img from "../assets/Section1Img.png"
import Section2Img from "../assets/Section2Img.jpg"
import Img3 from "../assets/ktm.png"
import Img2 from "../assets/Harley.png"
import Img4 from "../assets/Re.png"
import Img1 from "../assets/bajaj.png"
import "./Home.css"
import Footer from '../Components/Footer.jsx'
import MB from "../assets/Motorcycle.png"

const Home = () => {
  
  const navigate = useNavigate()

  window.scrollTo({
    top:0
  })
  const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)

  let handleExplore = () =>{
    document.getElementById("bike-img").style.visibility = "visible"
    document.getElementById("explore-text").classList.add("slide-out-bck-bottom")
    document.getElementById("bike-img").classList.add("slide-out-right")
    setTimeout(()=>{
      navigate("/bikebrands")
    },1500)
  }

  return (
    <div>
      <div className='home-hero-section-body'>
        <Navbar color={"white"}/>
        <div className='home-hero-section'>
          <h1>Find Your Perfect Ride with “DoPahiya” Where Every Journey Begins</h1>
          <div className='flex jus-cen align-cen'>
            <SearchBike position="absolute"/>
          </div>
        </div>
      </div>

      <div className='home-section flex jus-spAro align-cen'>
        <div className='home-section1-img'>
          <img src={Section1Img} />
        </div>
        <div className='home-section1-content'>
          <h1>Explore Bike Comparison</h1>

          <p>Explore detailed comparisons of different bike models, from performance to features and beyond. Whether you're a seasoned rider or just starting your biking journey, our comprehensive insights empower you to make informed decisions and ride with confidence. Discover your ideal bike today and elevate your biking experience like never before.</p>

          <button className='home-section-btn'>Know More</button>
        </div>
      </div>

      <div className='home-section flex jus-spBet align-cen section2'>
        <div className='home-section2-img'>
          <img src={Section2Img} />
        </div>
        <div className='home-section2-content'>
          <h1> Your Bike, Your Way</h1>

          <p>Embark on a personalized journey to discover your perfect bike with our FindMyPerfectBike section. Answer a few simple questions about your preferences, riding style, and desired features, and let us guide you to the bike that suits you best. Whether you crave speed, seek adventure, or prioritize comfort, we're here to match you with the ideal ride that will elevate your biking experience to new heights</p>

          <button className='home-section-btn'>Know More</button>
        </div>
      </div>

      <div className='home-brands-section-main'>
        <h1>EXPLORE SOME FAMOUS BRANDS</h1>

        <div className='home-brands flex jus-cen align-cen'>
          <div className='flex jus-cen align-cen'><img src={Img1} /></div>
          <div className='flex jus-cen align-cen'><img src={Img2} /></div>
          <div className='flex jus-cen align-cen'><img src={Img3} /></div>
          <div className='flex jus-cen align-cen'><img src={Img4} /></div>
        </div>

        <div className='flex explore-btn-div'>
          <h4 onClick={handleExplore} id='explore-text'>Explore More</h4>
          <img src={MB} id="bike-img" style={{visibility:"hidden"}}/>
        </div>
      </div>

      <Footer />

{/* ------------------------------------------------------------------------------------------------------- */}
      <div className='flex jus-cen align-cen'>
        {LoginModal ? <LoginPage /> : <Register />}
      </div>
    </div>
  )
}

export default Home
