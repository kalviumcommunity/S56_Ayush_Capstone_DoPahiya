import React , {useEffect , useState}from 'react';
import "./BikeMain.css";
import Navbar from "../Components/Navbar.jsx"
import Footer from '../Components/Footer.jsx';
import FrontView from "../assets/r15front.png"
import Img from "../assets/feedbackbg.png"
import BikePageCard from '../Components/BikePageCard.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader.jsx';

const BikeMain = () => {

    const {id} = useParams()
    const [data , setData] = useState({})
    const [isLoading , setIsLoading] = useState(true)

    useEffect(()=>{
        window.scrollTo({
          top:0
        })
      },[])


    useEffect(()=>{
        axios.get(`http://localhost:3200/getbike/${id}`)
            .then((res)=>{
                console.log(res)
                if (res.status == 200){
                    console.log(res.data.photos)
                    setData(res.data)
                    // setIsLoading(false)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    } , [])

  return (
    <div className='bike-main-body'>
        <Navbar />
        {isLoading ? <Loader /> : 
        <div>        
            <div className='bike-hero-section flex jus-cen align-cen'>
                <h1 style={
                    {
                        fontSize: data.brand.length < 8 ? "18vw" : "10vw",
                        marginBottom: data.brand.length < 8 ? "16vw" : "22vw",
                        marginTop: data.brand.length < 8 ? "3vw" : "7vw",
                    }
                }>{data.brand}</h1>
                <img src={data.banner}/>
            </div>

            <div className='bike-spec-main flex jus-cen align-cen'>
                <div className='bike-spec-content flex jus-cen align-cen'>
                    <h1>SPECIFICATIONS</h1>
                    <p>An R15 is a popular bike model from Yamaha, first introduced in 2009.It is powered by a 150cc single-cylinder engine and can go up to 120 mph, making it a great option for both beginners and experienced riders alike. </p>
                    <div className='bike-spec-grid'>
                        {Object.keys(data).map((el , i)=>{
                            if (i<6 && el != "_id"){
                                return <div className='spec' key={i}>
                                            <h6>{el}</h6>
                                            <h5>{data[el]}</h5>
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
                    {data.photos.map((el , i)=>{
                        return  <div key={i}>
                                    <img src={el} />
                                </div>
                    })}
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
                                    {Object.keys(data).map((el , i)=>{
                                        if (el != "banner" && el != "photos" && el != "_id"){
                                            return <tr className='spec' key={i}>
                                                    <th>{el}</th>
                                                    <td>{data[el]}</td>
                                                </tr>
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default BikeMain
