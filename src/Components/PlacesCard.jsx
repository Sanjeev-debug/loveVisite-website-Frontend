
import { useDispatch, useSelector } from 'react-redux'
import './PlacesCard.css'
import { useNavigate} from 'react-router'
import {UpdateshowDetail} from '../Redux/DataSlice.jsx'
import { useEffect } from 'react'


const PlacesCard =({AllListing})=>{

  const showDetail=useSelector((state)=>state.data.showDetail);
  const dispatch=useDispatch();
  const Navigate=useNavigate();

  
  
             const handleShowDetail=(list)=>{
            
                
        dispatch(UpdateshowDetail(list) )
                    Navigate('/show')
                 
        }

// console.log(showDetail)
console.log(AllListing)
    
    return(
        <>
           {AllListing?.length > 0 && AllListing.map((list)=>(
            <div key={list._id} className="listCard" >
                <img src={list.image.url} alt="" onClick={()=>handleShowDetail(list)} />
                <h6>{list.title}</h6>
                
                <h5>&#8377;{list.price.toLocaleString('en-IN')}</h5>
              

            </div>
            
           ))}
        </>
    )
}
export default PlacesCard


