import React, { useState } from "react";

import RegisterWrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/userSlice.js";
import { redirect } from "react-router-dom";

import customFetch from "../utils/axios.js";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async () => {
    setIsLoading(true);
    const { name, email, password } = values;

    try {
      await customFetch.post("/auth/register", { name, email, password });

      toast.success("account created successfully");
      redirect("/login");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "please double check your credentials";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    setIsLoading(true);
    const { email, password } = values;
    try {
      const response = await customFetch.post("/auth/login", {
        email,
        password,
      });

      dispatch(loginUser(response.data));
      toast.success("logged in successfully");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "please double check your credentials";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    isMember ? login() : registerUser();
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <RegisterWrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        <div className="form-row">
          <button type="submit" className="btn btn-block">
            {isLoading ? "Submiting..." : "Submit"}
          </button>
          <button type="button" className="btn btn-block btn-hipster">
            Demo App
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </RegisterWrapper>
  );
}

export default Register;
