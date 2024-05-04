import { configureStore } from "@reduxjs/toolkit";

import jobsReducer from "./slices/jobs.slice.js";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});
