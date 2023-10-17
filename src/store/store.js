import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import AuthenticationSlice from "./AuthenticationSlice";
import graphDataSlice from "./graphDataSlice";

const store=configureStore({
    reducer:{
        data:dataSlice,
        login:AuthenticationSlice,
        graph:graphDataSlice
    }
})
export default store;