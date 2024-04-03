import { createContext, useState } from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Home from './Pages/Home'
import Explore from './Pages/Explore'
import Bikes from './Pages/Bikes'
import BikeCompare from './Pages/BikeCompare'

export const Context = createContext(null)

function App() {

  const [LoginModal , setLoginModal] = useState(false)
  const [RegisterModal , setRegisterModal] = useState(false)

  return (
    <>
    <Context.Provider value={{ LoginModal , setLoginModal , RegisterModal , setRegisterModal}}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/bikes' element={<Bikes />}></Route>
        <Route path='/compare' element={<BikeCompare />}></Route>
        <Route path='/bikebrands' element={<Explore />}></Route>
      </Routes>
      </Context.Provider>
    </>
  )
}

export default App
