import {createSlice,createAsyncThunk}  from '@reduxjs/toolkit';
import axios from 'axios'






export const getFilterdProducts=createAsyncThunk('shoppingProducts/getFilterdProducts',async ()=>{
    const  response = await axios.get('http://localhost:5000/api/shop/products/get-filterd-products');
  
    return response.data
  })

 

  


const shoppingProductSlice= createSlice({
    name: "shoppingProducts",
  initialState: {
    isLoading:true,
    products:null
  },
  reducers: {},
extraReducers: (builder) => {
    builder
      
      .addCase(getFilterdProducts.pending, (state,) => {
        state.isLoading = true; // Set loading to true  
        
      })
      .addCase(getFilterdProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.products = action.payload.success ? action.payload.products : null ; // Assign fetched data to state
      })
      .addCase(getFilterdProducts.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.products = null;// Assign fetched data to state
      })
      
  },

})


export default shoppingProductSlice.reducer