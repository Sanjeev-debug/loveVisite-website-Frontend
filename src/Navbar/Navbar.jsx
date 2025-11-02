import React from 'react'
import './Navbar.css'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { updateAddButtonText ,UpdateshowDetail,updateError,logout} from '../Redux/DataSlice.jsx'
import { useDispatch, useSelector } from 'react-redux'



const Navbar = () => {
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  const location = useLocation()
  const {showDetail,isAuth}=useSelector((state)=>state.data)

const emptyShowDetail = {
  title: '',
  description: '',
  price: '',
  image: '',
  location: '',
  country: ''
};

const handleText=async()=>{

   dispatch(UpdateshowDetail(emptyShowDetail));
   dispatch(updateAddButtonText(false));
  
   if(isAuth){
     Navigate('/addNewPlace');

   }else{
    dispatch(updateError("User Not Login"));
    Navigate('/login',{ state: { from: '/addNewPlace' } });
   }


  // console.log(showDetail)
}

  const handelLogout=()=>{
   dispatch(logout())
  }

  return (
    <>
    <div className='mainNav'>
        <ul>
            <li><NavLink className={'mainNavLink'} to={'/'} >Place</NavLink></li>
           
        </ul>
        <div className="signUPButton">
            <li><NavLink className={'mainNavLink' } onClick={(e)=>{  e.preventDefault(); handleText();}} >Add-New-Place</NavLink></li>
         {!isAuth ?<>  
         <NavLink className={'mainNavLink'} to={'/signUp'} ><b>Sign-Up</b> </NavLink> 
         <NavLink className={'mainNavLink'} to={'/login'} ><b>Log-In</b></NavLink>
         </>: <button onClick={handelLogout} ><b>logOut</b></button>}
         
          
        </div>
    </div>
    </>
  )
}

export default Navbar