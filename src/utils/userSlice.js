import { createSlice } from "@reduxjs/toolkit";

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
