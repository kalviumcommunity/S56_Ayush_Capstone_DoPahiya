import React , {useContext} from 'react'
import "./SearchBike.css"
import {Context} from "../App.jsx"

const SearchBike = ({position , background}) => {

    const {LoginModal , setLoginModal} = useContext(Context)

    let handleNavigation = (path) =>{
        if (sessionStorage.getItem("loggedin") == "true"){
            
        }else{
            setLoginModal(!LoginModal)
        }
    }

  return (
    <div className='searchbike-body flex jus-cen align-cen' style={{position : position}}>
        <div style={{background : background}}>
            <h3>Search Bike</h3>

            <div className='searchbike-btn-div flex'>
                <select>
                    <option value="brand">Brand</option>
                </select>
                <select>
                    <option value="model">Model</option>
                </select>
                <button onClick={() => handleNavigation()}>SEARCH</button>
            </div>
        </div>
    </div>
  )
}

export default SearchBike
