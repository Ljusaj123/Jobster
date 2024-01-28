import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./utils/userSlice.js";
import jobSlice from "./utils/jobSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
  },
});

export default store;
