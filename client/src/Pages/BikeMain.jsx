import React , {useEffect}from 'react';
import "./BikeMain.css";
import Navbar from "../Components/Navbar.jsx"
import Footer from '../Components/Footer.jsx';
import MB from "../assets/r15.png"
import FrontView from "../assets/r15front.png"
import Img from "../assets/feedbackbg.png"
import BikePageCard from '../Components/BikePageCard.jsx';

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
    }
]

const BikeMain = () => {

    useEffect(()=>{
        window.scrollTo({
          top:0
        })
      },[])

  return (
    <div className='bike-main-body'>
        <Navbar />
        <div className='bike-hero-section flex jus-cen align-cen'>
            <h1>YAMAHA</h1>
            <img src={MB}/>
        </div>

        <div className='bike-spec-main flex jus-cen align-cen'>
            <div className='bike-spec-content flex jus-cen align-cen'>
                <h1>SPECIFICATIONS</h1>
                <p>An R15 is a popular bike model from Yamaha, first introduced in 2009.It is powered by a 150cc single-cylinder engine and can go up to 120 mph, making it a great option for both beginners and experienced riders alike. </p>
                <div className='bike-spec-grid'>
                    {Object.keys(data[0]).map((el , i)=>{
                        if (i<6){
                            return <div className='spec' key={i}>
                                        <h6>{el}</h6>
                                        <h5>{data[0][el]}</h5>
                                    </div>
                        }})}
                </div>
                <button data-bs-target="#exampleModal" data-bs-toggle="modal">VIEW SPECIFICATIONS</button>
            </div>
            <div className='bike-spec-img'>
                <img src={FrontView}/>
            </div>
        </div>

        <div className='bike-img-main flex jus-cen align-cen'>
            <h1>IMAGES OF BIKE</h1>
            <div className='bike-img-grid'>
                <div>
                    <img src={Img} />
                </div>
                <div>
                    <img src={Img} />
                </div>
                <div>
                    <img src={Img} />
                </div>
                <div>
                    <img src={Img} />
                </div>
                <div>
                    <img src={Img} />
                </div>
                <div>
                    <img src={Img} />
                </div>
            </div>
        </div>

        <div className='bike-category-main'>
            <h2>BIKES FROM SAME CATEGORY</h2>    
            <div className='bike-cat-div'>
                <BikePageCard cardWidth={"100%"} cardHeight={"100%"} border={"none"}/>
                <BikePageCard cardWidth={"100%"} cardHeight={"100%"} border={"none"}/>
                <BikePageCard cardWidth={"100%"} cardHeight={"100%"} border={"none"}/>
                <BikePageCard cardWidth={"100%"} cardHeight={"100%"} border={"none"}/>
            </div>    
        </div>

        < Footer/>
        
        {/* <div className='spec-modal'>
            
        </div> */}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Specs</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table>
                            <tbody>
                                {Object.keys(data[0]).map((el , i)=>{
                                    return <tr className='spec' key={i}>
                                                <th>{el}</th>
                                                <td>{data[0][el]}</td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default BikeMain
