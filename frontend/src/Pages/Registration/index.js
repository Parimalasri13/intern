import React, { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { showToast } from "../../components/Toast";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let err = null;
    // if (!validateUsername(username)) {
    //   showToast("Please enter a valid name", "");
    //   return;
    // }
    if (!validateConfirmPassword(password, confirmPassword)) {
      showToast("Please enter the same Password and Confirm Password", "");
      return;
    }
    // if (!validatePassword(password)) {
    //   showToast(
    //     "Please enter a valid password and length should exceed 6 characters",
    //     ""
    //   );
    //   return;
    // }
    try {
      await axios.post("/register", {
        name: username,
        password,
      });
      showToast(
        "",
        "Accounted created successfully..You will be redirected to the login page.."
      );
      // Delay navigation to ensure toast is displayed
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      if (error?.response?.data?.message) err = error.response.data.message;
      else err = error.message;
    } finally {
      if (err) {
        showToast(err, "");
      }
    }
  }
  const validateUsername = (username) => {
    const regx = /^[a-zA-Z]+$/;
    if (!regx.test(username)) {
      return false;
    }
    return regx.test(username);
  };

  const validatePassword = (password) => {
    const regx = /^[a-zA-Z]+$/;
    return regx.test(password) && password.length > 6;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Registration</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="Uname"
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input
            type="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <i className="bx bx-lock-open-alt"></i>
        </div>

        <div className="input-box">
          <input
            type="Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="Confirm_Password"
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btn">
          Register
        </button>
        <div className="register-link">
          <p className="para">
            Already have an account?{" "}
            <Link style={{ color: "black" }} to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
