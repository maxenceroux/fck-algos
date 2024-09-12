import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Oid } from "../oid.svg";
import { ReactComponent as FilterSVG } from "../Filter.svg";
import { ReactComponent as SearchSVG } from "../Search.svg";

function MobileHeader({
  curatorsFilter = null,
  filters = null,
  labelFilter = null,
  randomColor = "",
}) {
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const burgerMenuRef = useRef(null);

  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleBurgerClick = () => {
    const overlay = document.querySelector(".overlay");
    const sidebarMenu = document.querySelector(".sidebar-mobile");
    setShowBurgerMenu(!showBurgerMenu);
    overlay.style.display =
      overlay.style.display === "block" ? "none" : "block";
    sidebarMenu.style.color = randomColor ? randomColor : "#d3d3d3";
    sidebarMenu.classList.toggle("active");
  };

  const handleFilterClick = () => {
    const overlay = document.querySelector(".overlay");
    const filterMenu = document.querySelector(".sidebar");
    const filterIcon = document.querySelector("#filter-icon");

    setShowFilterMenu((prevState) => !prevState);
    overlay.style.display =
      overlay.style.display === "block" ? "none" : "block";
    filterMenu.classList.toggle("active");
  };

  const handleSearchClick = () => {
    const searchBox = document.querySelector(".search-box");
    const overlay = document.querySelector(".overlay");
    searchBox.classList.add("mobile");
    overlay.style.display =
      overlay.style.display === "block" ? "none" : "block";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        burgerMenuRef.current &&
        burgerMenuRef.current.classList.contains("active") &&
        !burgerMenuRef.current.contains(event.target)
      ) {
        handleBurgerClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [burgerMenuRef]);

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/login";
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
    <div id="mobile-header" className="mobile-header">
      <div className="overlay"></div>
      <div ref={burgerMenuRef} className="sidebar-mobile">
        <div className="links">
          <div className="link" onClick={() => navigate("/about-us")}>
            about us
          </div>
          <div onClick={() => navigate("/profile")} className="link">
            profile
          </div>
          {userId ? (
            <div className="link" onClick={handleLogout}>
              logout
            </div>
          ) : (
            <div className="link" onClick={handleLogin}>
              login
            </div>
          )}
        </div>
        <div className="close-button" onClick={handleBurgerClick}>
          x
        </div>
      </div>
      <div onClick={handleBurgerClick} className="burger-menu">
        <div className="line" style={{ backgroundColor: randomColor }}></div>
        <div className="line" style={{ backgroundColor: randomColor }}></div>
        <div className="line" style={{ backgroundColor: randomColor }}></div>
      </div>
      <div
        style={{ color: randomColor }}
        onClick={() => navigate("/")}
        id="logo-main"
        className="logo-main"
      >
        <svg className="logo">
          <Oid fill={randomColor || "#b3b3b3"} />
        </svg>
        <h1
          className="title"
          style={{ fontFamily: "Sanchez-Regular", color: randomColor }}
        >
          FCK ALGOS
        </h1>
      </div>
      <svg
        onClick={handleFilterClick}
        id="filter-icon"
        className="filter-icon header-logo"
      >
        <FilterSVG />
      </svg>
      <svg
        onClick={handleSearchClick}
        id="search-icon"
        className="search-icon header-logo"
      >
        <SearchSVG />
      </svg>
    </div>
  );
}

export default MobileHeader;
