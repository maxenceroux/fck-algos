import React from "react";
import Filters from "./Filters";
import Button from "@mui/material/Button";

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
}) {
  return (
    <div className="sidebar">
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
        <Button
          style={{ background: albumColor }}
          sx={{
            fontFamily: "Sanchez-Regular",
            fontSize: "20px",
            color: "white",
            padding: "10px 30px",
            textTransform: "none",
          }}
          className="button"
          onClick={clickBehavior}
          variant="contained"
        >
          next
        </Button>
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
