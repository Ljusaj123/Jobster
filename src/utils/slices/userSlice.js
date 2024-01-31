import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  addUserToLocalStorage,
} from "../localStorage";

const initialState = {
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
    loginUser: (state, action) => {
      const user = action.payload.user;
      state.user = user;
      addUserToLocalStorage(user);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    updateUser: (state, { payload }) => {
      const { user } = payload;
      state.user = user;
      addUserToLocalStorage(user);
    },
  },
});

export default userSlice.reducer;

export const { logoutUser, loginUser, toggleSidebar, updateUser } =
  userSlice.actions;
