import { configureStore } from "@reduxjs/toolkit";
import { userSlice, jobSlice, allJobsSlice } from "./utils/slices";

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

export default store;
