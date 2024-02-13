import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProductApi, getProductsApi } from '../../services/posServices';

const initialState = {
    productData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const addProducts = createAsyncThunk(
    "/add-product",
    async (data) =>{
        try{
            const response = await addProductApi(data)
            return response.data
        }catch(error){
            throw error
        }
    }
)

export const getProducts = createAsyncThunk(
    "/get-products",
    async () =>{
        try{
            const response = await getProductsApi()
            return response.data
        }catch(error){
            throw error
        }
    }
)

export const productSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.productData = [...state.productData,action.payload];
                state.message = "Product Added Successfully";
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "Product Adding Failed";
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.productData = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "Product Adding Failed";
            })
    },
});


