import React from "react";
import Chip from "@mui/material/Chip";

function CuratorFilters({
  curatorFilters,
  addCuratorFiltersSelection,
  removeCuratorFiltersSelection,
  albumColor,
}) {
  return (
    <div className="filters">
      {curatorFilters.map((value) => {
        return (
          <div className="curators-filter-card">
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
              onClick={() => addCuratorFiltersSelection(value)}
              onDelete={() => removeCuratorFiltersSelection(value)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CuratorFilters;
