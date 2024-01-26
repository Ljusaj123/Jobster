import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;

  return user;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      toast.success("User successfuly logout");
    },
    loginUser: (state, action) => {
      const user = action.payload.user;
      state.user = user;
      addUserToLocalStorage(user);
    },
  },
});

export default userSlice.reducer;

export const { logoutUser, loginUser } = userSlice.actions;
