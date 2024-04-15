import React , {useContext , useState , useEffect} from 'react'
import "./Navbar.css"
import Logo from "../assets/LogoNoBg.png"
import {Context} from "../App.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Navbar = ({color}) => {

    const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)
    const [scrollProgress, setScrollProgress] = useState(0);

    let handleLoginBtn = () =>{
        console.log(sessionStorage.getItem("loggedin"))
        if (sessionStorage.getItem("loggedin") == "true"){
            sessionStorage.setItem("loggedin" , false)
            sessionStorage.setItem("curruser" , null)
            window.location.reload()
        }else{
            setLoginModal(!LoginModal)
        }
    }
    
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
            <div className="progress-bar" id="progressBar" style={{width:`${scrollProgress}%`}}></div>
        </div>
        <div className='navbar-body-main flex jus-spBet align-cen'>
            <div className='navbar-logo-div'>
                <img src={Logo}/>
            </div>

            <div className='navbar-links-div'>
                <ul className='navbar-links-list flex' style={{color:color}}>
                    <li><Link className='links' to={"/"}>Home</Link></li>
                    <li><Link className='links' to={"/bikes"}>Bikes</Link></li>
                    <li><Link className='links' to={"/compare"}>Compare</Link></li>
                    <li><Link className='links' to={"/findmyperfectbike"}>FindMyPerfectBike</Link></li>
                    <li><Link className='links' to={"/feedback"}>Feedback</Link></li>
                </ul>
            </div>

            <div className='navbar-btn-div flex align-cen'>
                <button onClick={handleLoginBtn}>{sessionStorage.getItem("loggedin") == "true" ? "Logout" : "Login"}</button>
                <GiHamburgerMenu className='hamburger' style={{color:color}}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
