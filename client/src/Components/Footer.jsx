import React , {useContext} from 'react'
import "./Footer.css"
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import LogoNoBg from "../assets/LogoNoBg.png"
import { Link , useNavigate} from 'react-router-dom';
import {Context} from "../App.jsx"


const Footer = () => {

    const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)
    const navigate = useNavigate()

    let handleNavigation = (path) =>{
        if (sessionStorage.getItem("loggedin") == "true"){
            navigate(path)
        }else{
            setLoginModal(!LoginModal)
        }
    }

  return (
    <div className='footer-main'>
        <div className='footer-content'>
            <div className='footer-img'>
                <img src={LogoNoBg}/>
            </div>
            <div className='footer-maincontent flex jus-spAro'>
                <div className='footer-links'>
                    <h2>Quick Links</h2>

                    <ul>
                        <li onClick={()=>handleNavigation("/")}>Home</li>
                        <li onClick={()=>handleNavigation("/bikes")}>Bikes</li>
                        <li onClick={()=>handleNavigation("/compare")}>Compare</li>
                        <li onClick={()=>handleNavigation("/findmyperfectbike")}>FindMyPerfectBike</li>
                        <li onClick={()=>handleNavigation("/feedback")}>FeedBack</li>
                    </ul>
                </div>
                <div className='footer-contact'>
                    <h2>Contact Details</h2>

                    <ul>
                        <li>9067469535</li>
                        <li>dopahiya@gmail.com</li>
                        <li>MIT-ADT UNIVERSITY</li>
                        <li><span className='flex jus-cen' style={{gap:"10px"}}><FaTwitter /><FaInstagram /><FaFacebook /></span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='footer-rights'>
            <h5>© 2024 DoPahiya. All rights reserved.</h5>
        </div>
    </div>
  )
}

export default Footer
