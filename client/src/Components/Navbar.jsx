import React, { useContext, useState, useEffect, useRef } from 'react'
import "./Navbar.css"
import Logo from "../assets/LogoNoBg.png"
import { Context } from "../App.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ color }) => {

    const { LoginModal, setLoginModal, RegisterModal, setRegisterModal } = useContext(Context)
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    let handleLoginBtn = () => {

        console.log(sessionStorage.getItem("loggedin"))
        if (sessionStorage.getItem("loggedin") == "true") {
            setShowDropdown(!showDropdown)
            sessionStorage.setItem("loggedin", false)
            sessionStorage.setItem("curruser", null)
            let cookies = document.cookie.split("; ")
            cookies.forEach((el) => {
                let cookie = el.split("=")[0]
                document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure`
            })
            navigate("/")
            window.location.reload()
        } else {
            setLoginModal(!LoginModal)
        }
    }

    let handleNavigation = (path) => {
        setShowDropdown(!showDropdown)
        if (sessionStorage.getItem("loggedin") == "true") {
            navigate(path)
        } else {
            setLoginModal(!LoginModal)
        }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const newScrollProgress = (scrollTop / scrollHeight) * 100;
            setScrollProgress(newScrollProgress);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className='navbar-body'>
            <div className="progress-container">
                <div className="progress-bar" id="progressBar" style={{ width: `${scrollProgress}%` }}></div>
            </div>
            <div className='navbar-body-main flex jus-spBet align-cen'>
                <div className='navbar-logo-div'>
                    <img src={Logo} />
                </div>

                <div className='navbar-links-div'>
                    <ul className='navbar-links-list flex' style={{ color: color }}>
                        <li className='links' onClick={() => handleNavigation("/")}>Home</li>
                        <li className='links' onClick={() => handleNavigation("/bikes")}>Bikes</li>
                        <li className='links' onClick={() => handleNavigation("/compare")}>Compare</li>
                        <li className='links' onClick={() => handleNavigation("/findmyperfectbike")}>FindMyPerfectBike</li>
                        <li className='links' onClick={() => handleNavigation("/feedback")}>Feedback</li>
                    </ul>
                </div>

                {sessionStorage.getItem("loggedin") == "true" ? <div className="dropdown" ref={dropdownRef}>
                    <button className="dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
                        <img src={sessionStorage.getItem("profileImg")} alt="profileImg" />
                    </button>
                    <ul className="dropdown-content" style={{ display: showDropdown ? "block" : "none" , zIndex:50 }}>
                        <li className={`${window.location.pathname == "/" ? "activepath" : ""}`} onClick={() => handleNavigation("/")}>Home</li>
                        <li className={`${window.location.pathname == "/bikebrands" ? "activepath" : ""}`} onClick={() => handleNavigation("/bikebrands")}>Explore</li>
                        <li className={`${window.location.pathname == "/bikes" ? "activepath" : ""}`} onClick={() => handleNavigation("/bikes")}>Bikes</li>
                        <li className={`${window.location.pathname == "/compare" ? "activepath" : ""}`} onClick={() => handleNavigation("/compare")}>Compare</li>
                        <li className={`${window.location.pathname == "/findmyperfectbike" ? "activepath" : ""}`} onClick={() => handleNavigation("/findmyperfectbike")}>FindMyPerfectBike</li>
                        <li className={`${window.location.pathname == "/feedback" ? "activepath" : ""}`} onClick={() => handleNavigation("/feedback")}>Feedback</li>
                        <li>
                            <Link to={"/profile"}>My Profile</Link>
                        </li>
                        <li onClick={handleLoginBtn}>
                            Logout
                        </li>
                    </ul>
                </div> :

                    <div className="navbar-btn-div dropdown" ref={dropdownRef}>
                        <button onClick={handleLoginBtn}>{sessionStorage.getItem("loggedin") == "true" ? "Logout" : "Login"}</button>
                        <GiHamburgerMenu className='hamburger' style={{ color: color }} onClick={() => setShowDropdown(!showDropdown)} />
                        <ul className="dropdown-content" style={{ display: showDropdown ? "block" : "none" }}>
                            <li className={`${window.location.pathname == "/" ? "activepath" : ""}`} onClick={() => handleNavigation("/")}>Home</li>
                            <li className={`${window.location.pathname == "/bikebrands" ? "activepath" : ""}`} onClick={() => handleNavigation("/bikebrands")}>Explore</li>
                            <li className={`${window.location.pathname == "/bikes" ? "activepath" : ""}`} onClick={() => handleNavigation("/bikes")}>Bikes</li>
                            <li className={`${window.location.pathname == "/compare" ? "activepath" : ""}`} onClick={() => handleNavigation("/compare")}>Compare</li>
                            <li className={`${window.location.pathname == "/findmyperfectbike" ? "activepath" : ""}`} onClick={() => handleNavigation("/findmyperfectbike")}>FindMyPerfectBike</li>
                            <li className={`${window.location.pathname == "/feedback" ? "activepath" : ""}`} onClick={() => handleNavigation("/feedback")}>Feedback</li>
                            <hr />
                            <li onClick={handleLoginBtn}>
                                Login
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
