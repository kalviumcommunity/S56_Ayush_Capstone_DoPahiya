import { useState } from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import LoginPage from './Pages/LoginPage'
import Home from './Pages/Home'
import Register from './Pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </>
  )
}

export default App
