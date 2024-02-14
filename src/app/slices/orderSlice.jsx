import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderData: [],
    cartData: [],
    selectedOfferType: "All",
    totalItems: 0,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: "",
};

export const addToCartSlice = createSlice({
    name: "cartData",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProduct = { ...action.payload, quantity: 1 };
            state.cartData = [...state.cartData, newProduct];
            state.isSuccess = true;
        },
        incrementCartItem: (state, action) => {
            const { productId } = action.payload;
            const itemIndex = state.cartData.findIndex((item) => item._id === productId);
            if (itemIndex !== -1) {
                state.cartData[itemIndex].quantity += 1;
                state.isSuccess = true;
            }
        },
        decrementCartItem: (state, action) => {
            const { productId } = action.payload;
            const itemIndex = state.cartData.findIndex((item) => item._id === productId);
            if (itemIndex !== -1) {
                state.cartData[itemIndex].quantity -= 1;
                if (state.cartData[itemIndex].quantity === 0) {
                    state.cartData.splice(itemIndex, 1);
                }
                state.isSuccess = true;
            }
        },
        setSelectedOfferType: (state, action) => {
            state.selectedOfferType = action.payload;
        },
        updateTotalItems: (state) => {
            state.totalItems = state.cartData.reduce((total, product) => total + product.quantity, 0);
        },
    },
});

export const { addToCart, incrementCartItem, setSelectedOfferType, decrementCartItem, updateTotalItems } =
    addToCartSlice.actions;
