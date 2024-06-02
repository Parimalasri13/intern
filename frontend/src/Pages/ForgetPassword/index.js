import React, { useState } from "react";
import "./index.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { showToast } from "../../components/Toast";

function ResetPasswordForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regx.test(password);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let err = null;
    if (!validatePassword(password)) {
      showToast(
        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
        ""
      );
      return;
    }
    try {
      await axios.put("/update-password", {
        name: username,
        password,
      });
      showToast("", `Password has been updated!`);
      // Delay navigation to ensure toast is displayed
      setTimeout(() => {
        navigate("/login");
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

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

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
            placeholder="New Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <button type="submit" className="btn">
          Reset
        </button>
        <div className="register-link">
          <p className="para">
            Remember password?{" "}
            <Link style={{ color: "black" }} to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
