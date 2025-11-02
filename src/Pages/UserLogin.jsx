import React from 'react'
import './UserSignUp.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginUpdate,login,updateError} from '../Redux/DataSlice.jsx'
import { useLocation, useNavigate } from 'react-router';

const UserLogin = () => {


const {userLogin}=useSelector((state)=>state.data);
  const dispatch=useDispatch();
  const Navigate=useNavigate()
   const location = useLocation();

   const from = location.state?.from || "/";
   console.log(location.state?.from)
useEffect(() => {
  const forms = document.querySelectorAll('.needs-validation');

  forms.forEach(form => {
    const handleSubmit = (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }else{
         event.preventDefault();
      }

      form.classList.add('was-validated');
    }

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    }
  });
}, []);


  const handleChange=(e)=>{
    const {name ,value}=e.target;
     
    dispatch(userLoginUpdate({...userLogin,[name] :value}));
     
  }





const handleSubmit=async(e)=>{
  e.preventDefault();
  console.log(userLogin)
   try {
      
      await dispatch( login(userLogin)).unwrap();

      
      Navigate(from, { replace: true });
    } catch (err) {
      dispatch(updateError("login Failed"))
      console.log("Login failed", err);
    }
  
  

  
}


  return (
    <>
    <div className='signUp' >
        <form className="mainSignUp needs-validation" onSubmit={handleSubmit} noValidate  >
            <label htmlFor="username">UserName</label>
          <input type="text" placeholder='Enter username' name='username' className="form-control" id='username'  onChange={handleChange}required />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter password' name='password' id='password' className="form-control" onChange={handleChange}required />
          <button className='update' type='submit' >login</button>
         </form>
    </div>
    </>
  )
}

export default UserLogin