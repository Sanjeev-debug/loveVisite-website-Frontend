import React from 'react'
import './UserSignUp.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate,addUser} from '../Redux/DataSlice.jsx'
import { useNavigate } from 'react-router';

const UserSignUp = () => {


const {user}=useSelector((state)=>state.data);
  const dispatch=useDispatch();
  const Navigate=useNavigate();
   
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
     
    dispatch(userUpdate({...user,[name] :value}));
     
  }





const handleSubmit=async(e)=>{
  e.preventDefault();
//   console.log(user)
  
    dispatch( addUser(user) );
    Navigate('/')

  
}


  return (
    <>
    <div className='signUp' >
        <form className="mainSignUp needs-validation" onSubmit={handleSubmit} noValidate  >
            <label htmlFor="username">UserName </label>
          <input type="text" placeholder='username' name='username' className="form-control" id='username'  onChange={handleChange}required />
            <label htmlFor="email">Email</label>
          <input type="email" placeholder='email' name='email' id='email' className="form-control" onChange={handleChange}required />
            <label htmlFor="password">Password</label>
          <input type="password" placeholder='password' name='password' id='password' className="form-control" onChange={handleChange}required />
          <button className='update' type='submit' >SignUp</button>
         </form>
    </div>
    </>
  )
}

export default UserSignUp