import React, { useRef } from "react";

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
}) {
  const iframeHeight =
    (filters && filters.length > 0) ||
    (labelFilter && labelFilter.length > 0) ||
    (curatorFilters && curatorFilters.length > 0)
      ? 160
      : 600;

  const iframeRef = useRef(null);

  return (
    <div className="sidebar">
      <div className="logo-main">
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
      <div className="button">
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
