import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "./userSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      const { company, editJobId, jobLocation, jobType, position, status } =
        payload;
      state.isEditing = true;
      state.company = company;
      state.editJobId = editJobId;
      state.jobLocation = jobLocation;
      state.jobType = jobType;
      state.position = position;
      state.status = status;
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
