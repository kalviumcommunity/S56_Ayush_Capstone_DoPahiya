import React , {useContext, useEffect , useState} from 'react'
import "./SearchBike.css"
import {Context} from "../App.jsx"
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const SearchBike = ({position , background}) => {

    const {LoginModal , setLoginModal, bikeBrands, completeData} = useContext(Context)
    const [brandData , setBrandData] = useState([])
    const [bikeData , setBikeData] = useState([])
    const [brandValue , setBrandValue] = useState("brand")
    const [modelValue , setModelValue] = useState("model")
    const navigate = useNavigate()

    let handleNavigation = () =>{
        if (sessionStorage.getItem("loggedin") == "true"){
            if(brandValue !== "brand" && modelValue !== "model"){
                navigate(`/bike/${modelValue}`)
            }else{
                console.log("hello")
                alert("Please Select Brand and Model")
            }
        }else{
            setLoginModal(!LoginModal)
        }
    }

    useEffect(()=>{
        setBrandData(bikeBrands)
    } , [bikeBrands])

    useEffect(()=>{
        setBikeData(completeData)
    } , [brandValue , completeData])

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
                <button onClick={() => handleNavigation()}> <span className='search-txt'>SEARCH</span> <FaSearch className='search-icon'/></button>
            </div>
        </div>

    </div>
  )
}

export default SearchBike
