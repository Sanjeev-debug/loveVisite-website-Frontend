import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import API from '../assets/js/axios.js';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllListing=createAsyncThunk('fetchAllListing', async(_, thunkAPI)=>{
  
    const response= await API.get(`${BACKEND_URL}/listingAll`);
    console.log(response)
    return response.data;
  
  
});
export const addNewList=createAsyncThunk('addNewList', async(showDetail,thunkAPI)=>{
    // console.log(showDetail)
    const formData = new FormData();
    for (let key in showDetail) {
        formData.append(key, showDetail[key]);
    }
    
    try{
     const response= await API.post(`${BACKEND_URL}/addNewList`,formData,{
        headers: {
        'Content-Type': 'multipart/form-data',
      },
     });
    //  console.log(response)
     thunkAPI.dispatch(fetchAllListing());
    
    return response.data;
    }catch(err){
     console.log(err.response.data)
       thunkAPI.dispatch(updateError(err.response.data));

    }
})
export const updateList=createAsyncThunk('updateList', async(showDetail,thunkAPI)=>{
    // console.log(showDetail)
    const {_id,__v,reviews,owner,...updatelist }=showDetail;
     const formData = new FormData();
    for (let key in updatelist) {
        formData.append(key, updatelist[key]);
    }
    try{
    
   
    console.log(updatelist);
     const response= await API.post(`${BACKEND_URL}/updateList/${_id}`,updatelist,{
        headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    //  console.log(response)
    thunkAPI.dispatch(fetchAllListing());
    console.log(response.data)
    
    return response.data;
    }catch(err){
        console.log(err.response.data)
        thunkAPI.dispatch(updateError(err.response.data));
    }
})
export const deleteListing=createAsyncThunk('deleteListing', async(id,thunkAPI)=>{
  console.log(id)
  try{
     const response= await API.get(`${BACKEND_URL}/deletelisting/${id}`);
     console.log(response)
    
     thunkAPI.dispatch(fetchAllListing());
    
    return response.data;
  }catch(err){
      console.log(err.response.data)
        thunkAPI.dispatch(updateError(err.response.data));

      
  }
})
// review  -------------------------

export const addReview=createAsyncThunk('addReview', async({id,review},thunkAPI)=>{

  try{
    const response= await API.post(`${BACKEND_URL}/addReview/${id}`,review);
    console.log(response.data)
    thunkAPI.dispatch(UpdateshowDetail(response.data))
    thunkAPI.dispatch(fetchAllListing());
    return response.data;
  }catch(err){
    console.log(err.response.data)
    thunkAPI.dispatch(updateError(err.response.data));
   
  }
  
});


export const deleteReview=createAsyncThunk('deleteReview', async({id,reviewId},thunkAPI)=>{
  console.log(id,"=====",reviewId)
  try{
     const response= await API.post(`${BACKEND_URL}/deleteReview/${id}/${reviewId}`);
     console.log(response)
     thunkAPI.dispatch(UpdateshowDetail(response.data))
     thunkAPI.dispatch(fetchAllListing());
    
    return response.data;
  }catch(err){
      console.log(err.response.data)
        thunkAPI.dispatch(updateError(err.response.data));

      
  }
});


// user ----------------------------------------------


export const addUser=createAsyncThunk('addUser', async(user,thunkAPI)=>{
     console.log(user)
  try{
    const response= await API.post(`${BACKEND_URL}/userRegister`,user);
    console.log(response.data)
     thunkAPI.dispatch(updateIsAuth(response.data));
    
    // thunkAPI.dispatch(fetchAllListing());
    return response.data;
  }catch(err){
    console.log(err.response.data)
    thunkAPI.dispatch(updateError(err.response.data));
   
  }
  
});



export const login=createAsyncThunk('login', async(userLogin,thunkAPI)=>{
     console.log(userLogin)
  try{
    const response= await API.post(`${BACKEND_URL}/login`,userLogin);
    console.log(response.data.currentUser)
     thunkAPI.dispatch(updateIsAuth(response.data.isAuthenticated));
     thunkAPI.dispatch(updateCurrentUserId(response.data.currentUser._id));
    
    // thunkAPI.dispatch(fetchAllListing());
    
    return response?.data;
  }catch(err){
    console.log(err)
    thunkAPI.dispatch(updateError(err?.response?.data));
   
  }
  
});
export const logout=createAsyncThunk('logout', async(_,thunkAPI)=>{
     
  try{
    const response= await API.get(`${BACKEND_URL}/logout`);
    console.log(response)
    thunkAPI.dispatch(updateIsAuth(response?.data?.isAuthenticated));
    thunkAPI.dispatch(updateCurrentUserId(response?.data?.currentUser?._id));
    
    // console.log(response.data.currentUser)
    
    // thunkAPI.dispatch(fetchAllListing());
    return response.data;
  }catch(err){
    console.log(err)
    thunkAPI.dispatch(updateError(err.response.data));
   
  }
  
});


const initialState = {
     AddButtonText:false,
    open:false,
   showDetail:"",
    AllListing:[],
    loading:false,
    error:null,
    review:{rating:'',comment:''},
    user:{username:'',email:'',password:''},
    userLogin:{username:'',password:''},
    isAuth:false,
    currentUserId:''
    
}

 const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
      UpdateshowDetail:(state,action)=>{state.showDetail =action.payload},
           updateOpen:(state)=>{state.open = !state.open},
           updateAddButtonText:(state,action)=>{state.AddButtonText = action.payload},
           updateError:(state,action)=>{state.error = action.payload},
           closeError:(state)=>{state.error = null},
           updateReview:(state,action)=>{state.review = action.payload},
           userUpdate:(state,action)=>{state.user=action.payload},
           userLoginUpdate:(state,action)=>{state.userLogin=action.payload},
           updateIsAuth:(state,action)=>{state.isAuth=action.payload},
           updateCurrentUserId:(state,action)=>{state.currentUserId=action.payload}
    },
    extraReducers:(builder)=>{
        builder
         .addCase(fetchAllListing.pending, (state) => {
        state.loading = true;
      })
        .addCase(fetchAllListing.fulfilled, (state, action) => {
        state.loading = false;
        state.AllListing = action.payload;
      })
      .addCase(fetchAllListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
    }
 });

 export const { UpdateshowDetail,updateOpen,updateAddButtonText,closeError,updateError,updateReview,userUpdate,userLoginUpdate,updateIsAuth,updateCurrentUserId} = dataSlice.actions
 export default dataSlice.reducer;