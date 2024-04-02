import React , {useContext} from 'react'
import "./Navbar.css"
import Logo from "../assets/LogoNoBg.png"
import {Context} from "../App.jsx"
import { Link , useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({color}) => {

    const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)
    let navigate = useNavigate()

    let handleLoginBtn = () =>{
        console.log(sessionStorage.getItem("loggedin"))
        if (sessionStorage.getItem("loggedin") == "true"){
            sessionStorage.setItem("loggedin" , false)
            navigate("/")
            window.location.reload()
        }else{
            setLoginModal(!LoginModal)
        }
    }

  return (
    <div className='navbar-body flex jus-spBet align-cen'>
        <div className='navbar-logo-div'>
            <img src={Logo}/>
        </div>

        <div className='navbar-links-div'>
            <ul className='navbar-links-list flex' style={{color:color}}>
                <li><Link to={"/"} className='links'>Home</Link></li>
                <li><Link to={"/bikes"} className='links'>Bikes</Link></li>
                <li>Compare</li>
                <li>FindMyPerfectBike</li>
                <li>Feedback</li>
            </ul>
        </div>

        <div className='navbar-btn-div flex align-cen'>
            <button onClick={handleLoginBtn}>{sessionStorage.getItem("loggedin") == "true" ? "Logout" : "Login"}</button>
            <GiHamburgerMenu className='hamburger'/>
        </div>
    </div>
  )
}

export default Navbar
