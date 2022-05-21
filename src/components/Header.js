import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  localStorage.setItem("location", location.pathname);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    if (
      !localStorage.getItem("user") &&
      localStorage.getItem("user_spotify_token")
    ) {
      const fetchProfileData = async () => {
        const profile_url = "http://localhost:8000/spotify_user_info";
        const params = {
          token: localStorage.getItem("user_spotify_token"),
        };
        const profile_data = await axios.get(profile_url, {
          params,
        });

        localStorage.setItem("user", profile_data.data.display_name);
        localStorage.setItem("user_id", profile_data.data.id);
        localStorage.setItem("user_image_url", profile_data.data.image_url);
      };
      fetchProfileData();
    }
  });
  return (
    <div className="header">
      <div className="header-content">
        <Search />
        <div className="navigation">
          <nav>
            <Link to="/">Home</Link> | <Link to="/profile">Profile</Link>
          </nav>
        </div>
        <div className="login">
          {" "}
          {localStorage.getItem("user_spotify_token") ? (
            <button onClick={handleLogout}> Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}> Login</button>
          )}
        </div>
        <div className="about-us">
          <a>About us</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
