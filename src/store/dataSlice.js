import { createSlice } from "@reduxjs/toolkit";

const expenseData = { allData: [], leaderBoardData: {} };

const dataSlice = createSlice({
  name: "data",
  initialState: expenseData,
  reducers: {
    addExpense(state, action) {
      console.log(action.payload);
      state.allData.push(action.payload);
    },
    deleteExpense(state, action) {
      console.log(action.payload);
      const updatedArray = state.allData.filter(
        (current) => current.id !== action.payload
      );
      state.allData = updatedArray;
    },
    leaderBoard(state, action) {
      state.leaderBoardData = action.payload;
    },
  },
});
export const dataSliceActions = dataSlice.actions;

export default dataSlice.reducer;
