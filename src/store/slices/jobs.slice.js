import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;

export default jobSlice.reducer;
