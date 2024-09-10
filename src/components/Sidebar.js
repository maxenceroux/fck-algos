import React, { useRef, useEffect } from "react";

import Filters from "./Filters";
import { ReactComponent as Oid } from "../oid.svg";
function Sidebar({
  filters,
  addGenreFiltersSelection,
  removeGenreFiltersSelection,
  curatorFilters,
  addCuratorFiltersSelection,
  removeCuratorFiltersSelection,
  labelFilter,
  addLabelFilterSelection,
  removeLabelFilterSelection,
  clickBehavior,
  albumPrimaryColor,
  albumSecondaryColor,
  albumEmbedUrl,
  linearGradient,
  showFilterMenu,
  setShowFilterMenu,
  setIsMobile,
  isMobile,
}) {
  const iframeHeight =
    (filters && filters.length > 0) ||
    (labelFilter && labelFilter.length > 0) ||
    (curatorFilters && curatorFilters.length > 0)
      ? 160
      : 600;

  const iframeRef = useRef(null);
  const filterMenuRef = useRef(null);
  const handleFilterClick = () => {
    const overlay = document.querySelector(".overlay");
    const filterMenu = document.querySelector(".sidebar");
    setShowFilterMenu(!showFilterMenu);
    if (overlay.style.display === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
    filterMenu.classList.toggle("active");
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      console.log(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        filterMenuRef.current.classList.contains("active") &&
        !filterMenuRef.current.contains(event.target)
      ) {
        handleFilterClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuRef, handleFilterClick]);
  return (
    <div ref={filterMenuRef} className="sidebar">
      <div onClick={handleFilterClick} className="close-button">
        x
      </div>
      <div id="logo-main" className="logo-main">
        <svg className="logo" fill={albumSecondaryColor}>
          <Oid />
        </svg>
        <h1
          className="title"
          style={{ color: albumSecondaryColor, fontFamily: "Sanchez-Regular" }}
        >
          fck algos
        </h1>
      </div>
      <div className="spotify-embed">
        <iframe
          src={albumEmbedUrl}
          title="Spotify Embed"
          width="300"
          height={iframeHeight}
          frameBorder="0"
          allowfullscreen=""
          allowTransparency="true"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <Filters
        filters={filters}
        addGenreFiltersSelection={addGenreFiltersSelection}
        removeGenreFiltersSelection={removeGenreFiltersSelection}
        curatorFilters={curatorFilters}
        addCuratorFiltersSelection={addCuratorFiltersSelection}
        removeCuratorFiltersSelection={removeCuratorFiltersSelection}
        labelFilter={labelFilter}
        addLabelFilterSelection={addLabelFilterSelection}
        removeLabelFilterSelection={removeLabelFilterSelection}
        albumPrimaryColor={albumPrimaryColor}
        albumSecondaryColor={albumSecondaryColor}
      />
      <div id="next-button" className="button">
        <button
          style={{ backgroundColor: albumSecondaryColor }}
          className="btn-grad"
          onClick={clickBehavior}
        >
          <span>next</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
