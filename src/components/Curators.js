import React from "react";
import Chip from "@mui/material/Chip";

function Curators({
  curators,
  addCuratorFiltersSelection,

  albumColor,
}) {
  return (
    <div className="curators">
      <p className="recommended-by">recommended by:</p>
      {Object.keys(curators).map((value) => {
        return (
          <div className="curators-card">
            <Chip
              key={curators[value]["display_name"]}
              size="small"
              label={curators[value]["display_name"]}
              sx={{
                bgcolor: albumColor,
                color: "black",
                fontSize: "14px",
                marginRight: "10px",
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "10px",

                fontFamily: "Cotham",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() =>
                addCuratorFiltersSelection(curators[value]["display_name"])
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Curators;
