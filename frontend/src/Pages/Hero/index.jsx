import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./index.css";

const HeroPage = () => {
  const { auth } = useAuth();

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Fun and Chill</h1>
        <p className="hero-subtitle">Discover and add your favorite movies!</p>
        {auth?.name ? (
          <div className="visit-home-prompt">
            <p>
              Visit the{" "}
              <Link to="/home" className="home-link">
                home page
              </Link>{" "}
              to view movies and add them to your favorites.
            </p>
          </div>
        ) : (
          <div className="login-prompt">
            <p>
              Please{" "}
              <Link to="/login" className="login-link">
                login
              </Link>{" "}
              to search for movies and add them to your favorites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPage;
