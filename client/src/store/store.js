import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import adminProductsReducer from './admin/adminProducts'
import shoppingProductReducer from './shop/shoppingProducts.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:adminProductsReducer,
    shoppingProducts:shoppingProductReducer
  },
});

export default store;