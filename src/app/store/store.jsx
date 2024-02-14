import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSlice } from '../slices/productSlice';
import { addToCartSlice } from '../slices/orderSlice';


const rootReducer = combineReducers({
Product: productSlice.reducer,
Order : addToCartSlice.reducer
});


export const store = configureStore({
  reducer: rootReducer
})