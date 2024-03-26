import { createContext, useState } from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Home from './Pages/Home'

export const Context = createContext(null)

function App() {

  const [ShowModal , setShowModal] = useState(false)

  return (
    <>
    <Context.Provider value={{ ShowModal , setShowModal }}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      </Context.Provider>
    </>
  )
}

export default App
