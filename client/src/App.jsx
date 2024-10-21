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
  const [completeData , setCompleteData] = useState([])
  const [bikeBrands , setBikeBrands] = useState([])

  let mergeData = (bikedata , photosdata) => {
    const photoMap = {};
    photosdata ?.forEach((photo) => {
        photoMap[photo.name] = photo;
    });

    let merged = bikedata?.map((detail) => {
        const matchingPhoto = photoMap[detail.name];
        if (matchingPhoto) {
            return { ...detail, ...matchingPhoto };
        } else {
            return detail;
        }
    });
    setCompleteData(merged);
  };

  useEffect(()=>{
    if(completeData.length === 0){
      Promise.all([
        axios.get(`${API_URL}/getbikephotos`),
        axios.get(`${API_URL}/getbikes`),
        axios.get(`${API_URL}/getbrands`)
      ]).then(([photosRes, bikesRes, brandsRes]) => {
        mergeData(bikesRes.data, photosRes.data)
        setBikeBrands(brandsRes.data)
      }).catch(error => {
        console.error("Error fetching data:", error);
      })
    }
  } , [])

  return (
    <>
    <Context.Provider value={{ LoginModal , setLoginModal , RegisterModal , setRegisterModal , completeData , bikeBrands}}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/bikes' element={<Bikes />}></Route>
        <Route path='/compare' element={<BikeCompare />}></Route>
        <Route path='/findmyperfectbike' element={<FindMyPerfectBike mergedData={completeData} />}></Route>
        <Route path='/feedback' element={<FeedBackForm />}></Route>
        <Route path='/bike/:id' element={<BikeMain/>}></Route>
        <Route path='/bikebrands' element={<Explore />}></Route>
        <Route path='/brand/:id' element={<Explore2 />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
      </Context.Provider>
    </>
  )
}

export default App
