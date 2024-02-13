import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSlice } from '../slices/productSlice';


const rootReducer = combineReducers({
Product: productSlice.reducer
});


export const store = configureStore({
  reducer: rootReducer
})