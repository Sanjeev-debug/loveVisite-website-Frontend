import React from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'

import PlacesCard from '../Components/PlacesCard.jsx';
import { fetchAllListing } from '../Redux/DataSlice';
import { useEffect } from 'react';
import Loading from '../Components/Loading.jsx';

const Home = () => {
 
 const {AllListing ,loading ,error}=useSelector((state)=>state.data);  
 const dispatch=useDispatch();


 useEffect(() => {
      dispatch(fetchAllListing());
    
  }, [dispatch]);
    if (loading) return <Loading/>;
    

  return (
   <>
   <div className='mainHome'>
   <div className='homeCard' >
     <PlacesCard AllListing={AllListing} />
   </div>
   </div>
   
   </>
  )
}

export default Home