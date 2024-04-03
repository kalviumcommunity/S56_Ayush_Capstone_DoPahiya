import React , {useContext} from 'react'
import "./Navbar.css"
import Logo from "../assets/LogoNoBg.png"
import {Context} from "../App.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Navbar = ({color}) => {

    const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)


    

    let handleLoginBtn = () =>{
        console.log(sessionStorage.getItem("loggedin"))
        if (sessionStorage.getItem("loggedin") == "true"){
            sessionStorage.setItem("loggedin" , false)
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
                <li><Link className='links' to={"/"}>Home</Link></li>
                <li><Link className='links' to={"/bikes"}>Bikes</Link></li>
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
