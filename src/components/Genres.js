import React from "react";
import Chip from "@mui/material/Chip";

function Genres({
  styles,
  addGenreFiltersSelection,
  albumColor,
  genreFilters,
}) {
  return (
    <div className="genres">
      {Object.keys(styles).map((value) => {
        return (
          <div className="styles-card" key={styles[value]["style"]}>
            <Chip
              size="small"
              label={styles[value]["style"]}
              sx={{
                bgcolor: genreFilters.includes(styles[value]["style"])
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
              onClick={() => addGenreFiltersSelection(styles[value]["style"])}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
