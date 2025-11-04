import React from 'react'
import './Show.css'
import { useDispatch, useSelector } from 'react-redux'
import DeleteConform from '../Components/DeleteConform.jsx'
import { updateOpen, updateAddButtonText,updateReview ,addReview,deleteReview, updateError} from '../Redux/DataSlice.jsx'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import Rating from '@mui/material/Rating';
import MapBox from '../Components/MapBox.jsx'



const Show = () => {


  const Navigate = useNavigate()
  const { showDetail, open ,review,isAuth,error,currentUserId} = useSelector((state) => state.data)
  const dispatch = useDispatch();
  // console.log(showDetail._id)

  const handleChange = (e) => {
  const { name, value } = e.target;
  dispatch(updateReview({ ...review, [name]: value })); 
};

  const UpdateHandle = () => {
    dispatch(updateAddButtonText(true))
    if(isAuth){

      Navigate('/addNewPlace')
    }else{
      dispatch(updateError("Please login user"))
      Navigate('/login',{ state: { from: '/addNewPlace' } });
    }
  }
  
  
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


// console.log(currentUserId)

const handleDelete=(id,reviewId)=>{
  if(isAuth){
    
    dispatch(deleteReview({id,reviewId}));
  }else{
     dispatch(updateError("Please login user"));
      Navigate('/login',{ state: { from: '/show' } });
  }
}
const handleCardDelete=()=>{
  if(isAuth){

    dispatch(updateOpen())
  }else{
     dispatch(updateError("Please login user"));
      Navigate('/login',{ state: { from: '/show' } });
  }
}

  const handleSubmit=(e)=>{
    e.preventDefault()

    dispatch(addReview({id:showDetail._id,review}))

   
  }
     
  // console.log(showDetail.reviews)


  return (
    <>
      {showDetail && <div className="showMain">
        <img src={showDetail?.image?.url} alt="" />
        <div className='showDiv' >
          <i>{showDetail?.owner?.username}</i>
          <h5>{showDetail?.title}</h5>
          <p>{showDetail?.description}</p>
       {showDetail?.price &&   <h3>&#8377;{ showDetail?.price?.toLocaleString('en-IN')}</h3>}
          <div>
            <h4 style={{ display: 'inline', marginRight: '10px' }} >{showDetail.location}</h4>
            <h3 style={{ display: 'inline' }} >{showDetail.country}</h3>
          </div>
        </div>
       {   currentUserId && currentUserId===showDetail?.owner?._id
       ?
         
        <div className='showButton' >
          <button className='delete' onClick={() => handleCardDelete()} >Delete</button>
          <button className='update' onClick={() => UpdateHandle()}  >Update</button>
        </div>
        :""
       }
      </div>}
      {open && <DeleteConform id={showDetail?._id} />}
      <br />
      < hr className='hr' />
      <br />
      {currentUserId &&
      <div className="review">
        <h4>Add Review</h4>
        <form onSubmit={handleSubmit} noValidate className='needs-validation' >
            <Rating name="rating" defaultValue={2} precision={1} onChange={handleChange} />
            {/* <input type="range" name="rating" min={1} max={5} id="rating" className='form-range' onChange={handleChange} /> */}
            <label htmlFor="comment" className='form-label' >Comment</label>
           <textarea className='form-control' name="comment" id="comment" cols={60} rows={5} onChange={handleChange}  ></textarea>
           <div className="invalid-feedback">Please add some comment for review</div>
           <button style={{marginTop:'15px'}} type='submit' className='btn btn-outline-dark' > Submit</button>

        </form>
      </div>
     }
      <br />
      < hr className='hr' />
      <br />
      <div className='showReviews' >
        <h4>All Review</h4>
        {/* <p>{showDetail.reviews}</p>  */}
        <div className="showReviewStyle">
          {showDetail?.reviews?.length > 0 && 
            showDetail.reviews.map((item)=>(
              <div className='showR' key={item._id} >
                <i>{item?.author?.username}</i>
                <p>{item.comment}</p>
                <Rating name="rating" defaultValue={item.rating} readOnly  />
                <br />
                <button  className='btn btn-sm btn-danger' onClick={()=>handleDelete(showDetail._id,item._id)} >Delete</button>
              </div>
            ))
          }
        </div>
      </div>
      <div className="map">
        <MapBox showDetail={showDetail} />
      </div>
    </>
  )
}

export default Show