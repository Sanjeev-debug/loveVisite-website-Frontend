import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer.jsx'
import Alert from '../Components/Alert.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { closeError } from '../Redux/DataSlice.jsx'
import { useEffect } from 'react'

const Layout = () => {

  const {error}=useSelector((state)=>state.data);
  const dispatch=useDispatch();
  // dispatch(closeError());
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(closeError()); 
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
   <>
      <Navbar/>
      {error ? <Alert/>:""}
      <Outlet/>
      <Footer/>
   </>
    
  )
}

export default Layout 