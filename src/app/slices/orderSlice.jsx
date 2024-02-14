import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderData: [],
    cartData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    error: '',
};

export const addToCartSlice = createSlice({
    name: 'cartData',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProduct = { ...action.payload, quantity: 1 }
            state.cartData = [...state.cartData, newProduct];
            state.isSuccess = true;
        },
        incrementCartItem: (state, action) => {
            console.log("in line 22 increment", action)
            const { productId } = action.payload;
            const itemIndex = state.cartData.findIndex(item => item._id === productId);
            if (itemIndex !== -1) {
                state.cartData[itemIndex].quantity += 1;
                state.isSuccess = true;
            }
        },
        decrementCartItem: (state, action) => {
            const { productId } = action.payload;
            const itemIndex = state.cartData.findIndex(item => item._id === productId);
            if (itemIndex !== -1) {
                state.cartData[itemIndex].quantity -= 1;
                if (state.cartData[itemIndex].quantity === 0) {
                    state.cartData.splice(itemIndex, 1);
                }
                state.isSuccess = true;
            }
        },
    },
});

export const { addToCart, incrementCartItem, decrementCartItem } = addToCartSlice.actions;
