import React from "react";
import Chip from "@mui/material/Chip";

function YearFilter({
  yearFilter,
  addYearFilterSelection,
  removeYearFilterSelection,
  albumColor,
}) {
  return (
    <div className="filters">
      <div className="label-filter-card">
        <Chip
          key={yearFilter}
          size="small"
          label={yearFilter}
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
          onClick={() => addYearFilterSelection(yearFilter)}
          onDelete={() => removeYearFilterSelection(yearFilter)}
        />
      </div>
    </div>
  );
}

export default YearFilter;
