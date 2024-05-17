import { createContext, useState , useEffect} from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Home from './Pages/Home'
import Explore from './Pages/Explore'
import Bikes from './Pages/Bikes'
import BikeCompare from './Pages/BikeCompare'
import FindMyPerfectBike from './Pages/FindMyPerfectBike'
import FeedBackForm from './Pages/FeedBackForm'
import BikeMain from './Pages/BikeMain'
import Explore2 from './Pages/Explore2'
import Profile from './Pages/Profile'
import axios from 'axios'

export const Context = createContext(null)

function App() {

  const [LoginModal , setLoginModal] = useState(false)
  const [RegisterModal , setRegisterModal] = useState(false)
  const [bikeDetails , setBikeDetails] = useState([])
  const [bikePhotos , setBikePhotos] = useState([])
  const [mergedData , setMergedData] = useState([])

  useEffect(()=>{
    Promise.all([
        axios.get("https://s56-ayush-capstone-dopahiya.onrender.com/getbikephotos"),
        axios.get("https://s56-ayush-capstone-dopahiya.onrender.com/getbikes")
    ]).then(([photosRes, bikesRes]) => {
        setBikePhotos(photosRes.data);
        setBikeDetails(bikesRes.data);
    }).catch(error => {
        console.error("Error fetching data:", error);
    })
  } , [])

  useEffect(()=>{
      mergeData()
  },[bikeDetails , bikePhotos])

  let mergeData = () => {
      const photoMap = {};
      bikePhotos.forEach((photo) => {
          photoMap[photo.name] = photo;
      });

      let merged = bikeDetails.map((detail) => {
          const matchingPhoto = photoMap[detail.name];
          if (matchingPhoto) {
              return { ...detail, ...matchingPhoto };
          } else {
              return detail;
          }
      });

      setMergedData(merged);
  };

  return (
    <>
    <Context.Provider value={{ LoginModal , setLoginModal , RegisterModal , setRegisterModal}}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/bikes' element={<Bikes />}></Route>
        <Route path='/compare' element={<BikeCompare />}></Route>
        <Route path='/findmyperfectbike' element={<FindMyPerfectBike mergedData={mergedData} />}></Route>
        <Route path='/feedback' element={<FeedBackForm />}></Route>
        <Route path='/bike/:id' element={<BikeMain />}></Route>
        <Route path='/bikebrands' element={<Explore />}></Route>
        <Route path='/brand/:id' element={<Explore2 />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
      </Context.Provider>
    </>
  )
}

export default App
