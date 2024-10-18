import React from "react";
import Chip from "@mui/material/Chip";

function Genres({
  styles,
  filters,
  addGenreFiltersSelection,
  removeGenreFiltersSelection,
  albumColor,
  genreFilters,
}) {
  return (
    <div className="genres">
      {Object.keys(styles).map((value) => {
        const styleName = styles[value]["style"];
        const isFiltered = filters.includes(styleName);

        return (
          <div className="styles-card" key={styleName}>
            <Chip
              size="small"
              label={styleName}
              sx={{
                bgcolor: genreFilters.includes(styleName)
                  ? "white"
                  : albumColor,
                color: "black",
                fontSize: "14px",
                marginRight: "10px",
                marginTop: "10px",
                fontFamily: "Cotham",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => addGenreFiltersSelection(styleName)}
              // Conditionally add onDelete if the style is in filters
              onDelete={
                isFiltered
                  ? () => removeGenreFiltersSelection(styleName)
                  : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
