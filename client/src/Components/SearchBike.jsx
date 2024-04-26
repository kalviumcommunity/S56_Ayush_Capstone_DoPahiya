import React , {useContext, useEffect , useState} from 'react'
import "./SearchBike.css"
import {Context} from "../App.jsx"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchBike = ({position , background}) => {

    const {LoginModal , setLoginModal} = useContext(Context)
    const [brandData , setBrandData] = useState([])
    const [bikeData , setBikeData] = useState([])
    const [brandValue , setBrandValue] = useState("brand")
    const [modelValue , setModelValue] = useState("model")
    const navigate = useNavigate()

    let handleNavigation = () =>{
        if (sessionStorage.getItem("loggedin") == "true"){
            navigate(`/bike/${modelValue}`)
        }else{
            setLoginModal(!LoginModal)
        }
    }

    useEffect(()=>{
        let getBrands = () =>{
            axios.get("http://s56-ayush-capstone-dopahiya.onrender.com/getbrands")
                .then((res)=>{
                    setBrandData(res.data)
                })
                .catch((err)=>{
                    setBrandData(["No Data Found"])
                })
        }
        getBrands()
    } , [])

    useEffect(()=>{
        let getBikes = () =>{
            axios.get("http://s56-ayush-capstone-dopahiya.onrender.com/getbikes")
                .then((res)=>{
                    setBikeData(res.data)
                })
                .catch((err)=>{
                    setBikeData(["No Data Found"])
                })
        }
        getBikes()
    } , [brandValue])

    let filteredData = brandValue == "brand" ? bikeData : bikeData.filter((el,i)=>{
        if (el.brand_id == brandValue){
            return el
        }
    })
    

  return (
    <div className='searchbike-body flex jus-cen align-cen' style={{position : position}}>
        <div style={{background : background}}>
            <h3>Search Bike</h3>

            <div className='searchbike-btn-div flex'>
                <select onChange={(e)=>{setBrandValue(e.target.value)}}>
                    <option value="brand">Brand</option>
                    {brandData.map((el,i)=>{
                        return <option key={i} value={el.brand_id}>{el.name}</option>
                    })}
                </select>
                <select onChange={(e)=>{setModelValue(e.target.value)}}>
                    <option value="model">Model</option>
                    {filteredData.map((el , i)=>{
                        return <option key={i} value={el.name}>{el.name}</option>
                    })}
                </select>
                <button onClick={() => handleNavigation()}>SEARCH</button>
            </div>
        </div>
    </div>
  )
}

export default SearchBike
