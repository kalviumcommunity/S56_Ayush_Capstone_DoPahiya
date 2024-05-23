import React , {useEffect , useState}from 'react';
import "./BikeMain.css";
import Navbar from "../Components/Navbar.jsx"
import Footer from '../Components/Footer.jsx';
import FrontView from "../assets/r15front.png"
import BikePageCard from '../Components/BikePageCard.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader.jsx';
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";


const BikeMain = () => {

    const {id} = useParams()
    const [data , setData] = useState({})
    const [mergedData , setMergedData] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        window.scrollTo({
          top:0
        })
      },[])


    useEffect(()=>{
        axios.get(`https://s56-ayush-capstone-dopahiya.onrender.com/getbike/${id}`)
            .then((res)=>{
                if (res.status == 200){
                    console.log(res.data.photos)
                    setData(res.data)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    } , [])

    useEffect(()=>{
        if(data.bodyType){
            axios.get(`https://s56-ayush-capstone-dopahiya.onrender.com/getbikebytype/${data.bodyType[0]}`)
                .then((res)=>{
                    setMergedData(res.data)
                })
        }
    },[data])

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
                    <div className='flex jus-cen align-cen' style={{gap:"20px"}}>
                        <button data-bs-target="#exampleModal" data-bs-toggle="modal">VIEW SPECIFICATIONS</button>
                    </div>
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
                {mergedData.map((el,i)=>{
                            if (el.bodyType.includes(data.bodyType[0]) && i<4){
                                return <div className="card-2" onClick={() => navigate(`/bike/${el.name}`)}>
                                  <div className='visible-content'>
                                    <img src={el.banner} />
                                    <h4 className="card-2-text">{el.name}</h4>
                                  </div>
                                  <div className="hidden-content">
                                      <p className="hidden-text">Price : {el.exShowroomPrice}</p>
                                      <p className="hidden-text">BodyType : {el.bodyType[0]}</p>
                                      <p className="hidden-text">Mileage : {el.cityMileage}</p>
                                  </div>
                              </div>
                            }
                        })}
                </div>    
            </div>

            < Footer/>
            
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
