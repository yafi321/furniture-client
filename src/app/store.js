import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../featurs/cartSlice.js";
import userSlice from "../featurs/userSlice.js"

export const store=configureStore({
    reducer:{
        cart:cartSlice,
        user: userSlice

    }
})