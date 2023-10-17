import { createSlice } from "@reduxjs/toolkit";


const intialState={total:[]}
const graphDataSlice = createSlice({
  name: "graph total",
  initialState:intialState,
  reducers: {
    graphTotal(state, action) {
        console.log(action.payload)
      state.total = action.payload;
    },
  },
});

export const graphDataSliceActions=graphDataSlice.actions;
export default graphDataSlice.reducer;