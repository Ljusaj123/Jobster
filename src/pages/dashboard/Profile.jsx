import { useSelector, useDispatch } from "react-redux";
import ProfileWrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useState } from "react";
import customFetch from "../../utils/axios.js";
import { toast } from "react-toastify";
import { updateUser, logoutUser } from "../../utils/userSlice.js";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const updateUserData = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.patch("/auth/updateUser", userData);

      dispatch(updateUser(response.data));
      toast.success("account updated successfully");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "please double check your credentials";

      toast.error(errorMessage);

      if (error.response.status === 401) {
        dispatch(logoutUser());
      }

      if (error.response.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    updateUserData();
  };
  return (
    <ProfileWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </ProfileWrapper>
  );
}

export default Profile;
