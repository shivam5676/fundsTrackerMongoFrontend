import { createSlice } from "@reduxjs/toolkit";

const expenseData={allData:[]}

const dataSlice=createSlice({
    name:"data",
    initialState:expenseData,
    reducers:{
        addExpense(state){
            state.allData.push()
        },
        // deleteExpense(state,action){
        
        // }
    }
})
export const dataSliceActions=dataSlice.actions

export default dataSlice.reducer;