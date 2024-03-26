import React , {useContext} from 'react'
import "./Navbar.css"
import Logo from "../assets/LogoNoBg.png"
import {Context} from "../App.jsx"
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({color}) => {

    const {ShowModal , setShowModal} = useContext(Context)

  return (
    <div className='navbar-body flex jus-spBet align-cen'>
        <div className='navbar-logo-div'>
            <img src={Logo}/>
        </div>

        <div className='navbar-links-div'>
            <ul className='navbar-links-list flex' style={{color:color}}>
                <li>Home</li>
                <li>Bikes</li>
                <li>Compare</li>
                <li>FindMyPerfectBike</li>
                <li>Feedback</li>
            </ul>
        </div>

        <div className='navbar-btn-div flex align-cen'>
            <button onClick={()=>{setShowModal(!ShowModal)}}>Login</button>
            <GiHamburgerMenu className='hamburger'/>
        </div>
    </div>
  )
}

export default Navbar
