import React , {useContext, useEffect , useState}from 'react'
import "./Bikes.css"
import Navbar from "../Components/Navbar.jsx"
import SearchBike from '../Components/SearchBike.jsx'
import MB from "../assets/Motorcycle.png"
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer.jsx'
import BikePageCard from '../Components/BikePageCard.jsx'
import Loader from '../Components/Loader.jsx'
import { Context } from '../App.jsx'

const Bikes = () => {

    const navigate = useNavigate()
    const [mergedData , setMergedData] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const {completeData} = useContext(Context)

    useEffect(()=>{
        window.scrollTo({
          top:0
        })
    },[])

    let handleExplore = (id) =>{
        document.getElementById(`${id}-img`).style.visibility = "visible"
        document.getElementById(`${id}`).classList.add("slide-out-bck-bottom")
        document.getElementById(`${id}-img`).classList.add("slide-out-right")
        setTimeout(()=>{
          navigate("/bikebrands")
        },1500)
    }   

    useEffect(()=>{
        setMergedData(completeData)
    },[completeData])

    useEffect(()=>{
        setIsLoading(false) 
    },[mergedData])

  return (
    <div className='bikes-main-body'>
        {isLoading ? <Loader/> : 
            <div>
                <div className='bikes-main-section'>
            <Navbar color={"white"}/>
            <div className='bikes-main-searchSection'>
                <SearchBike position="static" background="rgba(255, 255, 255, 0.208)" />
            </div>
        </div>

        <div className='section popular-bikes-section'>
            <h2>Popular Bikes</h2>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-pop-1" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Street</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-pop-2" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Adventure</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-pop-3" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Cruiser</button>
                    <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-pop-4" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Sports</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-pop-1" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                    <div className='section-cont flex jus-spBet' >
                        {mergedData
                            .filter(el => el.bodyType.includes("Street")) 
                            .slice(0, 5)
                            .map((el, i) => (
                                <BikePageCard key={i} el={el} />
                            ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-pop-2" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                        {mergedData
                        .filter(el => el.bodyType.includes("Adventure")) 
                        .slice(0, 5)
                        .map((el, i) => (
                            <BikePageCard key={i} el={el} />
                        ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-pop-3" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                        {mergedData
                        .filter(el => el.bodyType.includes("Cruiser")) 
                        .slice(0, 5)
                        .map((el, i) => (
                            <BikePageCard key={i} el={el} />
                        ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-pop-4" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                        {mergedData
                        .filter(el => el.bodyType.includes("Sports")) 
                        .slice(0, 5)
                        .map((el, i) => (
                            <BikePageCard key={i} el={el} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='showMore-div'>
                <p onClick={(e)=>{handleExplore(e.target.id)}} id='explore-text-1'>Show More</p>
                <img src={MB} id="explore-text-1-img" style={{visibility:"hidden"}}/>
            </div>

        </div>

        <div className='section bikesByPrice-section'>
            <h2>Bikes By Price</h2>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-price-1" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Under 1 Lakh</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-price-2" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">1-2 Lakh</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-price-3" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">2-3 Lakh</button>
                    <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-price-4" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">3-4 Lakh</button>
                    <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-price-5" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Above 4 Lakh</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-price-1" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                    <div className='section-cont flex jus-spBet'>
                    {mergedData
                    .filter(el => el.exShowroomPrice < 100000) 
                    .slice(0, 5)
                    .map((el, i) => (
                        <BikePageCard key={i} el={el}/>
                    ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-price-2" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => el.exShowroomPrice < 200000 && el.exShowroomPrice > 100000) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el}/>
                ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-price-3" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => el.exShowroomPrice < 300000 && el.exShowroomPrice > 200000) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el}/>
                ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-price-4" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => el.exShowroomPrice < 400000 && el.exShowroomPrice > 300000) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el}/>
                ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-price-5" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => el.exShowroomPrice > 400000) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el} />
                ))}
                    </div>
                </div>
            </div>
            <div className='showMore-div'>
                <p onClick={(e)=>{handleExplore(e.target.id)}} id='explore-text-2'>Show More</p>
                <img src={MB} id="explore-text-2-img" style={{visibility:"hidden"}}/>
            </div>

        </div>

        <div className='section bikesByPrice-section'>
            <h2>Bikes by Mileage</h2>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-mil-1" type="button" role="tab" aria-controls="nav-home" aria-selected="true">5-25 KMPL</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-mil-2" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">25-35 KMPL</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-mil-3" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">35-50 KMPL</button>
                    <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-mil-4" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Above 50 KMPL</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-mil-1" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                    <div className='section-cont flex jus-spBet'>
                    {mergedData
                        .filter(el => parseInt(el.cityMileage.split(" ")[0]) >= 5 && parseInt(el.cityMileage.split(" ")[0]) < 25) 
                        .slice(0, 5)
                        .map((el, i) => (
                            <BikePageCard key={i} el={el} />
                    ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-mil-2" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => parseInt(el.cityMileage.split(" ")[0]) >= 25 && parseInt(el.cityMileage.split(" ")[0]) < 35) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el}/>
                ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-mil-3" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => parseInt(el.cityMileage.split(" ")[0]) >= 35 && parseInt(el.cityMileage.split(" ")[0]) < 50) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el}/>
                ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-mil-4" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
                <div className='section-cont flex jus-spBet'>
                {mergedData
                .filter(el => parseInt(el.cityMileage.split(" ")[0]) >= 50) 
                .slice(0, 5)
                .map((el, i) => (
                    <BikePageCard key={i} el={el}/>
                ))}
                    </div>
                </div>
            </div>
            <div className='showMore-div'>
                <p onClick={(e)=>{handleExplore(e.target.id)}} id='explore-text-3'>Show More</p>
                <img src={MB} id="explore-text-3-img" style={{visibility:"hidden"}}/>
            </div>

        </div>

        <Footer />
            </div>
        }

    </div>  
  )
}
import "./Bikes.css"

export default Bikes
