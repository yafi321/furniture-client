import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage.js";

const initialCartState = loadFromLocalStorage("cart", { arr: [], totalSum: 0 });

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index > -1) {
                state.arr[index].qty++;
            } else {
                state.arr.push({ ...action.payload, qty: 1 });
            }
            state.totalSum += action.payload.price;
            saveToLocalStorage("cart", state);
        },
        reduceProduct: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index > -1 && state.arr[index].qty > 1) {
                state.arr[index].qty--;
                state.totalSum -= action.payload.price;
            } else {
                state.arr.splice(index, 1);
                state.totalSum -= action.payload.price;
            }
            saveToLocalStorage("cart", state);
        },
        deleteFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index > -1) {
                state.totalSum -= state.arr[index].price * state.arr[index].qty;
                state.arr.splice(index, 1);
            }
            saveToLocalStorage("cart", state);
        },
        clearCart: (state) => {
            state.arr = [];
            state.totalSum = 0;
            saveToLocalStorage("cart", state);
        }
    }
});

export const { addToCart, reduceProduct, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;