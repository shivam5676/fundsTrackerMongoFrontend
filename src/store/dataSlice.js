import { createSlice } from "@reduxjs/toolkit";

const expenseData = { allData: [], leaderBoardData: {} };

const dataSlice = createSlice({
  name: "data",
  initialState: expenseData,
  reducers: {
    addExpense(state, action) {
      
     
      state.allData.push(action.payload);
    },
    deleteExpense(state, action) {
     
      const updatedArray = state.allData.filter(
        (current) => current.id !== action.payload
      );
      state.allData = updatedArray;
    },
    leaderBoard(state, action) {
      state.leaderBoardData = action.payload;
    },
 
    reset(state){
      state.allData=[]
      state.leaderBoardData=[]
    }
  },
});
export const dataSliceActions = dataSlice.actions;

export default dataSlice.reducer;
