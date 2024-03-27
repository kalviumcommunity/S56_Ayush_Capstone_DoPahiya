import { createContext, useState } from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Home from './Pages/Home'

export const Context = createContext(null)

function App() {

  const [LoginModal , setLoginModal] = useState(false)
  const [RegisterModal , setRegisterModal] = useState(false)

  return (
    <>
    <Context.Provider value={{ LoginModal , setLoginModal , RegisterModal , setRegisterModal}}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      </Context.Provider>
    </>
  )
}

export default App
