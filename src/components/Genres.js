import React from "react";
import Chip from "@mui/material/Chip";

function Genres({
  styles,
  addGenreFiltersSelection,

  albumColor,
}) {
  return (
    <div className="genres">
      {Object.keys(styles).map((value) => {
        return (
          <div className="styles-card">
            <Chip
              key={styles[value]["style"]}
              size="small"
              label={styles[value]["style"]}
              sx={{
                bgcolor: albumColor,
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
