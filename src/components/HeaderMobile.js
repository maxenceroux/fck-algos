import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import SearchDropdownWithImages from "./Dropdown";

function MobileHeader() {
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  const handleBurgerClick = () => {
    const overlay = document.querySelector(".overlay");
    const sidebarMenu = document.querySelector(".sidebar-mobile");
    setShowBurgerMenu(!showBurgerMenu);
    if (overlay.style.display === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
    sidebarMenu.classList.toggle("active");
  };

  return (
    <div id="mobile-header" className="mobile-header">
      <div onClick={handleBurgerClick} className="burger-menu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <img onclick={handleFilterClick} id="filter-icon" src="/filter.png"></img>
      <img id="search-icon" src="/search-icon.png"></img>
    </div>
  );
}

export default MobileHeader;
