import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home'

import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Result from './pages/Result'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='min-h-screen bg-slate-70'>
   <Navbar/>
   
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/result' element={<Result/>}/>
         <Route path='/buy' element={<BuyCredit/>}/>
        
       </Routes>
       <Footer/>
   </div>
  )
}

export default App
