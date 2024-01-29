import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./utils/userSlice.js";
import jobSlice from "./utils/jobSlice.js";
import allJobsSlice from "./utils/allJobsSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

export default store;
