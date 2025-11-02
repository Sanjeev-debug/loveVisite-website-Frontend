import React from 'react'
import './AddNewPlace.css'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateshowDetail,updateList,addNewList} from '../Redux/DataSlice.jsx'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'



const AddNewPlace = () => {
  const Navigate=useNavigate();
  const {AddButtonText,showDetail}=useSelector((state)=>state.data);
  const dispatch=useDispatch();
 
   
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
    const {name ,value,files}=e.target;
     if (name === "image") {
      const file = files[0];
      console.log(file)
      dispatch(UpdateshowDetail({...showDetail,[name] :file}));
     }else{

    dispatch(UpdateshowDetail({...showDetail,[name] :value}));
     }
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
    
  // console.log(showDetail)
  if(AddButtonText){
   dispatch(  updateList(showDetail));
  Navigate('/show')
  // dispatch(  UpdateshowDetail(''));
  }else{
    dispatch( addNewList(showDetail) )
    Navigate('/')
  }
  
}


  return (
    <>
       <div> 
         <form className="mainAddPlace needs-validation" onSubmit={handleSubmit} noValidate encType='multipart'  >
           <input type="text" placeholder='Title' name='title'  className="form-control" value={showDetail?.title} onChange={handleChange} required  />
          <textarea placeholder='Description'name='description' className="form-control" value={showDetail?.description} onChange={handleChange} required />
          <input type="text" placeholder='Price' name='price' className="form-control" value={showDetail?.price} onChange={handleChange} required />
        {AddButtonText ?
        <>
        <div className='editImage' >
        <img width={'100%'} height={'100%'} src={showDetail.image.url} alt="" />
       </div>
        <input className='file form-control' type="file" placeholder='Upload Photo'  name='image'  onChange={handleChange}    />
       </>
        :
        <input className='file form-control' type="file" placeholder='Upload Photo'  name='image'  onChange={handleChange}     required />

      }
          <input type="text" placeholder='Location' name='location' className="form-control" value={showDetail?.location} onChange={handleChange}required />
          <input type="text" placeholder='Country' name='country' className="form-control" value={showDetail?.country} onChange={handleChange}required />
          <button className='update' type='submit' >{AddButtonText?'Update':'Add New List'}</button>
         </form>

       </div>
    </>
  )
}

export default AddNewPlace