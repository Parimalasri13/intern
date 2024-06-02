import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import "./index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/Toast";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  async function handleSubmit(e) {
    e.preventDefault();
    let err = null;
    try {
      const response = await axios.post(
        "/login",
        {
          name: username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ name: username, accessToken });
      showToast("", `Hi ${username}!`);
      // Delay navigation to ensure toast is displayed
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (error) {
      if (error?.response?.data?.message) err = error.response.data.message;
      else err = error.message;
    } finally {
      if (err) {
        showToast(err, "");
      }
    }
  }

  // Validation functions...

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="remember_forget">
          <a href="/forget-password"> Forget Password</a>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p className="para">
            Don't have an account?{" "}
            <Link style={{ color: "black" }} to="/register">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
