import React from "react";
import Chip from "@mui/material/Chip";

function GenreFilters({
  filters,
  addGenreFiltersSelection,
  removeGenreFiltersSelection,
  albumColor,
}) {
  return (
    <div className="filters">
      {filters.map((value) => {
        return (
          <div className="styles-card">
            <Chip
              key={value}
              size="small"
              label={value}
              sx={{
                bgcolor: albumColor,
                color: "black",
                fontSize: "14px",
                marginRight: "10px",
                marginBottom: "10px",
                fontFamily: "Cotham",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => addGenreFiltersSelection(value)}
              onDelete={() => removeGenreFiltersSelection(value)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GenreFilters;
