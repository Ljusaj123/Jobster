import { createSlice } from "@reduxjs/toolkit";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    getJobs: (state, { payload }) => {
      state.jobs = payload.jobs;
    },

    showStats: (state, { payload }) => {
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },

    handleChange: (state, { payload: { name, value } }) => {
      // state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
  },
});

export const { getJobs, showStats, handleChange, clearFilters } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;
