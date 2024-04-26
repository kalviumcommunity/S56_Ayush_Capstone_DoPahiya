import React , {useEffect , useState} from 'react'
import "./BikeCompare.css"
import "./Bikes.css"
import Navbar from '../Components/Navbar'
import R15 from "../assets/r15.png"
import Footer from '../Components/Footer'
import CompareCard from '../Components/CompareCard'
import axios from 'axios'


const BikeCompare = () => {

    const [bike1Value , setBike1Value] = useState("none")
    const [bike2Value , setBike2Value] = useState("none")
    const [bike1Details , setBike1Details] = useState([])
    const [bike2Details , setBike2Details] = useState([])
    const [bikeData , setBikeData] = useState([])

    useEffect(()=>{
        window.scrollTo({
          top:0
        })
      },[])

    let mappedData = Object.keys(bike1Details).map((el , i)=>{
        if (el != "banner" && el != "photos"){ 
            return <tr key={i}>
                    <td>{typeof(bike1Details[el]) === "object" ? bike1Details[el].join(", ") : bike1Details[el]}</td>
                    <td>{el}</td>
                    <td>{typeof(bike2Details[el]) === "object" ? bike2Details[el].join(", ") : bike2Details[el]}</td>
                </tr> 
        }
    })

    let fetchBike1 = async (value) =>{
        await axios.get(`https://s56-ayush-capstone-dopahiya.onrender.com/getbike/${value}`)
            .then((res)=>{
                setBike1Details(res.data)
            })
    }

    let fetchBike2 = async (value) =>{
        await axios.get(`https://s56-ayush-capstone-dopahiya.onrender.com/getbike/${value}`)
            .then((res)=>{
                setBike2Details(res.data)
            })
    }

    useEffect(()=>{
        fetchBike1(bike1Value)
    },[bike1Value])

    useEffect(()=>{
        fetchBike2(bike2Value)
    },[bike2Value])

    useEffect(()=>{
        axios.get("https://s56-ayush-capstone-dopahiya.onrender.com/getbikes")
            .then((res)=>{
                setBikeData(res.data)
        })
    },[])

  return (
    <div className='compare-body-main'>
      <div className='compare-main-section'>
            <Navbar color={"white"}/>
            <div className='compare-main-content flex jus-cen align-cen'>
                <h1>Confused between 2 Bikes ? </h1>
                <h4>Dive into our comprehensive bike comparison section and find the perfect match for your biking needs.</h4>
            </div>
        </div>

        <div className='compare-main-div'>
            <div className='compare-img-div flex jus-spBet align-cen'>
                <div className='flex jus-cen'>
                    <img src={bike1Details.banner}/>
                </div>
                <div className='flex jus-cen'>
                    <img src={bike2Details.banner}/>
                </div>
            </div>

            <div className='compare-select-div flex jus-spBet align-cen'>
                <select onChange={(e)=>setBike1Value(e.target.value)}>
                    <option value="none">Choose Bike 1</option>
                    {bikeData.map((el,i)=>{
                        return <option value={el.name} key={i}>{el.name}</option>
                    })}
                </select>

                <p>Area of Comparison</p>

                <select onChange={(e)=>setBike2Value(e.target.value)}>
                    <option value="none">Choose Bike 2</option>
                    {bikeData.map((el,i)=>{
                        return <option value={el.name} key={i}>{el.name}</option>
                    })}
                </select>
            </div>

            <div className='compare-table-div'>
                <table className="table">
                    <tbody>
                        {
                            mappedData
                        }
                    </tbody>
                </table>
            </div>

            
        </div>
        <div className='section popular-bikes-section'>
            <h2>Popular Comparisons</h2>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-pop-1" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Bikes</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-pop-2" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Scooters</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-pop-1" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                    <div className='section-cont flex jus-spBet'>
                        <CompareCard />
                        <CompareCard />
                        <CompareCard />
                        <CompareCard />
                        <CompareCard />
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-pop-2" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                    <div className='section-cont flex jus-spBet'>
                        <CompareCard />
                        <CompareCard />
                        <CompareCard />
                        <CompareCard />
                        <CompareCard />
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default BikeCompare
