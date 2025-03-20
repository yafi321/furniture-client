import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    arr: [],
    totalSum: 0

}

const cartSlice = createSlice({
    name: "cart",
    initialState: initalState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
            if (index > -1)
                state.arr[index].qty++;
            else
                state.arr.push({ ...action.payload, qty: 1 })

            state.totalSum += action.payload.price;    
        },
        reduceProduct: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
          
                state.arr[index].qty--;
                state.totalSum -= action.payload.price;    
          
        },
        deleteFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
          
            state.arr.splice(index, 1);
            state.totalSum -= action.payload.price*(action.payload.qty);    
          
        },
        

    }
})


export const { addToCart ,reduceProduct, deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;
