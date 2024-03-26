import React from 'react'
import "./Footer.css"
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import LogoNoBg from "../assets/LogoNoBg.png"
const Footer = () => {
  return (
    <div className='footer-main'>
        <div className='footer-content'>
            <div className='footer-img'>
                <img src={LogoNoBg}/>
            </div>
            <div className='flex jus-spAro'>
                <div className='footer-links'>
                    <h2>Quick Links</h2>

                    <ul>
                        <li>Home</li>
                        <li>Bikes</li>
                        <li>Compare</li>
                        <li>FindMyPerfectBike</li>
                        <li>FeedBack</li>
                        <li>Contact Details</li>
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
