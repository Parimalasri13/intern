import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./index.css";
import useLogout from "../../hooks/useLogout";

function Navbar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="top-container">
      <div className="header">
        <Link to="/" className="lk options">
          For a change
        </Link>
      </div>
      <div className="options">
        {auth?.name ? (
          <>
            <Link to="/read" className="lk">
              Favorites
            </Link>
            <button
              className="lk"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onClick={signOut}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="lk">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
