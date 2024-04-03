import React from 'react'
import "./BikeCompare.css"
import "./Bikes.css"
import Navbar from '../Components/Navbar'
import R15 from "../assets/r15.png"
import Footer from '../Components/Footer'
import CompareCard from '../Components/CompareCard'

let data = [
    {
        "name": "Yamaha R15 V4",
        "onRoadPrice": "1.70 lakh",
        "engine": "155cc",
        "engineType": "Liquid Cooled, Single Cylinder, FI",
        "cooling": "Liquid Cooling",
        "maxPower": "19.3 PS @ 10000 rpm",
        "maxTorque": "14.7 Nm @ 8500 rpm",
        "cityMileage": "45 kmpl",
        "fuelCapacity": "11L",
        "gearBox": "6 Speed",
        "starting": "Electric Start",
        "bodyType": ["Sports", "Superbike"],
        "suitableAge": [18, 35]
    },
    {
        "name": "KTM RC 200",
        "brand": "KTM",
        "onRoadPrice": "2.20 lakh",
        "engine": "199.5cc",
        "engineType": "Liquid Cooled, Single Cylinder, FI",
        "cooling": "Liquid Cooling",
        "maxPower": "25.8 PS @ 10000 rpm",
        "maxTorque": "19.5 Nm @ 8000 rpm",
        "cityMileage": "30 kmpl",
        "fuelCapacity": "9.5L",
        "gearBox": "6 Speed",
        "starting": "Electric Start",
        "bodyType": ["Sports", "Superbike"],
        "suitableAge": [18, 30]
    }
]

const BikeCompare = () => {

    window.scrollTo({
        top:0
      })

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
                    <img src={R15}/>
                </div>
                <div className='flex jus-cen'>
                    <img src={R15}/>
                </div>
            </div>

            <div className='compare-select-div flex jus-spBet align-cen'>
                <select>
                    <option value="option1">Yamaha R15</option>
                </select>

                <p>Area of Comparison</p>

                <select>
                    <option value="option1">Yamaha R15</option>
                </select>
            </div>

            <div className='compare-table-div'>
                <table class="table">
                    <tbody>
                        {
                            Object.keys(data[0]).map((el , i)=>{
                                return <tr>
                                            <td>{typeof(data[0][el]) === "object" ? data[0][el].join(", ") : data[0][el]}</td>
                                            <td>{el}</td>
                                            <td>{typeof(data[1][el]) === "object" ? data[1][el].join(", ") : data[1][el]}</td>
                                        </tr> 
                            })
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
