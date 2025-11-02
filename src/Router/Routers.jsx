import React from 'react' 
import {BrowserRouter, Route, Routes} from 'react-router'
import Layout from '../LayOut/Layout'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Show from '../Pages/Show'
import AddNewPlace from '../Pages/AddNewPlace'
import UserSignUp from '../Pages/UserSignUp'
import UserLogin from '../Pages/UserLogin'

const Routers = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
             <Route path='/' element={<Home/>} />
             <Route path='/about' element={<About/>} />
             <Route path='/show' element={<Show/>} />
             <Route path='/addNewPlace' element={<AddNewPlace/>} />
             <Route path='/signUp' element={<UserSignUp/>} />
             <Route path='/login' element={<UserLogin/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routers