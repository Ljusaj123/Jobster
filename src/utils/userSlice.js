import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("User successfuly logout");
    },
    loginUser: (state, action) => {
      const user = action.payload.user;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export default userSlice.reducer;

export const { logoutUser, loginUser } = userSlice.actions;
