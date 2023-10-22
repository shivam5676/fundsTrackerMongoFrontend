import {  createSlice } from "@reduxjs/toolkit";
const loginState = { loggedIn: false ,isPremium:false};

const AuthenticationSlice=createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    Login:(state) =>{
      state.loggedIn = true;
    },
    LogOut:(state)=>{
        state.loggedIn=false;
        state.isPremium=false
    },
    premium(state){
      state.isPremium=true
      
    }
    
  },
});

export const loginSliceActions=AuthenticationSlice.actions;
export default AuthenticationSlice.reducer
