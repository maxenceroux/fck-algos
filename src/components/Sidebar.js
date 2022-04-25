import React from "react";
import Filters from "./Filters";
import { ReactComponent as Oid } from "../oid.svg";
function Sidebar({
  filters,
  addGenreFiltersSelection,
  removeGenreFiltersSelection,
  curatorFilters,
  addCuratorFiltersSelection,
  removeCuratorFiltersSelection,
  clickBehavior,
  albumColor,
  albumEmbedUrl,
  linearGradient,
}) {
  return (
    <div className="sidebar">
      <svg className="logo" fill={albumColor}>
        <Oid />
      </svg>
      <h1
        className="title"
        style={{ color: albumColor, fontFamily: "Sanchez-Regular" }}
      >
        &nbsp; &nbsp; &nbsp; &nbsp;Algo <br /> Rhythms
      </h1>
      <Filters
        filters={filters}
        addGenreFiltersSelection={addGenreFiltersSelection}
        removeGenreFiltersSelection={removeGenreFiltersSelection}
        curatorFilters={curatorFilters}
        addCuratorFiltersSelection={addCuratorFiltersSelection}
        removeCuratorFiltersSelection={removeCuratorFiltersSelection}
        albumColor={albumColor}
      />
      <div className="button">
        <button
          style={{ backgroundImage: linearGradient }}
          className="btn-grad"
          onClick={clickBehavior}
        >
          Next
        </button>
      </div>

      <div className="spotify-embed">
        <iframe
          src={albumEmbedUrl}
          title="Spotify Embed"
          width="300"
          height="380"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
}

export default Sidebar;
