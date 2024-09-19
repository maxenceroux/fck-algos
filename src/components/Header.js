import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import SearchDropdownWithImages from "./Dropdown";

function Header() {
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/login`;
  };
  const handleCloseSearch = () => {
    const searchBox = document.querySelector(".search-box");
    const overlay = document.querySelector(".overlay");
    searchBox.classList.remove("mobile");
    overlay.style.display = "none";
  };
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setUserId(null);
    window.location.replace(location.pathname);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdFromURL = params.get("user_id");
    if (userIdFromURL) {
      localStorage.setItem("user_id", userIdFromURL);
      setUserId(userIdFromURL);
    } else {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [location]);

  return (
    <div className="header">
      <div className="about-us">
        <a onClick={() => navigate("/about-us")}>about us</a>
      </div>
      <div className="search-box">
        <SearchDropdownWithImages />
        <div onClick={() => handleCloseSearch()} className="close-search">
          x
        </div>
      </div>
      <div className="header-elements">
        <Link to="/profile">profile</Link>
        <div className="login">
          {userId ? (
            <div onClick={handleLogout}>logout</div>
          ) : (
            <div onClick={handleLogin}>login</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
