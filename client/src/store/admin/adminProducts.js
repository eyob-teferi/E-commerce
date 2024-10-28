import {createSlice,createAsyncThunk}  from '@reduxjs/toolkit';
import axios from 'axios'


export const createProduct=createAsyncThunk('adminProducts/createProduct',async(formData)=>{
  const  response = await axios.post('http://localhost:5000/api/admin/products/create-product',formData,{
    headers: {
        'Content-Type': 'application/json',
      },
  });

  return response.data
})

export const getAllProducts=createAsyncThunk('adminProducts/getAllProducts',async ()=>{
    const  response = await axios.get('http://localhost:5000/api/admin/products/get-all-products');
  
    return response.data
  })

  export const updateProduct=createAsyncThunk('adminProducts/updateProduct',async({id,formData})=>{
    const  response = await axios.put(`http://localhost:5000/api/admin/products/update/${id}`,formData);
  
    return response.data
  })

  export const deleteProduct=createAsyncThunk('adminProducts/deleteProduct',async(id)=>{
    const  response = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
  
    return response.data
  })

  


const adminProductSlice= createSlice({
    name: "adminProducts",
  initialState: {
    isLoading:true,
    products:null
  },
  reducers: {},
extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true; // Set loading to true  
        
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
      })
      .addCase(getAllProducts.pending, (state,) => {
        state.isLoading = true; // Set loading to true  
        
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.products = action.payload.success ? action.payload.products : null ; // Assign fetched data to state
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.products = null;// Assign fetched data to state
      }).addCase(updateProduct.pending, (state) => {
        state.isLoading = true; // Set loading to true  
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
      }).addCase(deleteProduct.pending, (state) => {
        state.isLoading = true; // Set loading to true  
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
      })
  },

})


export default adminProductSlice.reducer