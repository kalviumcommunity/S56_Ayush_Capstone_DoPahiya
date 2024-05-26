import React , {useEffect , useState, useContext} from 'react'
import "./BikeCompare.css"
import "./Bikes.css"
import Navbar from '../Components/Navbar'
import R15 from "../assets/r15.png"
import Footer from '../Components/Footer'
import CompareCard from '../Components/CompareCard'
import { Context } from '../App'

const BikeCompare = () => {

    const [bike1Value , setBike1Value] = useState("none")
    const [bike2Value , setBike2Value] = useState("none")
    const [bike1Details , setBike1Details] = useState({})
    const [bike2Details , setBike2Details] = useState([])
    const [bikeData , setBikeData] = useState([])
    const {completeData} = useContext(Context)

    useEffect(()=>{
        window.scrollTo({
          top:0
        })
      },[])

    let mappedData = Object.keys(bike1Details).map((el , i)=>{
        if (el != "banner" && el != "photos" && el != "_id" && el != "brand_id"){ 
            return <tr key={i}>
                    <td>{typeof(bike1Details[el]) === "object" ? bike1Details[el].join(", ") : bike1Details[el]}</td>
                    <td>{el}</td>
                    <td>{typeof(bike2Details[el]) === "object" ? bike2Details[el].join(", ") : bike2Details[el]}</td>
                </tr> 
        }
    })

    useEffect(()=>{
        let fetchBike1 = async (value) =>{
            let filteredData = completeData.filter((el,i)=>{
                if(el.name == value){
                    return el
                }
            })
            setBike1Details(filteredData[0] ? filteredData[0] : "Bike Not Found")
        }
        fetchBike1(bike1Value)
    },[completeData, bike1Value])

    useEffect(()=>{
        let fetchBike2 = async (value) =>{
            let filteredData = completeData.filter((el,i)=>{
                if(el.name == value){
                    return el
                }
            })
            setBike2Details(filteredData[0] ? filteredData[0] : "Bike Not Found")
        }
        fetchBike2(bike2Value)
    },[completeData , bike2Value])

    useEffect(()=>{
        setBikeData(completeData)
    },[completeData])

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
                <select onChange={(e)=>setBike1Value(e.target.value)} value={bike1Value}>
                    <option value="none">Choose Bike 1</option>
                    {bikeData.map((el,i)=>{
                        return <option value={el.name} key={i}>{el.name}</option>
                    })}
                </select>

                <p>Area of Comparison</p>

                <select onChange={(e)=>setBike2Value(e.target.value)} value={bike2Value}>
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
                        <CompareCard bike1={"Hero Splendor Plus"} bike2={"Honda Shine 100"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"Bajaj Pulsar N160"} bike2={"TVS Apache RTR 160"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"KTM 390 Duke"} bike2={"Bajaj Dominar 400"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"Royal Enfield Classic 350"} bike2={"Jawa Forty Two"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"BMW R 1250 GS Adventure"} bike2={"Harley Davidson PanAmerica 1250"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-pop-2" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                    <div className='section-cont flex jus-spBet'>
                        <CompareCard bike1={"Honda Activa 6G"} bike2={"TVS Jupiter"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"Suzuki Access 125"} bike2={"Yamaha Fascino 125"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"Aprilia SR Storm"} bike2={"TVS NTORQ 125"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"Bajaj Chetak"} bike2={"TVS iQube Electric S"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                        <CompareCard bike1={"Suzuki Access 125"} bike2={"TVS Jupiter"} setBike1Value={setBike1Value} setBike2Value={setBike2Value}/>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default BikeCompare
