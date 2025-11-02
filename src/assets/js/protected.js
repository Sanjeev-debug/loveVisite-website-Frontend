import { useDispatch, useSelector } from "react-redux";
import { updateIsAuth } from "../../Redux/DataSlice";
import API from './axios.js'



export async function checkLogin(dispatch,navigate) {
   
      try {
        const res = await API.get('http://localhost:3000/checkAuth');
        console.log(res.data.isAuthenticated)
        if (res.data.isAuthenticated) {
          dispatch(updateIsAuth(res.data.isAuthenticated));
          return res.data.isAuthenticated
        } else {
          navigate('/'); 
        }
      } catch (err) {
        navigate('/');
      }
      
    }
