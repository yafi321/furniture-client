import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage.js";


const initialUserState = loadFromLocalStorage("currentUser", { currentUser: null });

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            saveToLocalStorage("currentUser", state);
        },
        userOut: (state) => {
            state.currentUser = null;
            saveToLocalStorage("currentUser", state);
        }
    }
});

export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;