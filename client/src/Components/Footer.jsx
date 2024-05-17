import React from 'react'
import "./Footer.css"
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import LogoNoBg from "../assets/LogoNoBg.png"
import { Link } from 'react-router-dom';

const Footer = () => {
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
                        <Link to={"/"} className='links'><li>Home</li></Link>
                        <Link to={"/bikes"} className='links'><li>Bikes</li></Link>
                        <Link to={"/compare"} className='links'><li>Compare</li></Link>
                        <Link to={"/findmyperfectbike"} className='links'><li>FindMyPerfectBike</li></Link>
                        <Link to={"/feedback"} className='links'><li>FeedBack</li></Link>
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
