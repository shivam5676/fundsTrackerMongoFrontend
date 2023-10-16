import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import AuthenticationSlice from "./AuthenticationSlice";

const store=configureStore({
    reducer:{
        data:dataSlice,
        login:AuthenticationSlice
    }
})
export default store;